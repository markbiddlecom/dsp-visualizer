import { BuildingKey } from './buildings';
import { ComponentKey } from './components';
import { TechnologyKey } from './technologies';
import { Time } from './units/time';

export type ProductionTime = number;

export enum RecipeKeyNames {

}

export type RecipeKey = keyof typeof RecipeKeyNames;

export interface Recipe {
  readonly key: RecipeKey;
  readonly name: string;
  readonly href: string;
  readonly iconHref: string;
  readonly buildings: Readonly<Set<BuildingKey>>;
  readonly inputs: Readonly<Set<ComponentKey>>;
  readonly outputs: Readonly<Set<ComponentKey>>;
  readonly prerequisites: Readonly<Set<TechnologyKey>>;
}

export interface TimedRecipe extends Recipe {
  readonly productionTime: Time;
}

export const RECIPES: Readonly<Record<RecipeKey, Readonly<Recipe>>> = {

};

export type StandardRecipeOptions = Omit<TimedRecipe, "buildings" | "inputs" | "outputs" | "prerequisites"> & {
  buildings: BuildingKey[],
  prerequisites: TechnologyKey[],
  components: Partial<Record<ComponentKey, number>>,
};

export class StandardRecipe implements TimedRecipe {
  readonly key: RecipeKey;
  readonly name: string;
  readonly href: string;
  readonly iconHref: string;
  readonly buildings: Readonly<Set<BuildingKey>>;
  readonly prerequisites: Readonly<Set<TechnologyKey>>;

  readonly components: Readonly<Map<ComponentKey, number>>;
  readonly productionTime: Time;

  constructor(opts: StandardRecipeOptions) {
    this.key = opts.key;
    this.name = opts.name;
    this.href = opts.href;
    this.iconHref = opts.iconHref;
    this.prerequisites = new Set(opts.prerequisites);
    this.buildings = new Set(opts.buildings);

    this.components = new Map(Object.entries(opts.components).filter(([, amt]) => Boolean(amt)) as [ComponentKey, number][]);
    this.productionTime = opts.productionTime;
  }

  get inputs(): Readonly<Set<ComponentKey>> {
    return new Set(Object.entries(this.components).filter(([, amount]) => amount < 0).map(([c]) => c as ComponentKey));
  }

  get outputs(): Readonly<Set<ComponentKey>> {
    return new Set(Object.entries(this.components).filter(([, amount]) => amount > 0).map(([c]) => c as ComponentKey));
  }
}
