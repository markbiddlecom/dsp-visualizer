import { ComponentCell, loadComponentCells } from "./loadComponentCells";
import { MessageFunction } from "./gen-files";
import { Text } from "ink";
import React from "react";
import { JSDOM } from "jsdom";
import { WIKI } from "./consts";
import { arrDiff, createBatchingPromise, findParent, nameToKey, Truthy } from './bin-util';
import { fetchAndCache } from './fetchAndCache';

export type RecipeComponent = {
  component: string,
  amount: number,
}

export type BasicTechnologyInfo = {
  name: string,
  key: string,
  href: string,
  iconHref: string,
}

export type Recipe = {
  inputs: RecipeComponent[],
  outputs: RecipeComponent[],
  productionTime: number,
  buildings: string[],
  technologies: BasicTechnologyInfo[],
  equals(other: Recipe): boolean,
};

export type Recipes = Map<string, NamedRecipe>;

export type ComponentWithRecipes = ComponentCell & { recipes: NamedRecipe[] };

export type ComponentsAndRecipes = { components: ComponentWithRecipes[], recipes: Recipes };

export type NamedRecipe = Recipe & { key: string, name: string };

type ComponentPage = ComponentCell & { doc: Document };

export const loadRecipes: (msg: MessageFunction) => Promise<ComponentsAndRecipes> = (function() {
  class Loader {
    constructor() {
      this.broadcast = this.broadcast.bind(this);
      this.execPages = this.execPages.bind(this);
      this.nameOrReuseRecipe = this.nameOrReuseRecipe.bind(this);
    }

    async runWithMessage(msg: MessageFunction): Promise<ComponentsAndRecipes> {
      this.msgFunctions.add(msg);
      try {
        msg(<Text color="green">Preparing to load component pages...</Text>);
        await this.memoizePages();
      } finally {
        this.msgFunctions.delete(msg);
      }

      msg(<Text color="green">Building recipe list...</Text>);
      return await this.memoize();
    }

    private pagesPromise: Promise<ComponentPage[]> | undefined = undefined;
    private recipesPromise: Promise<ComponentWithRecipes[]> | undefined = undefined;
    private promise: Promise<ComponentsAndRecipes> | undefined = undefined;

    private readonly recipes: Recipes = new Map();
    private readonly msgFunctions = new Set<MessageFunction>();

    private memoizePages() {
      return this.pagesPromise ||
        (this.pagesPromise = loadComponentCells(this.broadcast).then(this.execPages));
    }

    private memoizeRecipes() {
      return this.recipesPromise || (this.recipesPromise = this.execRecipes());
    }

    private memoize() {
      return this.promise || (this.promise = this.exec());
    }

    private execPages(components: ComponentCell[]): Promise<ComponentPage[]> {
      return createBatchingPromise({
        items: components,
        processFunction: component =>
          fetchAndCache(`${WIKI}${component.href}`, component.href)
            .then(text => ({ doc: new JSDOM(text).window.document, ...component })),
        onBatchStart: (items) => {
          this.broadcast(<Text color="green">Fetching recipes for {
            items.map((component, index) => <Text key={component.key}>
              <Text inverse> {component.href} </Text>
              {index < items.length - 1 && ", "}
              {index === items.length - 2 && "and "}
            </Text>)
          }...</Text>);
          return true;
        },
      });
    }

    private async execRecipes(): Promise<ComponentWithRecipes[]> {
      const pages = await this.memoizePages();
      return pages.map(
        ({ doc, ...cell }): ComponentWithRecipes => ({
          recipes: Array.from(doc.querySelectorAll("div.tt_recipe"))
            .map(parseRecipe)
            .filter(Truthy)
            .filter(({ outputs }) => outputs.filter(({ component }) => component === cell.key).length)
            .map(this.nameOrReuseRecipe),
          ...cell
        }));
    }

    private async exec(): Promise<ComponentsAndRecipes> {
      const components = await this.memoizeRecipes();
      return ({
        components,
        recipes: this.recipes,
      });
    }

    private broadcast(newMessage: JSX.Element) {
      this.msgFunctions.forEach(f => f(newMessage));
    }

    private nameOrReuseRecipe(recipe: Recipe): NamedRecipe {
      let baseName: string;
      if (recipe.outputs.length === 1) {
        baseName = recipe.outputs[0].component;
      } else if (recipe.technologies.length === 1) {
        baseName = recipe.technologies[0].name;
      } else {
        baseName = "Production Recipe";
      }

      const matchingRecipe = this.recipes.get(baseName);
      if (matchingRecipe?.equals(recipe)) {
        return matchingRecipe as NamedRecipe;
      }

      let refinedName: string = baseName;
      if (matchingRecipe && recipe.buildings.length) {
        let discriminator = arrDiff(recipe.technologies.map(t => t.name), matchingRecipe.technologies.map(t => t.name))[0];
        if (!discriminator) {
          discriminator = arrDiff(recipe.buildings, matchingRecipe.buildings)[0];
        }
        if (!discriminator) {
          discriminator = arrDiff(
            recipe.inputs.map(i => i.component),
            matchingRecipe.inputs.map(i => i.component)
          ).sort()[0];
        }
        if (discriminator) {
          refinedName = `${baseName} (${discriminator})`;
        }
      }

      if (this.recipes.get(refinedName)?.equals(recipe)) {
        return this.recipes.get(refinedName) as NamedRecipe;
      }

      let finalName: string = refinedName;
      for (let i = 2; this.recipes.has(finalName); finalName = `${refinedName}; Version ${i++}`);

      const namedRecipe = {
        name: finalName,
        key: finalName.replace(/[^a-z0-9]/ig, ""),
        ...recipe
      };
      this.recipes.set(finalName, namedRecipe);

      return namedRecipe;
    }
  }

  const bindTarget = new Loader();
  return bindTarget.runWithMessage.bind(bindTarget);
})();

function parseRecipeComponent(componentDiv: Element): RecipeComponent | undefined {
  const component = componentDiv.querySelector("a")?.title.replace(/[^a-z0-9]/ig, "");
  return component ? {
    component,
    amount: parseFloat(componentDiv.querySelector("div")?.innerHTML || "0"),
  } : undefined;
}

function parseRecipeBuilding(a?: Element) {
  return ((a as any)?.title as string | undefined)?.replace(/[^a-z0-9]/ig, "");
};

function parseRecipeTechnology(a?: Element): BasicTechnologyInfo | undefined {
  let name = ((a as any)?.title as string | undefined)?.replace(/\s*\(Tech(nology)?\)$/i, "");
  let href = ((a as any)?.href as string | undefined);
  let iconHref = (a?.firstChild as any)?.src as string | undefined;

  return (
    name
      && href
      && iconHref
      && { name, key: nameToKey(name), href, iconHref }
    ) || undefined;
}

function parseRecipe(recipeDiv: Element): Recipe | undefined {
  const rowCells = Array.from(findParent(recipeDiv, "TR")?.querySelectorAll("td") || []);
  const headerRowCells = Array.from(
    findParent(recipeDiv, "TABLE")
      ?.querySelectorAll("tbody > tr:nth-child(1) > th") || []
  ).map(th => th.innerHTML.trim().toUpperCase());
  const buildingColumn =
    headerRowCells.map((th, index) => th === "BUILDING" ? index : undefined)
      .filter(Truthy)[0];
  const technologyColumn =
    headerRowCells.map((th, index) => th === "TECHNOLOGY" ? index : undefined)
      .filter(Truthy)[0];

  if (!rowCells.length || (typeof buildingColumn) !== "number" || (typeof technologyColumn) !== "number") {
    return undefined;
  }

  return {
    inputs: Array.from(recipeDiv.querySelectorAll("div.tt_recipe_item"))
      .map(parseRecipeComponent)
      .filter(Truthy)
      .sort((a, b) => a.component.localeCompare(b.component)),
    outputs: Array.from(recipeDiv.querySelectorAll("div.tt_output_item"))
      .map(parseRecipeComponent)
      .filter(Truthy)
      .sort((a, b) => a.component.localeCompare(b.component)),
    productionTime: parseFloat(recipeDiv.querySelector("div.tt_rec_arrow div")?.innerHTML || "0"),
    buildings: Array.from(rowCells[buildingColumn]?.querySelectorAll("a") || [])
      .map(parseRecipeBuilding)
      .filter(Truthy)
      .sort(),
    technologies: Array.from(rowCells[technologyColumn]?.querySelectorAll("a") || [])
      .map(parseRecipeTechnology)
      .filter(Truthy)
      .sort(),
    equals: recipeEquals
  };
}

function recipeEquals(this: Recipe, other: Recipe): boolean {
  function arrEq<T>(arr1: T[], arr2: T[], eqFunc: (a: T, b: T) => boolean = (a, b) => a === b) {
    return arr1.length === arr2.length
      && arr1.filter((a, index) => !eqFunc(a, arr2[index])).length === 0;
  }

  function recipeCompEq(a: RecipeComponent, b: RecipeComponent): boolean {
    return a.component === b.component && Math.abs(a.amount - b.amount) < 1e-6;
  }

  return this.productionTime === other.productionTime
    && arrEq(this.technologies, other.technologies)
    && arrEq(this.inputs, other.inputs, recipeCompEq)
    && arrEq(this.outputs, other.outputs, recipeCompEq);
}
