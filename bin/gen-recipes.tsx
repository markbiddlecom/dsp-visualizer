import { ComponentCell, loadComponentCells } from "./gen-components";
import { Generator, MessageFunction } from "./gen-files";
import { Text } from "ink";
import React from "react";
import { JSDOM } from "jsdom";
import fetch from "node-fetch";
import { WIKI } from "./consts";

type RecipeData = {
    key: string,
    name: string,
    href: string,
    iconHref: string,
    buildings: string[],
    prerequisites: string[],
    inputs: [],
    outputs: [],
};

type ComponentPage = ComponentCell & { doc: Document };

const Truthy: <T>(x: T | undefined) => x is T = Boolean as any;

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

    function parseRecipeComponent(componentDiv: Element) {
        return {
            component: componentDiv.querySelector("a")?.title.replace(/[^a-z0-9]/ig, ""),
            amount: parseFloat(componentDiv.querySelector("div")?.innerHTML || "0"),
        };
    }

    function parseRecipeBuilding(a: Element) {
        return ((a as any).title as string | undefined)?.replace(/[^a-z0-9]/ig, "");
    }

    function parseRecipeTechnology(a: Element) {
        return ((a as any).title as string | undefined)
            ?.replace(/\s*\(Tech(nology)?\)$/i, "")
            .replace(/[^a-z0-9]/ig, "");
    }

    function parseRecipe(recipeDiv: Element) {
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
            inputs: Array.from(recipeDiv.querySelectorAll("div.tt_recipe_item")).map(parseRecipeComponent),
            outputs: Array.from(recipeDiv.querySelectorAll("div.tt_output_item")).map(parseRecipeComponent),
            productionTime: parseFloat(recipeDiv.querySelector("div.tt_rec_arrow div")?.innerHTML || "0"),
            buildings: Array.from(rowCells[buildingColumn]?.querySelectorAll("a") || [])
                .map(parseRecipeBuilding)
                .filter(Truthy),
            technologies: Array.from(rowCells[technologyColumn]?.querySelectorAll("a") || [])
                .map(parseRecipeTechnology)
                .filter(Truthy),
        };
    }

    return {
        recipes: Array.from(doc.querySelectorAll("div.tt_recipe"))
            .map(parseRecipe)
            .filter(Truthy)
            .filter(({outputs}) => outputs.filter(({ component }) => component === cell.key).length),
        ...cell
    };
}

function generate(msg: MessageFunction): Promise<string> {
    return loadComponentCells(msg)
        .then(components => createCellBatches(msg, components))
        .then(components => components.map(findRecipes))
        .then(components => "export const RECIPE_DATA = " + JSON.stringify(components));
}

export const GENFILE: Generator = {
    file: "src/data/recipes.generated.ts",
    name: "Recipe Source Data",
    generate,
};
