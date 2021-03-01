import fetch from "node-fetch";
import { JSDOM } from "jsdom";
import React from "react";
import { Text } from "ink";
import { Generator, MessageFunction } from "./gen-files";

const WIKI = "https://dsp-wiki.com";
const ITEMS_PAGE = `${WIKI}/Items`;
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
    "FabricationComponents"
];

type Srcset = { src: string, size: number }[];

type ComponentCell = {
    table: string,
    key: string,
    tableRow: string,
    td: Node,
    cellIndex: number,
    title: string,
    href: string,
    srcset?: Srcset,
};

function componentCells(document: Document, table: string, rowOffset: number, selector: string): ComponentCell[] {
    function loadTrTags() {
        return Array.from(document.querySelectorAll(selector));
    }

    function getSrcsetFromDoc(document: Element, selector: string): Srcset | undefined {
        function getMatchingImgTags(): string[] {
            return [
                (Array.from(document.querySelectorAll(selector)) as any[])
                    .map(({src, srcset}) => `${src} 1x, ${srcset}`)
                    .sort((a, b) => b.length - a.length)[0]
                || undefined
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
        return Array.from(tr.querySelectorAll("div.item_icon_container a"))
            .map((a, cellIndex) => {
                const cell = a.parentNode?.parentNode as Element;
                const title: string = (a as any).title as string;

                return {
                    table,
                    key: title.replace(/[^a-z0-9]/ig, ""),
                    tableRow: TABLE_ROW_ORDER[rowOffset + trIndex],
                    td: cell,
                    cellIndex,
                    title,
                    href: (a as any).href as string,
                    srcset: getSrcsetFromDoc(cell as Element, "div a img"),
                };
            })
            .filter(cell => cell.title !== "Blank");
    }

    return loadTrTags().map(cellsFromTrs).reduce((arr, cells) => arr.concat(cells), []);
}

function generate(messageFunction: MessageFunction): Promise<string> {
    messageFunction(<Text color="green" dimColor>Fetching <Text inverse> {ITEMS_PAGE} </Text>...</Text>);
    return fetch(ITEMS_PAGE)
        .then(response => response.text())
        .then(text => {
            messageFunction(<Text>Parsing DOM...</Text>);
            return new JSDOM(text).window.document;
        })
        .then(document =>
                componentCells(
                    document,
                    "Components",
                    0,
                    "#mw-content-text > div.mw-parser-output > div > table:nth-child(5) > tbody > tr"
                ).concat(componentCells(
                    document,
                    "Buildings",
                    7,
                    "#mw-content-text > div.mw-parser-output > div > table:nth-child(8) > tbody > tr"
                ))
                .sort((c1, c2) => c1.key.localeCompare(c2.key)),
        )
        .then(components => `
            import { RecipeKey } from "./recipes";

            export enum ComponentTableOrder {
                Components,
                Buildings,
            }

            export enum TableRowOrder {
                RawComponents = 10,
                RefinedComponents = 20,
                BasicComponents = 30,
                IntermediateComponents1 = 40,
                IntermediateComponents2 = 50,
                AdvancedComponents1 = 60,
                AdvancedComponents2 = 70,

                PowerBuildings = 1010,
                LogisticComponents = 1020,
                SourceComponents = 1030,
                FabricationComponents = 1040,
            }

            export type ComponentCoordinates = readonly [ ComponentTableOrder, TableRowOrder, number ];

            export enum ComponentKeyNames {
                ${components
                    .map(c => c.key)
                    .join(",")
                }
            };

            export type ComponentKey = keyof typeof ComponentKeyNames;

            export interface Component {
                readonly key: ComponentKey;
                readonly name: string;
                readonly href: string;
                readonly iconHref: string;
                readonly coordinates: ComponentCoordinates,
                readonly recipes: Readonly<Set<RecipeKey>>;
            };

            interface KeyedComponent<KEY extends ComponentKey> extends Component {
                readonly key: KEY;
            }

            const COMPONENTS: Readonly<{ [C in ComponentKey]: Readonly<KeyedComponent<C>> }> = {
                ${components
                    .map(c => `
                        ${c.key}: {
                            key: "${c.key}",
                            name: "${c.title}",
                            href: "${WIKI}${c.href}",
                            iconHref: "${WIKI}${(c.srcset || []).sort((a, b) => b.size - a.size).map(s => s.src)[0] || ""}",
                            coordinates: [ ComponentTableOrder.${c.table}, TableRowOrder.${c.tableRow}, ${c.cellIndex * 10} ],
                            recipes: new Set([])
                        },
                    `)
                    .join("")
                }
            };

            export default COMPONENTS;
        `);
}

export const GENFILE: Generator = {
    file: "src/data/components.generated.ts",
    name: "Component Source Data",
    generate,
};
