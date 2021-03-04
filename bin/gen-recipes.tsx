import { Generator, MessageFunction } from "./gen-files";
import { loadRecipes } from './loadRecipes';

function generate(msg: MessageFunction): Promise<string> {
  return loadRecipes(msg)
    .then(({ recipes }) => `
      import { Recipe, RecipeKey, StandardRecipe } from "./recipes";
      import { Time, TimeUnit } from "./units/time";

      interface KeyedRecipe<KEY extends RecipeKey> extends Recipe {
        readonly key: KEY;
      }

      export enum RecipeKeyNames {
        ${Array.from(recipes.values()).map(recipe => recipe.key + ",").sort().join("")}
      };

      const RECIPES: Readonly<{ [R in RecipeKey]: Readonly<KeyedRecipe<C>> }> = {
        ${Array.from(recipes.values()).sort((a, b) => a.key.localeCompare(b.key)).map(recipe => `
          ${recipe.key}: new StandardRecipe({
            key: "${recipe.key}",
            name: "${recipe.name}",
            productionTime: new Time(${recipe.productionTime}, TimeUnit.SECONDS),
            components: {${recipe.inputs.map(input => `${input.component}: -${input.amount},`).join("")
      }${recipe.outputs.map(output => `${output.component}: ${output.amount},`).join("")
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
