import COMPONENTS, { ComponentKeyNames } from "./components.generated";
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

export type ComponentCoordinates = readonly [
  ComponentTableOrder,
  TableRowOrder,
  number
];

export type ComponentKey = keyof typeof ComponentKeyNames;

export interface Component {
  readonly key: ComponentKey;
  readonly name: string;
  readonly href: string;
  readonly iconHref: string;
  readonly coordinates: ComponentCoordinates;
  readonly recipes: Readonly<Set<RecipeKey>>;
}

export default COMPONENTS;
