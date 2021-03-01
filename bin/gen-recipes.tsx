import { ComponentCell, loadComponentCells } from "./gen-components";
import { Generator, MessageFunction } from "./gen-files";
import { Text } from "ink";
import React from "react";
import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import { WIKI } from "./consts";

type RecipeComponent = {
    component: string,
    amount: number,
}

type Recipe = {
    inputs: RecipeComponent[],
    outputs: RecipeComponent[],
    productionTime: number,
    buildings: string[],
    technologies: string[],
    equals(other: Recipe): boolean,
};

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
        && arrEq(this.outputs, other.outputs, recipeCompEq)
}

type NamedRecipe = Recipe & { key: string, name: string };

type ComponentPage = ComponentCell & { doc: Document };

const Truthy: <T>(x: T | undefined) => x is T = Boolean as any;
const ASSIGNED_RECIPE_NAMES: Map<string, NamedRecipe> = new Map();

function createCellBatches(msg: MessageFunction, components: ComponentCell[]): Promise<ComponentPage[]> {
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

    async function fetchNextBatch(): Promise<ComponentPage[]> {
        const nextBatch = batches.shift();
        if (!nextBatch) {
            return Promise.resolve(parsedComponentPages);
        }

        msg(<Text color="green">Fetching {
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

function findRecipes({doc, ...cell}: ComponentPage) {
    function findParent(elem: Element | undefined, nodeName: string) {
        while (elem && elem.nodeName !== nodeName) {
            elem = elem.parentElement || undefined;
        }
        return elem;
    }

    function parseRecipeComponent(componentDiv: Element): RecipeComponent | undefined {
        const component = componentDiv.querySelector("a")?.title.replace(/[^a-z0-9]/ig, "");
        return component ? {
            component,
            amount: parseFloat(componentDiv.querySelector("div")?.innerHTML || "0"),
        } : undefined;
    }

    function parseRecipeBuilding(a: Element) {
        return ((a as any).title as string | undefined)?.replace(/[^a-z0-9]/ig, "");
    }

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
            equals: recipeEquals
        };
    }

    function arrDiff<T>(arr1: T[], arr2: T[]) {
        const arr1Set = new Set(arr1);
        const result: T[] = [];
        for (let t of arr2) {
            if (!arr1Set.has(t)) {
                result.push(t);
            }
        }
        return result;
    }

    function nameRecipe(recipe: Recipe): NamedRecipe {
        let baseName: string;
        if (recipe.outputs.length === 1) {
            baseName = recipe.outputs[0].component;
        } else if (recipe.technologies.length === 1) {
            baseName = recipe.technologies[0];
        } else {
            baseName = "Production Recipe";
        }

        const matchingRecipe = ASSIGNED_RECIPE_NAMES.get(baseName);
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

        if (ASSIGNED_RECIPE_NAMES.get(refinedName)?.equals(recipe)) {
            return ASSIGNED_RECIPE_NAMES.get(refinedName) as NamedRecipe;
        }

        let finalName: string = refinedName;
        for (let i = 2; ASSIGNED_RECIPE_NAMES.has(finalName); finalName = `${refinedName}; Version ${i++}`);

        const namedRecipe = {
            name: finalName,
            key: finalName.replace(/[^a-z0-9]/ig, ""),
            ...recipe
        };
        ASSIGNED_RECIPE_NAMES.set(finalName, namedRecipe);

        return namedRecipe;
    }

    return {
        recipes: Array.from(doc.querySelectorAll("div.tt_recipe"))
            .map(parseRecipe)
            .filter(Truthy)
            .filter(({outputs}) => outputs.filter(({ component }) => component === cell.key).length)
            .map(nameRecipe),
        ...cell
    };
}

function generate(msg: MessageFunction): Promise<string> {
    return loadComponentCells(msg)
        .then(components => createCellBatches(msg, components))
        .then(components => components.map(findRecipes))
        .then(components => `
            import { Recipe, RecipeKey, StandardRecipe } from "./recipes";
            import { Time, TimeUnit } from "./units/time";

            interface KeyedRecipe<KEY extends RecipeKey> extends Recipe {
                readonly key: KEY;
            }

            export enum RecipeKeyNames {
                ${Array.from(ASSIGNED_RECIPE_NAMES.values()).map(recipe => recipe.key + ",").sort().join("")}
            };

            const RECIPES: Readonly<{ [R in RecipeKey]: Readonly<KeyedRecipe<C>> }> = {
                ${Array.from(ASSIGNED_RECIPE_NAMES.values()).sort((a, b) => a.key.localeCompare(b.key)).map(recipe => `
                    ${recipe.key}: new StandardRecipe({
                        key: "${recipe.key}",
                        name: "${recipe.name}",
                        productionTime: new Time(${recipe.productionTime}, TimeUnit.SECONDS),
                        components: {${
                            recipe.inputs.map(input => `${input.component}: -${input.amount},`).join("")
                        }${
                            recipe.outputs.map(output => `${output.component}: ${output.amount},`).join("")
                        }},
                        buildings: [${recipe.buildings.map(b => `"${b}"`).join(",")}],
                        prerequisites: [${recipe.technologies.map(t => `"${t}"`).join(",")}],
                    }),
                `).join("")}
            };

            export default RECIPES;
        `);
}

export const GENFILE: Generator = {
    file: "src/data/recipes.generated.ts",
    name: "Recipe Source Data",
    generate,
};
