import { ComponentKey } from "./components";
import { emptySet } from '../util/emptySet';

export type UnitCount = number;
export type Hashes = number;

export enum TechnologyKeyNames {
  BasicAssemblingProcess,
  DysonSphereProgram,
  Electromagnetism
};

export type TechnologyKey = keyof typeof TechnologyKeyNames;

export interface Technology {
  readonly key: TechnologyKey,
  readonly name: string;
  readonly href: string;
  readonly iconHref: string;
  readonly prerequisites: Readonly<Set<TechnologyKey>>;
  readonly researchCost: Readonly<Partial<Record<ComponentKey, UnitCount>>>;
  readonly dataVolume: Hashes;
};

const TECHNOLOGIES: Readonly<Record<TechnologyKey, Readonly<Technology>>> = {
  BasicAssemblingProcess: {
    key: "BasicAssemblingProcess",
    name: "Basic Assembling Process",
    href: "https://dsp-wiki.com/Basic_Assembling_Processes_(Tech)",
    iconHref: "https://dsp-wiki.com/images/d/df/Tech_Basic_Assembling_Processes.png",
    prerequisites: emptySet(),
    researchCost: { CircuitBoard: 10, Gear: 10 },
    dataVolume: 1800,
  },
  DysonSphereProgram: {
    key: "DysonSphereProgram",
    name: "Dyson Sphere Program",
    href: "https://dsp-wiki.com/Dyson_Sphere_Program_(Tech)",
    iconHref: "https://dsp-wiki.com/images/4/43/Tech_Dyson_Sphere_Program.png",
    prerequisites: emptySet(),
    researchCost: {},
    dataVolume: 0,
  },
  Electromagnetism: {
    key: "Electromagnetism",
    name: "Electromagnetism",
    href: "https://dsp-wiki.com/Electromagnetism_(Tech)",
    iconHref: "https://dsp-wiki.com/images/3/33/Tech_Electromagnetism.png",
    prerequisites: emptySet(),
    researchCost: { MagneticCoil: 10 },
    dataVolume: 1200,
  }
};

export default TECHNOLOGIES;
