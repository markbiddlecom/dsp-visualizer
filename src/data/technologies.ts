import { ComponentKey } from "./components";
import { TECHNOLOGIES, TechnologyKeyNames } from './technologies.generated';

export type UnitCount = number;
export type Hashes = number;

export type TechnologyKey = keyof typeof TechnologyKeyNames;

export interface Technology {
  readonly name: string;
  readonly href: string;
  readonly iconHref: string;
  readonly prerequisites: Readonly<Set<TechnologyKey>>;
  readonly unlocks: Readonly<Set<ComponentKey>>;
  readonly researchCost: Readonly<Partial<Record<ComponentKey, UnitCount>>>;
  readonly dataVolume: Hashes;
};

export default TECHNOLOGIES;
