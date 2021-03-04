import { WIKI } from './consts';
import { Generator, MessageFunction } from './gen-files';
import { loadComponentCells } from './loadComponentCells';

function generate(messageFunction: MessageFunction): Promise<string> {
    return loadComponentCells(messageFunction)
        .then(components => `
            import { Component, ComponentKey, ComponentTableOrder, TableRowOrder } from "./components";

            interface KeyedComponent<KEY extends ComponentKey> extends Component {
                readonly key: KEY;
            }

            export enum ComponentKeyNames {
                ${components
                    .map(c => c.key)
                    .join(",")
                },
            };

            const COMPONENTS: Readonly<{ [C in ComponentKey]: Readonly<KeyedComponent<C>> }> = {
                ${components
                    .map(c => `
                        ${c.key}: {
                            key: "${c.key}",
                            name: "${c.title}",
                            href: "${WIKI}${c.href}",
                            iconHref: "${WIKI}${(c.srcset || []).sort((a, b) => b.size - a.size).map(s => s.src)[0] || ""}",
                            coordinates: [ ComponentTableOrder.${c.table}, TableRowOrder.${c.tableRow}, ${(c.cellIndex + 1) * 10} ],
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
