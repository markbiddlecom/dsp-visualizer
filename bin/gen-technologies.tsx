import { Generator, MessageFunction } from './gen-files';
import { loadRecipes } from './loadRecipes';

function generate(msg: MessageFunction): Promise<string> {
  return loadRecipes(msg)
    .then(({ recipes }) => `

    `);;
}

export const TECHNOLOGIES: Generator = {
  file: "src/data/technologies.generated.ts",
  name: "Technology Source Data",
  generate,
};