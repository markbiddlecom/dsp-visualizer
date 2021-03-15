import { JSDOM } from "jsdom";
import React from "react";
import { createBatchingPromise, nameToKey, toFlattenedArray, toMapByKey, Truthy } from "./bin-util";
import { WIKI } from "./consts";
import { Generator, MessageFunction } from "./gen-files";
import { BasicTechnologyInfo, loadRecipes, Recipes } from "./loadRecipes";
import { Text } from "ink";
import { fetchAndCache } from "./fetchAndCache";

type FullTechnologyInfo = BasicTechnologyInfo & {
  unlocks: string[];
  consumption: { item: string, amt: number }[];
  hashes: number;
};

function getTechnologiesToProcess(recipes: Recipes): BasicTechnologyInfo[] {
  return Array.from(
    Array.from(recipes.values())
      .map(({technologies}) => technologies)
      .reduce(toFlattenedArray(), [])
      .reduce(toMapByKey(tech => tech.name), new Map())
      .values(),
  );
}

async function fetchAndProcessTechnology(tech: BasicTechnologyInfo): Promise<FullTechnologyInfo | undefined> {
  const html = await fetchAndCache(WIKI + tech.href, tech.href);
  const doc = new JSDOM(html).window.document;
  const techPanel = doc.querySelector("#mw-content-text div.tech_panel");
  if (!techPanel) {
    return undefined;
  }
  const unlocks = Array.from(techPanel.querySelectorAll<HTMLAnchorElement>("div.tech_unlock_item a") || [])
    .map(a => a.title)
    .map(nameToKey);
  const consumption = Array.from(techPanel.querySelectorAll("div.tech_consumption div.tt_recipe_item") || [])
    .map(div => {
      const item = div.querySelector("a")?.title;
      const amtText = div.querySelector("div")?.textContent;
      return (
        item !== undefined
          && amtText !== undefined
          && { item: nameToKey(item), amt: Number(amtText) }
      ) || undefined;
    })
    .filter(Truthy);
  const [, hashCount, hashPrefix] = /([\d,]*(?:\.\d+)?)\s*([km])?/i.exec(
    techPanel.querySelector<HTMLSpanElement>("span.hash_count")?.textContent || "") || [];
  return {
    ...tech,
    unlocks,
    consumption,
    hashes: (hashCount && Number(hashCount.replace(/,/g, ""))
      * ((hashPrefix || "").toLowerCase() === "k" ? 1000 : 1)
    ) || 0,
  };
}

function generate(msg: MessageFunction): Promise<string> {
  return loadRecipes(msg)
    .then(({recipes}) => createBatchingPromise({
      items: getTechnologiesToProcess(recipes),
      processFunction: fetchAndProcessTechnology,
      onBatchStart: items => {
        msg(<Text color="green">Fetching technologies for {
          items.map((component, index) => <Text key={component.key}>
            <Text inverse> {component.href} </Text>
            {index < items.length - 1 && ", "}
            {index === items.length - 2 && "and "}
          </Text>)
        }...</Text>);
        return true;
      },
    }))
    .then(technologies => technologies.filter(Truthy))
    .then(technologies => `
      import { ComponentKey } from './components';
      import { Technology, TechnologyKey } from "./technologies";

      interface KeyedTechnology<KEY extends TechnologyKey> extends Technology {
        readonly key: KEY;
      }

      export enum TechnologyKeyNames {
        ${technologies.map(t => `${t.key},`).sort().join("\n")}
      };

      export const TECHNOLOGIES: Readonly<{ [T in TechnologyKey]: Readonly<KeyedTechnology<T>> }> = {
        ${technologies.map(tech => `
          ${tech.key}: {
            key: "${tech.key}",
            name: "${tech.name}",
            href: "${WIKI}${tech.href}",
            iconHref: "${WIKI}${tech.iconHref}",
            prerequisites: new Set(),
            unlocks: new Set([${tech.unlocks.map(item => `"${item}",`).join("\n")}] as ComponentKey[]),
            researchCost: {${tech.consumption.map(component => `"${component.item}": ${component.amt},`).join("\n")}},
            dataVolume: ${tech.hashes}
          },
        `).join("\n")}
      };
    `);
}

export const GENFILE: Generator = {
  file: "src/data/technologies.generated.ts",
  name: "Technology Source Data",
  generate,
};
