import { RecipeMod, makeRecipeModifer } from "./recipeMods";
import { Power, PowerUnit } from "./units/power";
import { SI } from "./units/units";

export enum BuildingKeyNames {
  AssemblingMachineMkI,
  AssemblingMachineMkII,
  AssemblingMachineMkIII,
  ChemicalPlant,
  EnergyExchanger,
  Fractionator,
  MatrixLab,
  MiniatureParticleCollider,
  MiningMachine,
  OilExtractor,
  OilRefinery,
  OrbitalCollector,
  Smelter,
  WaterPump,
}

export type BuildingKey = keyof typeof BuildingKeyNames;

export interface Building {
  readonly key: BuildingKey;
  readonly name: string;
  readonly href: string;
  readonly iconHref: string;
  readonly workConsumption: Power;
  readonly idleConsumption: Power;
  readonly recipeMods: Readonly<Readonly<RecipeMod>[]>;
}

interface KeyedBuilding<KEY extends BuildingKey> extends Building {
  readonly key: KEY;
}

const BUILDINGS: Readonly<{ [B in BuildingKey]: Readonly<KeyedBuilding<B>> }> = {
  AssemblingMachineMkI: {
    key: "AssemblingMachineMkI",
    name: "Assembling Machine Mk. I",
    href: "https://dsp-wiki.com/Assembling_Machine_Mk.I",
    iconHref: "https://dsp-wiki.com/images/8/8e/Icon_Assembling_Machine_Mk.I.png",
    workConsumption: SI.KILO(PowerUnit.WATTS).of(270),
    idleConsumption: SI.KILO(PowerUnit.WATTS).of(12),
    recipeMods: [
      makeRecipeModifer({ productionTime: pt => pt.scale(1 / 0.75) }),
    ],
  },
  AssemblingMachineMkII: {
    key: "AssemblingMachineMkII",
    name: "Assembling Machine Mk. II",
    href: "https://dsp-wiki.com/Assembling_Machine_Mk.II",
    iconHref: "https://dsp-wiki.com/images/9/93/Icon_Assembling_Machine_Mk.II.png",
    workConsumption: SI.KILO(PowerUnit.WATTS).of(380),
    idleConsumption: SI.KILO(PowerUnit.WATTS).of(15),
    recipeMods: [],
  },
  AssemblingMachineMkIII: {
    key: "AssemblingMachineMkIII",
    name: "Assembling Machine Mk. III",
    href: "https://dsp-wiki.com/Assembling_Machine_Mk.III",
    iconHref: "https://dsp-wiki.com/images/8/8c/Icon_Assembling_Machine_Mk.III.png",
    workConsumption: SI.KILO(PowerUnit.WATTS).of(780),
    idleConsumption: SI.KILO(PowerUnit.WATTS).of(18),
    recipeMods: [
      makeRecipeModifer({ productionTime: pt => pt.scale(1 / 1.5) }),
    ],
  },
  ChemicalPlant: {
    key: "ChemicalPlant",
    name: "Chemical Plant",
    href: "https://dsp-wiki.com/Chemical_Plant",
    iconHref: "https://dsp-wiki.com/images/f/f9/Icon_Chemical_Plant.png",
    workConsumption: SI.KILO(PowerUnit.WATTS).of(720),
    idleConsumption: SI.KILO(PowerUnit.WATTS).of(24),
    recipeMods: [],
  },
  EnergyExchanger: {
    key: "EnergyExchanger",
    name: "Energy Exchanger",
    href: "https://dsp-wiki.com/Energy_Exchanger",
    iconHref: "https://dsp-wiki.com/images/6/64/Icon_Energy_Exchanger.png",
    workConsumption: PowerUnit.WATTS.of(0),
    idleConsumption: PowerUnit.WATTS.of(0),
    recipeMods: [],
  },
  Fractionator: {
    key: "Fractionator",
    name: "Fractionator",
    href: "https://dsp-wiki.com/Fractionator",
    iconHref: "https://dsp-wiki.com/images/2/28/Icon_Fractionator.png",
    workConsumption: SI.KILO(PowerUnit.WATTS).of(720),
    idleConsumption: SI.KILO(PowerUnit.WATTS).of(18),
    recipeMods: [],
  },
  MatrixLab: {
    key: "MatrixLab",
    name: "Matrix Lab",
    href: "https://dsp-wiki.com/Matrix_Lab",
    iconHref: "https://dsp-wiki.com/images/b/b7/Icon_Matrix_Lab.png",
    workConsumption: SI.KILO(PowerUnit.WATTS).of(480),
    idleConsumption: SI.KILO(PowerUnit.WATTS).of(12),
    recipeMods: [],
  },
  MiniatureParticleCollider: {
    key: "MiniatureParticleCollider",
    name: "Miniature Particle Collider",
    href: "https://dsp-wiki.com/Miniature_Particle_Collider",
    iconHref: "https://dsp-wiki.com/images/a/aa/Icon_Miniature_Particle_Collider.png",
    workConsumption: SI.MEGA(PowerUnit.WATTS).of(12),
    idleConsumption: SI.KILO(PowerUnit.WATTS).of(120),
    recipeMods: [],
  },
  MiningMachine: {
    key: "MiningMachine",
    name: "Mining Machine",
    href: "https://dsp-wiki.com/Mining_Machine",
    iconHref: "https://dsp-wiki.com/images/c/cf/Icon_Mining_Machine.png",
    workConsumption: SI.KILO(PowerUnit.WATTS).of(420),
    idleConsumption: SI.KILO(PowerUnit.WATTS).of(24),
    recipeMods: [],
  },
  OilExtractor: {
    key: "OilExtractor",
    name: "Oil Extractor",
    href: "https://dsp-wiki.com/Oil_Extractor",
    iconHref: "https://dsp-wiki.com/images/8/8f/Icon_Oil_Extractor.png",
    workConsumption: SI.KILO(PowerUnit.WATTS).of(840),
    idleConsumption: SI.KILO(PowerUnit.WATTS).of(24),
    recipeMods: [],
  },
  OilRefinery: {
    key: "OilRefinery",
    name: "Oil Refinery",
    href: "https://dsp-wiki.com/Oil_Refinery",
    iconHref: "https://dsp-wiki.com/images/7/74/Icon_Oil_Refinery.png",
    workConsumption: SI.KILO(PowerUnit.WATTS).of(960),
    idleConsumption: SI.KILO(PowerUnit.WATTS).of(24),
    recipeMods: [],
  },
  OrbitalCollector: {
    key: "OrbitalCollector",
    name: "Orbital Collector",
    href: "https://dsp-wiki.com/Orbital_Collector",
    iconHref: "https://dsp-wiki.com/images/6/64/Icon_Orbital_Collector.png",
    workConsumption: SI.MEGA(PowerUnit.WATTS).of(30),
    idleConsumption: PowerUnit.WATTS.of(0),
    recipeMods: [],
  },
  Smelter: {
    key: "Smelter",
    name: "Smelter",
    href: "https://dsp-wiki.com/Smelter",
    iconHref: "https://dsp-wiki.com/images/e/e6/Icon_Smelter.png",
    workConsumption: SI.KILO(PowerUnit.WATTS).of(360),
    idleConsumption: SI.KILO(PowerUnit.WATTS).of(12),
    recipeMods: [],
  },
  WaterPump: {
    key: "WaterPump",
    name: "Water Pump",
    href: "https://dsp-wiki.com/Water_Pump",
    iconHref: "https://dsp-wiki.com/images/6/69/Icon_Water_Pump.png",
    workConsumption: SI.KILO(PowerUnit.WATTS).of(300),
    idleConsumption: SI.KILO(PowerUnit.WATTS).of(12),
    recipeMods: [],
  },
};

export default BUILDINGS;
