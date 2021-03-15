import { identityFunction } from "../util/identityFunction";
import { Recipe, TimedRecipe } from "./recipes";

export type RecipeMod = (input: Recipe) => Readonly<Recipe>;

export type RecipeMaps = {
  [P in keyof Omit<TimedRecipe, "key" | "name" | "href" | "iconHref">]: (v: TimedRecipe[P]) => TimedRecipe[P];
};

export function makeRecipeModifer(propertyMods: Partial<RecipeMaps>): RecipeMod {
  return recipe => Object.fromEntries(
    Object
      .entries(recipe)
      .map(([property, value]) => [property, ((propertyMods as any)[property] || identityFunction())(value)]),
  ) as Readonly<Recipe>;
}
