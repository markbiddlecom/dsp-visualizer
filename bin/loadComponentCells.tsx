import React from "react";
import { JSDOM } from "jsdom";
import { Text } from "ink";
import { MessageFunction } from "./gen-files";
import { WIKI } from "./consts";
import { nameToKey, toMapByKey } from "./bin-util";
import { fetchAndCache } from "./fetchAndCache";

const ITEMS_PATH = "/Items";
const ITEMS_PAGE = `${WIKI}${ITEMS_PATH}`;
const TABLE_ROW_ORDER = [
  "RawComponents",
  "RefinedComponents",
  "BasicComponents",
  "IntermediateComponents1",
  "IntermediateComponents2",
  "AdvancedComponents1",
  "AdvancedComponents2",

  "PowerBuildings",
  "LogisticComponents",
  "SourceComponents",
  "FabricationComponents",
];

export type Srcset = { src: string, size: number }[];

export type ComponentCell = {
  table: string;
  key: string;
  tableRow: string;
  td: Node;
  cellIndex: number;
  title: string;
  href: string;
  srcset?: Srcset;
};

export type Components = {
  cells: ComponentCell[];
  cellsByKey: Map<string, ComponentCell>;
};

function componentCells(document: Document, table: string, rowOffset: number, selector: string): ComponentCell[] {
  function loadTrTags() {
    return Array.from(document.querySelectorAll(selector));
  }

  function getSrcsetFromDoc(document: Element, selector: string): Srcset | undefined {
    function getMatchingImgTags(): string[] {
      return [
        Array.from(document.querySelectorAll<HTMLImageElement>(selector))
          .map(({ src, srcset }) => `${src} 1x, ${srcset}`)
          .sort((a, b) => b.length - a.length)[0]
        || undefined,
      ]
        .filter(Boolean) as string[];
    }

    function parseSrcset(srcset: string): Srcset {
      return srcset.split(/,\s*/g)
        .map(src => /^(.*?)\s+(.*)$/.exec(src))
        .map(results => {
          const src = results?.[1] || "";
          const size = results?.[2] || "";
          return {
            src,
            size: Number(size.replace(/[^0-9.]/g, "")),
          };
        });
    }

    return (getMatchingImgTags().map(parseSrcset)[0]) || undefined;
  }

  function cellsFromTrs(tr: Element, trIndex: number): ComponentCell[] {
    return Array.from(tr.querySelectorAll<HTMLAnchorElement>("div.item_icon_container a"))
      .map((a, cellIndex) => {
        const cell = a.parentNode?.parentNode as Element;
        const title: string = a.title;

        return {
          table,
          key: nameToKey(title),
          tableRow: TABLE_ROW_ORDER[rowOffset + trIndex],
          td: cell,
          cellIndex,
          title,
          href: a.href as string,
          srcset: getSrcsetFromDoc(cell as Element, "div a img"),
        };
      })
      .filter(cell => cell.title !== "Blank");
  }

  return loadTrTags().map(cellsFromTrs).reduce((arr, cells) => arr.concat(cells), []);
}

export const loadComponentCells: (messageFunction: MessageFunction) => Promise<Components> = (function() {
  class Loader {
    private responseTextPromise: Promise<string> | undefined = undefined;
    private docPromise: Promise<Document> | undefined = undefined;
    private parsePromise: Promise<Components> | undefined = undefined;

    private memoizeFetch(): Promise<string> {
      return this.responseTextPromise ||
        (this.responseTextPromise = fetchAndCache(ITEMS_PAGE, ITEMS_PATH));
    }

    private memoizeDoc(): Promise<Document> {
      return this.docPromise || (this.docPromise = this.memoizeFetch().then(text => new JSDOM(text).window.document));
    }

    private memoizeParse(): Promise<Components> {
      return this.parsePromise || (this.parsePromise = this.memoizeDoc().then(
        document => {
          const cells = componentCells(
            document,
            "Components",
            0,
            "#mw-content-text > div.mw-parser-output > div > table:nth-child(5) > tbody > tr",
          )
            .concat(componentCells(
              document,
              "Buildings",
              7,
              "#mw-content-text > div.mw-parser-output > div > table:nth-child(8) > tbody > tr",
            ))
            .sort((c1, c2) => c1.key.localeCompare(c2.key));
          return {
            cells,
            cellsByKey: cells.reduce(toMapByKey(cell => cell.key), new Map()),
          };
        }));
    }

    async runWithMessage(messageFunction: MessageFunction): Promise<Components> {
      messageFunction(<Text color="green" dimColor>Fetching <Text inverse> {ITEMS_PAGE} </Text>...</Text>);
      await this.memoizeFetch();

      messageFunction(<Text>Parsing DOM...</Text>);
      await this.memoizeDoc();

      messageFunction(<Text>Processing Components...</Text>);
      return await this.memoizeParse();
    }
  }

  const bindTarget = new Loader();
  return bindTarget.runWithMessage.bind(bindTarget);
})();
