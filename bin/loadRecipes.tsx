import { ComponentCell, loadComponentCells } from "./loadComponentCells";
import { MessageFunction } from "./gen-files";
import { Text } from "ink";
import React from "react";
import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import { WIKI } from "./consts";
import { arrDiff, findParent, Truthy } from './bin-util';

export type RecipeComponent = {
  component: string,
  amount: number,
}

export type Recipe = {
  inputs: RecipeComponent[],
  outputs: RecipeComponent[],
  productionTime: number,
  buildings: string[],
  technologies: string[],
  equals(other: Recipe): boolean,
};

export type Recipes = Map<string, NamedRecipe>;

export type ComponentWithRecipes = ComponentCell & { recipes: NamedRecipe[] };

export type ComponentsAndRecipes = { components: ComponentWithRecipes[], recipes: Recipes };

export type NamedRecipe = Recipe & { key: string, name: string };

type ComponentPage = ComponentCell & { doc: Document };

export const loadRecipes = (new class {
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
      (this.pagesPromise = loadComponentCells(this.broadcast).then(this.execPages.bind(this)));
  }

  private memoizeRecipes() {
    return this.recipesPromise || (this.recipesPromise = this.execRecipes());
  }

  private memoize() {
    return this.promise || (this.promise = this.exec());
  }

  private execPages(components: ComponentCell[]): Promise<ComponentPage[]> {
    const BATCH_SIZE = 3;
    const batches: ComponentCell[][] = [];

    while (components.length) {
      const batch: ComponentCell[] = [];
      batches.push(batch);
      for (let i = 0; i < BATCH_SIZE && components.length; i++) {
        const toPush = components.shift();
        if (toPush) { batch.push(toPush); }
      }
    }

    const parsedComponentPages: ComponentPage[] = [];

    const fetchNextBatch = async (): Promise<ComponentPage[]> => {
      const nextBatch = batches.shift();
      if (!nextBatch || batches.length < 30) {
        return Promise.resolve(parsedComponentPages);
      }

      this.broadcast(<Text color="green">Fetching recipes for {
        nextBatch.map((component, index) => <Text key={component.key}>
          <Text inverse> {component.href} </Text>
          {index < nextBatch.length - 1 && ", "}
          {index === nextBatch.length - 2 && "and "}
        </Text>)
      }...</Text>);

      const pages = await Promise.all(
        nextBatch.map(component =>
          fetch(`${WIKI}${component.href}`)
            .then(response => response.text())
            .then(text => ({
              doc: new JSDOM(text).window.document,
              ...component
            }))
        )
      );
      pages.forEach(page => parsedComponentPages.push(page));

      return await fetchNextBatch();
    }

    return fetchNextBatch();
  }

  private execRecipes(): Promise<ComponentWithRecipes[]> {
    return this.memoizePages().then(pages => pages.map(
      ({ doc, ...cell }): ComponentWithRecipes => ({
        recipes: Array.from(doc.querySelectorAll("div.tt_recipe"))
          .map(parseRecipe)
          .filter(Truthy)
          .filter(({ outputs }) => outputs.filter(({ component }) => component === cell.key).length)
          .map(this.nameOrReuseRecipe),
        ...cell
      })));
  }

  private exec(): Promise<ComponentsAndRecipes> {
    return this.memoizeRecipes().then(components => ({
      components,
      recipes: this.recipes,
    }));
  }

  private broadcast(newMessage: JSX.Element) {
    this.msgFunctions.forEach(f => f(newMessage));
  }

  private nameOrReuseRecipe(recipe: Recipe): NamedRecipe {
    let baseName: string;
    if (recipe.outputs.length === 1) {
      baseName = recipe.outputs[0].component;
    } else if (recipe.technologies.length === 1) {
      baseName = recipe.technologies[0];
    } else {
      baseName = "Production Recipe";
    }

    const matchingRecipe = this.recipes.get(baseName);
    if (matchingRecipe?.equals(recipe)) {
      return matchingRecipe as NamedRecipe;
    }

    let refinedName: string = baseName;
    if (matchingRecipe && recipe.buildings.length) {
      let discriminator = arrDiff(recipe.technologies, matchingRecipe.technologies)[0];
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
}()).runWithMessage;

function parseRecipeComponent(componentDiv: Element): RecipeComponent | undefined {
  const component = componentDiv.querySelector("a")?.title.replace(/[^a-z0-9]/ig, "");
  return component ? {
    component,
    amount: parseFloat(componentDiv.querySelector("div")?.innerHTML || "0"),
  } : undefined;
}

function parseRecipeBuilding(a: Element) {
  return ((a as any).title as string | undefined)?.replace(/[^a-z0-9]/ig, "");
};

function parseRecipeTechnology(a: Element) {
  return ((a as any).title as string | undefined)
    ?.replace(/\s*\(Tech(nology)?\)$/i, "")
    .replace(/[^a-z0-9]/ig, "");
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
    equals: this.recipeEquals
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
