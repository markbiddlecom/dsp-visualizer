import { BuildingKey } from "./buildings";
import { ComponentKey } from "./components";
import { Recipe, RecipeKey, StandardRecipe, TimedRecipe } from "./recipes";
import { TechnologyKey } from "./technologies";
import { Time, TimeUnit } from "./units/time";

export interface KeyedRecipe<KEY extends RecipeKey> extends Recipe {
  readonly key: KEY;
}

export enum RecipeKeyNames {
  Accumulator,
  AnnihilationConstraintSphere,
  AntimatterFuelRod,
  AppliedSuperconductor,
  ArtificialStar,
  AssemblingMachineMkI,
  AssemblingMachineMkII,
  AssemblingMachineMkIII,
  CarbonNanotube,
  CarbonNanotubeGraphene,
  CasimirCrystal,
  CasimirCrystalTitaniumCrystal,
  ChemicalPlant,
  CircuitBoard,
  Coal,
  ConveyorBeltMkI,
  ConveyorBeltMkII,
  ConveyorBeltMkIII,
  CopperIngot,
  CopperOre,
  CrudeOil,
  CrystalSilicon,
  CrystalSiliconCrystalSmelting,
  Deuterium,
  DeuteriumDeuteriumFractionation,
  DeuteriumDeuteriumFractionationVersion2,
  DeuteronFuelRod,
  Diamond,
  DiamondEnergeticGraphite,
  DiracInversionMechanism,
  DysonSphereComponent,
  EMRailEjector,
  ElectricMotor,
  ElectromagneticMatrix,
  ElectromagneticTurbine,
  EnergeticGraphite,
  EnergyExchanger,
  EnergyMatrix,
  FireIce,
  FireIceMiningMachine,
  Foundation,
  FractalSilicon,
  Fractionator,
  FrameMaterial,
  FullAccumulator,
  Gear,
  GearAssemblingMachineMkI,
  GearAssemblingMachineMkII,
  Glass,
  Graphene,
  GravitonLens,
  GravityMatrix,
  HighPuritySilicon,
  Hydrogen,
  HydrogenFuelRod,
  InformationMatrix,
  InterstellarLogisticsStation,
  IronIngot,
  IronOre,
  KimberliteOre,
  LogisticsDrone,
  LogisticsVessel,
  Magnet,
  MagneticCoil,
  MatrixLab,
  MicrocrystallineComponent,
  MiniFusionPowerStation,
  MiniatureParticleCollider,
  MiningMachine,
  OilExtractor,
  OilRefinery,
  OpticalGratingCrystal,
  OrbitalCollector,
  OrganicCrystal,
  OrganicCrystalChemicalPlant,
  OrganicCrystalPolymerChemicalEngineering,
  ParticleBroadband,
  ParticleContainer,
  ParticleContainerElectromagneticTurbine,
  PhotonCombiner,
  PhotonCombinerPrism,
  PlaneFilter,
  PlanetaryLogisticsStation,
  PlasmaExciter,
  PlasmaExtractRefining,
  Plastic,
  Prism,
  Processor,
  QuantumChip,
  RayReceiver,
  ReinforcedThruster,
  SatelliteSubstation,
  SiliconOre,
  SiliconOreMiningMachine,
  SmallCarrierRocket,
  Smelter,
  SolarPanel,
  SolarSail,
  SorterMkI,
  SorterMkII,
  SorterMkIII,
  SpaceWarper,
  SpaceWarperGravitationalWaveRefraction,
  SpiniformStalagmiteCrystal,
  Splitter,
  Steel,
  Stone,
  StoneBrick,
  StorageMkI,
  StorageMkII,
  StorageTank,
  StrangeMatter,
  StructureMatrix,
  SulfuricAcid,
  SulfuricAcidFluidStorageEncapsulation,
  SuperMagneticRing,
  TeslaTower,
  ThermalPowerStation,
  Thruster,
  TitaniumAlloy,
  TitaniumCrystal,
  TitaniumGlass,
  TitaniumIngot,
  TitaniumOre,
  UnipolarMagnet,
  UniverseMatrix,
  VerticalLaunchingSilo,
  Water,
  WaterPump,
  WindTurbine,
  WirelessPowerTower,
  XRayCracking,
}

const RECIPES: Readonly<{ [R in RecipeKey]: Readonly<KeyedRecipe<R>> }> = {
  Accumulator: new StandardRecipe({
    key: "Accumulator",
    name: "Accumulator",
    productionTime: new Time(5, TimeUnit.SECONDS),
    components: {
      CrystalSilicon: -4,
      IronIngot: -6,
      SuperMagneticRing: -6,
      Accumulator: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["EnergyStorage"],
  }),

  AnnihilationConstraintSphere: new StandardRecipe({
    key: "AnnihilationConstraintSphere",
    name: "AnnihilationConstraintSphere",
    productionTime: new Time(20, TimeUnit.SECONDS),
    components: {
      ParticleContainer: -1,
      Processor: -1,
      AnnihilationConstraintSphere: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["ControlledAnnihilationReaction"],
  }),

  AntimatterFuelRod: new StandardRecipe({
    key: "AntimatterFuelRod",
    name: "AntimatterFuelRod",
    productionTime: new Time(12, TimeUnit.SECONDS),
    components: {
      AnnihilationConstraintSphere: -1,
      Antimatter: -10,
      Hydrogen: -10,
      TitaniumAlloy: -1,
      AntimatterFuelRod: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["ControlledAnnihilationReaction"],
  }),

  AppliedSuperconductor: new StandardRecipe({
    key: "AppliedSuperconductor",
    name: "Applied Superconductor",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      FireIce: -2,
      Graphene: 2,
      Hydrogen: 1,
    },
    buildings: ["ChemicalPlant"],
    prerequisites: ["AppliedSuperconductor"],
  }),

  ArtificialStar: new StandardRecipe({
    key: "ArtificialStar",
    name: "ArtificialStar",
    productionTime: new Time(30, TimeUnit.SECONDS),
    components: {
      AnnihilationConstraintSphere: -10,
      FrameMaterial: -20,
      QuantumChip: -10,
      TitaniumAlloy: -20,
      ArtificialStar: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["ArtificialStar"],
  }),

  AssemblingMachineMkI: new StandardRecipe({
    key: "AssemblingMachineMkI",
    name: "AssemblingMachineMkI",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -4,
      Gear: -8,
      IronIngot: -4,
      AssemblingMachineMkI: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["BasicAssemblingProcesses"],
  }),

  AssemblingMachineMkII: new StandardRecipe({
    key: "AssemblingMachineMkII",
    name: "AssemblingMachineMkII",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      AssemblingMachineMkI: -1,
      Graphene: -8,
      Processor: -4,
      AssemblingMachineMkII: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["HighSpeedAssemblingProcesses"],
  }),

  AssemblingMachineMkIII: new StandardRecipe({
    key: "AssemblingMachineMkIII",
    name: "AssemblingMachineMkIII",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      AssemblingMachineMkII: -1,
      ParticleBroadband: -8,
      QuantumChip: -2,
      AssemblingMachineMkIII: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["QuantumPrintingTechnology"],
  }),

  CarbonNanotube: new StandardRecipe({
    key: "CarbonNanotube",
    name: "CarbonNanotube",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      Graphene: -3,
      TitaniumIngot: -1,
      CarbonNanotube: 2,
    },
    buildings: ["ChemicalPlant"],
    prerequisites: ["HighStrengthMaterial"],
  }),

  CarbonNanotubeGraphene: new StandardRecipe({
    key: "CarbonNanotubeGraphene",
    name: "CarbonNanotube (Graphene)",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      SpiniformStalagmiteCrystal: -2,
      CarbonNanotube: 2,
    },
    buildings: ["ChemicalPlant"],
    prerequisites: ["HighStrengthMaterial"],
  }),

  CasimirCrystal: new StandardRecipe({
    key: "CasimirCrystal",
    name: "CasimirCrystal",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      Graphene: -2,
      Hydrogen: -12,
      TitaniumCrystal: -1,
      CasimirCrystal: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["CasimirCrystal"],
  }),

  CasimirCrystalTitaniumCrystal: new StandardRecipe({
    key: "CasimirCrystalTitaniumCrystal",
    name: "CasimirCrystal (TitaniumCrystal)",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      Graphene: -2,
      Hydrogen: -12,
      OpticalGratingCrystal: -6,
      CasimirCrystal: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["CasimirCrystal"],
  }),

  ChemicalPlant: new StandardRecipe({
    key: "ChemicalPlant",
    name: "ChemicalPlant",
    productionTime: new Time(5, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -2,
      Glass: -8,
      Steel: -8,
      StoneBrick: -8,
      ChemicalPlant: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["BasicChemicalEngineering"],
  }),

  CircuitBoard: new StandardRecipe({
    key: "CircuitBoard",
    name: "CircuitBoard",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      CopperIngot: -1,
      IronIngot: -2,
      CircuitBoard: 2,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: [],
  }),

  Coal: new StandardRecipe({
    key: "Coal",
    name: "Coal",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      Coal: 1,
    },
    buildings: ["MiningMachine"],
    prerequisites: [],
  }),

  ConveyorBeltMkI: new StandardRecipe({
    key: "ConveyorBeltMkI",
    name: "ConveyorBeltMkI",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      Gear: -1,
      IronIngot: -2,
      ConveyorBeltMkI: 3,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["BasicLogisticsSystem"],
  }),

  ConveyorBeltMkII: new StandardRecipe({
    key: "ConveyorBeltMkII",
    name: "ConveyorBeltMkII",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      ConveyorBeltMkI: -3,
      ElectromagneticTurbine: -1,
      ConveyorBeltMkII: 3,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["HighEfficiencyLogisticsSystem"],
  }),

  ConveyorBeltMkIII: new StandardRecipe({
    key: "ConveyorBeltMkIII",
    name: "ConveyorBeltMkIII",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      ConveyorBeltMkII: -3,
      Graphene: -1,
      SuperMagneticRing: -1,
      ConveyorBeltMkIII: 3,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["PlanetaryLogisticsSystem"],
  }),

  CopperIngot: new StandardRecipe({
    key: "CopperIngot",
    name: "CopperIngot",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      CopperOre: -1,
      CopperIngot: 1,
    },
    buildings: ["Smelter"],
    prerequisites: ["AutomaticMetallurgy"],
  }),

  CopperOre: new StandardRecipe({
    key: "CopperOre",
    name: "CopperOre",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      CopperOre: 1,
    },
    buildings: ["MiningMachine"],
    prerequisites: [],
  }),

  CrudeOil: new StandardRecipe({
    key: "CrudeOil",
    name: "CrudeOil",
    productionTime: new Time(NaN, TimeUnit.SECONDS),
    components: {
      CrudeOil: 1,
    },
    buildings: ["OilExtractor"],
    prerequisites: ["PlasmaExtractRefining"],
  }),

  CrystalSilicon: new StandardRecipe({
    key: "CrystalSilicon",
    name: "CrystalSilicon",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      HighPuritySilicon: -1,
      CrystalSilicon: 1,
    },
    buildings: ["Smelter"],
    prerequisites: ["CrystalSmelting"],
  }),

  CrystalSiliconCrystalSmelting: new StandardRecipe({
    key: "CrystalSiliconCrystalSmelting",
    name: "CrystalSilicon (Crystal Smelting)",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      FractalSilicon: -1,
      CrystalSilicon: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["ParticleControlTechnology"],
  }),

  Deuterium: new StandardRecipe({
    key: "Deuterium",
    name: "Deuterium",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      Hydrogen: -1,
      Deuterium: 1,
    },
    buildings: ["Fractionator"],
    prerequisites: ["DeuteriumFractionation"],
  }),

  DeuteriumDeuteriumFractionation: new StandardRecipe({
    key: "DeuteriumDeuteriumFractionation",
    name: "Deuterium (Deuterium Fractionation)",
    productionTime: new Time(5, TimeUnit.SECONDS),
    components: {
      Hydrogen: -10,
      Deuterium: 5,
    },
    buildings: ["MiniatureParticleCollider"],
    prerequisites: ["MiniatureParticleCollider"],
  }),

  DeuteriumDeuteriumFractionationVersion2: new StandardRecipe({
    key: "DeuteriumDeuteriumFractionationVersion2",
    name: "Deuterium (Deuterium Fractionation); Version 2",
    productionTime: new Time(NaN, TimeUnit.SECONDS),
    components: {
      Deuterium: 1,
    },
    buildings: ["OrbitalCollector"],
    prerequisites: ["GasGiantsExploitation"],
  }),

  DeuteronFuelRod: new StandardRecipe({
    key: "DeuteronFuelRod",
    name: "DeuteronFuelRod",
    productionTime: new Time(6, TimeUnit.SECONDS),
    components: {
      Deuterium: -10,
      SuperMagneticRing: -1,
      TitaniumAlloy: -1,
      DeuteronFuelRod: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["MiniFusionPowerGeneration"],
  }),

  Diamond: new StandardRecipe({
    key: "Diamond",
    name: "Diamond",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      EnergeticGraphite: -1,
      Diamond: 1,
    },
    buildings: ["Smelter"],
    prerequisites: ["CrystalSmelting"],
  }),

  DiamondEnergeticGraphite: new StandardRecipe({
    key: "DiamondEnergeticGraphite",
    name: "Diamond (EnergeticGraphite)",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      KimberliteOre: -1,
      Diamond: 1,
    },
    buildings: ["Smelter"],
    prerequisites: ["CrystalSmelting"],
  }),

  DiracInversionMechanism: new StandardRecipe({
    key: "DiracInversionMechanism",
    name: "Dirac Inversion Mechanism",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      CriticalPhoton: -2,
      Antimatter: 2,
      Hydrogen: 2,
    },
    buildings: ["MiniatureParticleCollider"],
    prerequisites: ["DiracInversionMechanism"],
  }),

  DysonSphereComponent: new StandardRecipe({
    key: "DysonSphereComponent",
    name: "DysonSphereComponent",
    productionTime: new Time(8, TimeUnit.SECONDS),
    components: {
      FrameMaterial: -3,
      Processor: -3,
      SolarSail: -3,
      DysonSphereComponent: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["HighStrengthLightweightStructure"],
  }),

  ElectricMotor: new StandardRecipe({
    key: "ElectricMotor",
    name: "ElectricMotor",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      Gear: -1,
      IronIngot: -2,
      MagneticCoil: -1,
      ElectricMotor: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["ElectromagneticDrive"],
  }),

  ElectromagneticMatrix: new StandardRecipe({
    key: "ElectromagneticMatrix",
    name: "ElectromagneticMatrix",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -1,
      MagneticCoil: -1,
      ElectromagneticMatrix: 1,
    },
    buildings: ["MatrixLab"],
    prerequisites: ["ElectromagneticMatrix"],
  }),

  ElectromagneticTurbine: new StandardRecipe({
    key: "ElectromagneticTurbine",
    name: "ElectromagneticTurbine",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      ElectricMotor: -2,
      MagneticCoil: -2,
      ElectromagneticTurbine: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["MagneticLevitationTechnology"],
  }),

  EMRailEjector: new StandardRecipe({
    key: "EMRailEjector",
    name: "EMRailEjector",
    productionTime: new Time(6, TimeUnit.SECONDS),
    components: {
      Gear: -20,
      Processor: -5,
      Steel: -20,
      SuperMagneticRing: -10,
      EMRailEjector: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["SolarSailOrbitSystem"],
  }),

  EnergeticGraphite: new StandardRecipe({
    key: "EnergeticGraphite",
    name: "EnergeticGraphite",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      Coal: -2,
      EnergeticGraphite: 1,
    },
    buildings: ["Smelter"],
    prerequisites: ["SmeltingPurification"],
  }),

  EnergyExchanger: new StandardRecipe({
    key: "EnergyExchanger",
    name: "EnergyExchanger",
    productionTime: new Time(15, TimeUnit.SECONDS),
    components: {
      ParticleContainer: -8,
      Processor: -40,
      Steel: -40,
      TitaniumAlloy: -40,
      EnergyExchanger: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["InterstellarPowerTransmission"],
  }),

  EnergyMatrix: new StandardRecipe({
    key: "EnergyMatrix",
    name: "EnergyMatrix",
    productionTime: new Time(6, TimeUnit.SECONDS),
    components: {
      EnergeticGraphite: -2,
      Hydrogen: -2,
      EnergyMatrix: 1,
    },
    buildings: ["MatrixLab"],
    prerequisites: ["EnergyMatrix"],
  }),

  FireIce: new StandardRecipe({
    key: "FireIce",
    name: "FireIce",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      FireIce: 1,
    },
    buildings: ["MiningMachine"],
    prerequisites: [],
  }),

  FireIceMiningMachine: new StandardRecipe({
    key: "FireIceMiningMachine",
    name: "FireIce (MiningMachine)",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      FireIce: NaN,
    },
    buildings: ["OrbitalCollector"],
    prerequisites: ["GasGiantsExploitation"],
  }),

  Foundation: new StandardRecipe({
    key: "Foundation",
    name: "Foundation",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      Steel: -1,
      StoneBrick: -3,
      Foundation: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["EnvironmentModification"],
  }),

  FractalSilicon: new StandardRecipe({
    key: "FractalSilicon",
    name: "FractalSilicon",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      FractalSilicon: 1,
    },
    buildings: ["MiningMachine"],
    prerequisites: [],
  }),

  Fractionator: new StandardRecipe({
    key: "Fractionator",
    name: "Fractionator",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      Glass: -4,
      Processor: -1,
      Steel: -8,
      StoneBrick: -4,
      Fractionator: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["DeuteriumFractionation"],
  }),

  FrameMaterial: new StandardRecipe({
    key: "FrameMaterial",
    name: "FrameMaterial",
    productionTime: new Time(6, TimeUnit.SECONDS),
    components: {
      CarbonNanotube: -4,
      HighPuritySilicon: -1,
      TitaniumAlloy: -1,
      FrameMaterial: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["HighStrengthLightweightStructure"],
  }),

  FullAccumulator: new StandardRecipe({
    key: "FullAccumulator",
    name: "FullAccumulator",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      Accumulator: -1,
      FullAccumulator: 1,
    },
    buildings: ["EnergyExchanger"],
    prerequisites: ["InterstellarPowerTransmission"],
  }),

  Gear: new StandardRecipe({
    key: "Gear",
    name: "Gear",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      IronIngot: -1,
      Gear: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: [],
  }),

  GearAssemblingMachineMkI: new StandardRecipe({
    key: "GearAssemblingMachineMkI",
    name: "Gear (AssemblingMachineMkI)",
    productionTime: new Time(0.67, TimeUnit.SECONDS),
    components: {
      IronIngot: -1,
      Gear: 1,
    },
    buildings: ["AssemblingMachineMkIII"],
    prerequisites: [],
  }),

  GearAssemblingMachineMkII: new StandardRecipe({
    key: "GearAssemblingMachineMkII",
    name: "Gear (AssemblingMachineMkII)",
    productionTime: new Time(1.33, TimeUnit.SECONDS),
    components: {
      IronIngot: -1,
      Gear: 1,
    },
    buildings: ["AssemblingMachineMkI"],
    prerequisites: [],
  }),

  Glass: new StandardRecipe({
    key: "Glass",
    name: "Glass",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      Glass: 1,
    },
    buildings: ["Smelter"],
    prerequisites: ["AutomaticMetallurgy"],
  }),

  Graphene: new StandardRecipe({
    key: "Graphene",
    name: "Graphene",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      EnergeticGraphite: -3,
      SulfuricAcid: -1,
      Graphene: 2,
    },
    buildings: ["ChemicalPlant"],
    prerequisites: ["AppliedSuperconductor"],
  }),

  GravitonLens: new StandardRecipe({
    key: "GravitonLens",
    name: "GravitonLens",
    productionTime: new Time(6, TimeUnit.SECONDS),
    components: {
      Diamond: -4,
      StrangeMatter: -1,
      GravitonLens: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["GravitationalWaveRefraction"],
  }),

  GravityMatrix: new StandardRecipe({
    key: "GravityMatrix",
    name: "GravityMatrix",
    productionTime: new Time(24, TimeUnit.SECONDS),
    components: {
      GravitonLens: -1,
      QuantumChip: -1,
      GravityMatrix: 2,
    },
    buildings: ["MatrixLab"],
    prerequisites: ["SmeltingPurification"],
  }),

  HighPuritySilicon: new StandardRecipe({
    key: "HighPuritySilicon",
    name: "HighPuritySilicon",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      SiliconOre: -2,
      HighPuritySilicon: 1,
    },
    buildings: ["Smelter"],
    prerequisites: ["SmeltingPurification"],
  }),

  Hydrogen: new StandardRecipe({
    key: "Hydrogen",
    name: "Hydrogen",
    productionTime: new Time(NaN, TimeUnit.SECONDS),
    components: {
      Hydrogen: 1,
    },
    buildings: ["OrbitalCollector"],
    prerequisites: ["GasGiantsExploitation"],
  }),

  HydrogenFuelRod: new StandardRecipe({
    key: "HydrogenFuelRod",
    name: "HydrogenFuelRod",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      Hydrogen: -5,
      TitaniumIngot: -1,
      HydrogenFuelRod: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["EnergyStorage"],
  }),

  InformationMatrix: new StandardRecipe({
    key: "InformationMatrix",
    name: "InformationMatrix",
    productionTime: new Time(10, TimeUnit.SECONDS),
    components: {
      ParticleBroadband: -1,
      Processor: -2,
      InformationMatrix: 1,
    },
    buildings: ["MatrixLab"],
    prerequisites: ["InformationMatrix"],
  }),

  InterstellarLogisticsStation: new StandardRecipe({
    key: "InterstellarLogisticsStation",
    name: "InterstellarLogisticsStation",
    productionTime: new Time(30, TimeUnit.SECONDS),
    components: {
      ParticleContainer: -20,
      PlanetaryLogisticsStation: -1,
      TitaniumAlloy: -50,
      InterstellarLogisticsStation: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["InterstellarLogisticsSystem"],
  }),

  IronIngot: new StandardRecipe({
    key: "IronIngot",
    name: "IronIngot",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      IronOre: -1,
      IronIngot: 1,
    },
    buildings: ["Smelter"],
    prerequisites: ["AutomaticMetallurgy"],
  }),

  IronOre: new StandardRecipe({
    key: "IronOre",
    name: "IronOre",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      IronOre: 1,
    },
    buildings: ["MiningMachine"],
    prerequisites: [],
  }),

  KimberliteOre: new StandardRecipe({
    key: "KimberliteOre",
    name: "KimberliteOre",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      KimberliteOre: 1,
    },
    buildings: ["MiningMachine"],
    prerequisites: [],
  }),

  LogisticsDrone: new StandardRecipe({
    key: "LogisticsDrone",
    name: "LogisticsDrone",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      IronIngot: -5,
      Processor: -2,
      Thruster: -2,
      LogisticsDrone: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["PlanetaryLogisticsSystem"],
  }),

  LogisticsVessel: new StandardRecipe({
    key: "LogisticsVessel",
    name: "LogisticsVessel",
    productionTime: new Time(6, TimeUnit.SECONDS),
    components: {
      Processor: -10,
      ReinforcedThruster: -2,
      TitaniumAlloy: -10,
      LogisticsVessel: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["InterstellarLogisticsSystem"],
  }),

  Magnet: new StandardRecipe({
    key: "Magnet",
    name: "Magnet",
    productionTime: new Time(1.5, TimeUnit.SECONDS),
    components: {
      IronOre: -1,
      Magnet: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["AutomaticMetallurgy"],
  }),

  MagneticCoil: new StandardRecipe({
    key: "MagneticCoil",
    name: "MagneticCoil",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      CopperIngot: -1,
      Magnet: -2,
      MagneticCoil: 2,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: [],
  }),

  MatrixLab: new StandardRecipe({
    key: "MatrixLab",
    name: "MatrixLab",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -4,
      Glass: -4,
      IronIngot: -8,
      MagneticCoil: -4,
      MatrixLab: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["ElectromagneticMatrix"],
  }),

  MicrocrystallineComponent: new StandardRecipe({
    key: "MicrocrystallineComponent",
    name: "MicrocrystallineComponent",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      CopperIngot: -1,
      HighPuritySilicon: -2,
      MicrocrystallineComponent: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["SemiconductorMaterial"],
  }),

  MiniatureParticleCollider: new StandardRecipe({
    key: "MiniatureParticleCollider",
    name: "MiniatureParticleCollider",
    productionTime: new Time(15, TimeUnit.SECONDS),
    components: {
      FrameMaterial: -20,
      Graphene: -10,
      Processor: -8,
      SuperMagneticRing: -50,
      TitaniumAlloy: -20,
      MiniatureParticleCollider: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["MiniatureParticleCollider"],
  }),

  MiniFusionPowerStation: new StandardRecipe({
    key: "MiniFusionPowerStation",
    name: "MiniFusionPowerStation",
    productionTime: new Time(10, TimeUnit.SECONDS),
    components: {
      CarbonNanotube: -8,
      Processor: -4,
      SuperMagneticRing: -10,
      TitaniumAlloy: -12,
      MiniFusionPowerStation: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["MiniFusionPowerGeneration"],
  }),

  MiningMachine: new StandardRecipe({
    key: "MiningMachine",
    name: "MiningMachine",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -2,
      Gear: -2,
      IronIngot: -4,
      MagneticCoil: -2,
      MiningMachine: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["Electromagnetism"],
  }),

  OilExtractor: new StandardRecipe({
    key: "OilExtractor",
    name: "OilExtractor",
    productionTime: new Time(8, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -6,
      PlasmaExciter: -4,
      Steel: -12,
      StoneBrick: -12,
      OilExtractor: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["PlasmaExtractRefining"],
  }),

  OilRefinery: new StandardRecipe({
    key: "OilRefinery",
    name: "OilRefinery",
    productionTime: new Time(6, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -6,
      PlasmaExciter: -6,
      Steel: -10,
      StoneBrick: -10,
      OilRefinery: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["PlasmaExtractRefining"],
  }),

  OpticalGratingCrystal: new StandardRecipe({
    key: "OpticalGratingCrystal",
    name: "OpticalGratingCrystal",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      OpticalGratingCrystal: 1,
    },
    buildings: ["MiningMachine"],
    prerequisites: [],
  }),

  OrbitalCollector: new StandardRecipe({
    key: "OrbitalCollector",
    name: "OrbitalCollector",
    productionTime: new Time(30, TimeUnit.SECONDS),
    components: {
      FullAccumulator: -20,
      InterstellarLogisticsStation: -1,
      ReinforcedThruster: -20,
      SuperMagneticRing: -50,
      OrbitalCollector: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["GasGiantsExploitation"],
  }),

  OrganicCrystal: new StandardRecipe({
    key: "OrganicCrystal",
    name: "OrganicCrystal",
    productionTime: new Time(6, TimeUnit.SECONDS),
    components: {
      Plastic: -2,
      RefinedOil: -1,
      Water: -1,
      OrganicCrystal: 1,
    },
    buildings: ["ChemicalPlant"],
    prerequisites: ["PolymerChemicalEngineering"],
  }),

  OrganicCrystalChemicalPlant: new StandardRecipe({
    key: "OrganicCrystalChemicalPlant",
    name: "OrganicCrystal (ChemicalPlant)",
    productionTime: new Time(6, TimeUnit.SECONDS),
    components: {
      Log: -20,
      PlantFuel: -30,
      Water: -10,
      OrganicCrystal: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["PolymerChemicalEngineering"],
  }),

  OrganicCrystalPolymerChemicalEngineering: new StandardRecipe({
    key: "OrganicCrystalPolymerChemicalEngineering",
    name: "OrganicCrystal (Polymer Chemical Engineering)",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      OrganicCrystal: 1,
    },
    buildings: ["MiningMachine"],
    prerequisites: ["Electromagnetism"],
  }),

  ParticleBroadband: new StandardRecipe({
    key: "ParticleBroadband",
    name: "ParticleBroadband",
    productionTime: new Time(8, TimeUnit.SECONDS),
    components: {
      CarbonNanotube: -2,
      CrystalSilicon: -2,
      Plastic: -1,
      ParticleBroadband: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["ParticleControlTechnology"],
  }),

  ParticleContainer: new StandardRecipe({
    key: "ParticleContainer",
    name: "ParticleContainer",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      CopperIngot: -2,
      ElectromagneticTurbine: -2,
      Graphene: -2,
      ParticleContainer: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["MagneticParticleTrap"],
  }),

  ParticleContainerElectromagneticTurbine: new StandardRecipe({
    key: "ParticleContainerElectromagneticTurbine",
    name: "ParticleContainer (ElectromagneticTurbine)",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      CopperIngot: -2,
      UnipolarMagnet: -10,
      ParticleContainer: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["MagneticParticleTrap"],
  }),

  PhotonCombiner: new StandardRecipe({
    key: "PhotonCombiner",
    name: "PhotonCombiner",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -1,
      Prism: -2,
      PhotonCombiner: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["PhotonFrequencyConversion"],
  }),

  PhotonCombinerPrism: new StandardRecipe({
    key: "PhotonCombinerPrism",
    name: "PhotonCombiner (Prism)",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -1,
      OpticalGratingCrystal: -1,
      PhotonCombiner: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["PhotonFrequencyConversion"],
  }),

  PlaneFilter: new StandardRecipe({
    key: "PlaneFilter",
    name: "PlaneFilter",
    productionTime: new Time(12, TimeUnit.SECONDS),
    components: {
      CasimirCrystal: -1,
      TitaniumGlass: -2,
      PlaneFilter: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["WaveFunctionInterference"],
  }),

  PlanetaryLogisticsStation: new StandardRecipe({
    key: "PlanetaryLogisticsStation",
    name: "PlanetaryLogisticsStation",
    productionTime: new Time(20, TimeUnit.SECONDS),
    components: {
      ParticleContainer: -20,
      Processor: -40,
      Steel: -40,
      TitaniumIngot: -40,
      PlanetaryLogisticsStation: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["PlanetaryLogisticsSystem"],
  }),

  PlasmaExciter: new StandardRecipe({
    key: "PlasmaExciter",
    name: "PlasmaExciter",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      MagneticCoil: -4,
      Prism: -2,
      PlasmaExciter: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["HighEfficiencyPlasmaControl"],
  }),

  PlasmaExtractRefining: new StandardRecipe({
    key: "PlasmaExtractRefining",
    name: "Plasma Extract Refining",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      CrudeOil: -2,
      Hydrogen: 1,
      RefinedOil: 2,
    },
    buildings: ["OilRefinery"],
    prerequisites: ["PlasmaExtractRefining"],
  }),

  Plastic: new StandardRecipe({
    key: "Plastic",
    name: "Plastic",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      EnergeticGraphite: -1,
      RefinedOil: -2,
      Plastic: 1,
    },
    buildings: ["ChemicalPlant"],
    prerequisites: ["BasicChemicalEngineering"],
  }),

  Prism: new StandardRecipe({
    key: "Prism",
    name: "Prism",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      Glass: -3,
      Prism: 2,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["HighEfficiencyPlasmaControl"],
  }),

  Processor: new StandardRecipe({
    key: "Processor",
    name: "Processor",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -2,
      MicrocrystallineComponent: -2,
      Processor: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["Processor"],
  }),

  QuantumChip: new StandardRecipe({
    key: "QuantumChip",
    name: "QuantumChip",
    productionTime: new Time(6, TimeUnit.SECONDS),
    components: {
      PlaneFilter: -2,
      Processor: -2,
      QuantumChip: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["QuantumChip"],
  }),

  RayReceiver: new StandardRecipe({
    key: "RayReceiver",
    name: "RayReceiver",
    productionTime: new Time(8, TimeUnit.SECONDS),
    components: {
      HighPuritySilicon: -20,
      PhotonCombiner: -10,
      Processor: -5,
      Steel: -40,
      SuperMagneticRing: -20,
      RayReceiver: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["RayReceiver"],
  }),

  ReinforcedThruster: new StandardRecipe({
    key: "ReinforcedThruster",
    name: "ReinforcedThruster",
    productionTime: new Time(6, TimeUnit.SECONDS),
    components: {
      ElectromagneticTurbine: -5,
      TitaniumAlloy: -5,
      ReinforcedThruster: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["ReinforcedThruster"],
  }),

  SatelliteSubstation: new StandardRecipe({
    key: "SatelliteSubstation",
    name: "SatelliteSubstation",
    productionTime: new Time(5, TimeUnit.SECONDS),
    components: {
      FrameMaterial: -2,
      SuperMagneticRing: -10,
      WirelessPowerTower: -1,
      SatelliteSubstation: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["SatellitePowerDistributionSystem"],
  }),

  SiliconOre: new StandardRecipe({
    key: "SiliconOre",
    name: "SiliconOre",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      SiliconOre: 1,
    },
    buildings: ["MiningMachine"],
    prerequisites: [],
  }),

  SiliconOreMiningMachine: new StandardRecipe({
    key: "SiliconOreMiningMachine",
    name: "SiliconOre (MiningMachine)",
    productionTime: new Time(10, TimeUnit.SECONDS),
    components: {
      Stone: -10,
      SiliconOre: 1,
    },
    buildings: ["Smelter"],
    prerequisites: ["SmeltingPurification"],
  }),

  SmallCarrierRocket: new StandardRecipe({
    key: "SmallCarrierRocket",
    name: "SmallCarrierRocket",
    productionTime: new Time(6, TimeUnit.SECONDS),
    components: {
      DeuteronFuelRod: -2,
      DysonSphereComponent: -2,
      QuantumChip: -2,
      SmallCarrierRocket: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["VerticalLaunchingSilo"],
  }),

  Smelter: new StandardRecipe({
    key: "Smelter",
    name: "Smelter",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -4,
      IronIngot: -4,
      MagneticCoil: -2,
      StoneBrick: -2,
      Smelter: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["AutomaticMetallurgy"],
  }),

  SolarPanel: new StandardRecipe({
    key: "SolarPanel",
    name: "SolarPanel",
    productionTime: new Time(5, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -4,
      CopperIngot: -6,
      HighPuritySilicon: -6,
      SolarPanel: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["SolarCollection"],
  }),

  SolarSail: new StandardRecipe({
    key: "SolarSail",
    name: "SolarSail",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      Graphene: -1,
      PhotonCombiner: -1,
      SolarSail: 2,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["SolarSailOrbitSystem"],
  }),

  SorterMkI: new StandardRecipe({
    key: "SorterMkI",
    name: "SorterMkI",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -1,
      IronIngot: -1,
      SorterMkI: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["BasicLogisticsSystem"],
  }),

  SorterMkII: new StandardRecipe({
    key: "SorterMkII",
    name: "SorterMkII",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      ElectricMotor: -1,
      SorterMkI: -2,
      SorterMkII: 2,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["ImprovedLogisticsSystem"],
  }),

  SorterMkIII: new StandardRecipe({
    key: "SorterMkIII",
    name: "SorterMkIII",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      ElectromagneticTurbine: -1,
      SorterMkII: -2,
      SorterMkIII: 2,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["HighEfficiencyLogisticsSystem"],
  }),

  SpaceWarper: new StandardRecipe({
    key: "SpaceWarper",
    name: "SpaceWarper",
    productionTime: new Time(10, TimeUnit.SECONDS),
    components: {
      GravitonLens: -1,
      SpaceWarper: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["GravitationalWaveRefraction"],
  }),

  SpaceWarperGravitationalWaveRefraction: new StandardRecipe({
    key: "SpaceWarperGravitationalWaveRefraction",
    name: "SpaceWarper (Gravitational Wave Refraction)",
    productionTime: new Time(10, TimeUnit.SECONDS),
    components: {
      GravityMatrix: -1,
      SpaceWarper: 8,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["GravityMatrix"],
  }),

  SpiniformStalagmiteCrystal: new StandardRecipe({
    key: "SpiniformStalagmiteCrystal",
    name: "SpiniformStalagmiteCrystal",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      SpiniformStalagmiteCrystal: 1,
    },
    buildings: ["MiningMachine"],
    prerequisites: [],
  }),

  Splitter: new StandardRecipe({
    key: "Splitter",
    name: "Splitter",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -1,
      Gear: -2,
      IronIngot: -3,
      Splitter: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["ImprovedLogisticsSystem"],
  }),

  Steel: new StandardRecipe({
    key: "Steel",
    name: "Steel",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      IronIngot: -3,
      Steel: 1,
    },
    buildings: ["Smelter"],
    prerequisites: [],
  }),

  Stone: new StandardRecipe({
    key: "Stone",
    name: "Stone",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      Stone: 1,
    },
    buildings: ["MiningMachine"],
    prerequisites: [],
  }),

  StoneBrick: new StandardRecipe({
    key: "StoneBrick",
    name: "StoneBrick",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      Stone: -1,
      StoneBrick: 1,
    },
    buildings: ["Smelter"],
    prerequisites: [],
  }),

  StorageMkI: new StandardRecipe({
    key: "StorageMkI",
    name: "StorageMkI",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      IronIngot: -4,
      StoneBrick: -4,
      StorageMkI: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["BasicLogisticsSystem"],
  }),

  StorageMkII: new StandardRecipe({
    key: "StorageMkII",
    name: "StorageMkII",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      Steel: -8,
      StoneBrick: -8,
      StorageMkII: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["HighEfficiencyLogisticsSystem"],
  }),

  StorageTank: new StandardRecipe({
    key: "StorageTank",
    name: "StorageTank",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      Glass: -4,
      IronIngot: -8,
      StoneBrick: -4,
      StorageTank: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["FluidStorageEncapsulation"],
  }),

  StrangeMatter: new StandardRecipe({
    key: "StrangeMatter",
    name: "StrangeMatter",
    productionTime: new Time(8, TimeUnit.SECONDS),
    components: {
      Deuterium: -10,
      IronIngot: -2,
      ParticleContainer: -2,
      StrangeMatter: 1,
    },
    buildings: ["MiniatureParticleCollider"],
    prerequisites: ["StrangeMatter"],
  }),

  StructureMatrix: new StandardRecipe({
    key: "StructureMatrix",
    name: "StructureMatrix",
    productionTime: new Time(8, TimeUnit.SECONDS),
    components: {
      Diamond: -1,
      TitaniumCrystal: -1,
      StructureMatrix: 1,
    },
    buildings: ["MatrixLab"],
    prerequisites: ["StructureMatrix"],
  }),

  SulfuricAcid: new StandardRecipe({
    key: "SulfuricAcid",
    name: "SulfuricAcid",
    productionTime: new Time(1.2, TimeUnit.SECONDS),
    components: {
      SulfuricAcid: 1,
    },
    buildings: ["WaterPump"],
    prerequisites: ["FluidStorageEncapsulation"],
  }),

  SulfuricAcidFluidStorageEncapsulation: new StandardRecipe({
    key: "SulfuricAcidFluidStorageEncapsulation",
    name: "SulfuricAcid (Fluid Storage Encapsulation)",
    productionTime: new Time(6, TimeUnit.SECONDS),
    components: {
      RefinedOil: -6,
      Stone: -8,
      Water: -4,
      SulfuricAcid: 4,
    },
    buildings: ["ChemicalPlant"],
    prerequisites: ["BasicChemicalEngineering"],
  }),

  SuperMagneticRing: new StandardRecipe({
    key: "SuperMagneticRing",
    name: "SuperMagneticRing",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      ElectromagneticTurbine: -2,
      EnergeticGraphite: -1,
      Magnet: -3,
      SuperMagneticRing: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["SuperMagneticFieldGenerator"],
  }),

  TeslaTower: new StandardRecipe({
    key: "TeslaTower",
    name: "TeslaTower",
    productionTime: new Time(1, TimeUnit.SECONDS),
    components: {
      IronIngot: -2,
      MagneticCoil: -1,
      TeslaTower: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["Electromagnetism"],
  }),

  ThermalPowerStation: new StandardRecipe({
    key: "ThermalPowerStation",
    name: "ThermalPowerStation",
    productionTime: new Time(5, TimeUnit.SECONDS),
    components: {
      Gear: -4,
      IronIngot: -10,
      MagneticCoil: -4,
      StoneBrick: -4,
      ThermalPowerStation: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["ThermalPower"],
  }),

  Thruster: new StandardRecipe({
    key: "Thruster",
    name: "Thruster",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      CopperIngot: -3,
      Steel: -2,
      Thruster: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["Thruster"],
  }),

  TitaniumAlloy: new StandardRecipe({
    key: "TitaniumAlloy",
    name: "TitaniumAlloy",
    productionTime: new Time(12, TimeUnit.SECONDS),
    components: {
      Steel: -4,
      SulfuricAcid: -8,
      TitaniumIngot: -4,
      TitaniumAlloy: 4,
    },
    buildings: ["Smelter"],
    prerequisites: ["HighStrengthTitaniumAlloy"],
  }),

  TitaniumCrystal: new StandardRecipe({
    key: "TitaniumCrystal",
    name: "TitaniumCrystal",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      OrganicCrystal: -1,
      TitaniumIngot: -3,
      TitaniumCrystal: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["HighStrengthCrystal"],
  }),

  TitaniumGlass: new StandardRecipe({
    key: "TitaniumGlass",
    name: "TitaniumGlass",
    productionTime: new Time(5, TimeUnit.SECONDS),
    components: {
      Glass: -2,
      TitaniumIngot: -2,
      Water: -2,
      TitaniumGlass: 2,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["HighStrengthGlass"],
  }),

  TitaniumIngot: new StandardRecipe({
    key: "TitaniumIngot",
    name: "TitaniumIngot",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      TitaniumOre: -2,
      TitaniumIngot: 1,
    },
    buildings: ["Smelter"],
    prerequisites: ["TitaniumSmelting"],
  }),

  TitaniumOre: new StandardRecipe({
    key: "TitaniumOre",
    name: "TitaniumOre",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      TitaniumOre: 1,
    },
    buildings: ["MiningMachine"],
    prerequisites: [],
  }),

  UnipolarMagnet: new StandardRecipe({
    key: "UnipolarMagnet",
    name: "UnipolarMagnet",
    productionTime: new Time(2, TimeUnit.SECONDS),
    components: {
      UnipolarMagnet: 1,
    },
    buildings: ["MiningMachine"],
    prerequisites: [],
  }),

  UniverseMatrix: new StandardRecipe({
    key: "UniverseMatrix",
    name: "UniverseMatrix",
    productionTime: new Time(15, TimeUnit.SECONDS),
    components: {
      Antimatter: -1,
      ElectromagneticMatrix: -1,
      EnergyMatrix: -1,
      GravityMatrix: -1,
      InformationMatrix: -1,
      StructureMatrix: -1,
      UniverseMatrix: 1,
    },
    buildings: ["MatrixLab"],
    prerequisites: ["UniverseMatrix"],
  }),

  VerticalLaunchingSilo: new StandardRecipe({
    key: "VerticalLaunchingSilo",
    name: "VerticalLaunchingSilo",
    productionTime: new Time(30, TimeUnit.SECONDS),
    components: {
      FrameMaterial: -30,
      GravitonLens: -20,
      QuantumChip: -10,
      TitaniumAlloy: -80,
      VerticalLaunchingSilo: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["VerticalLaunchingSilo"],
  }),

  Water: new StandardRecipe({
    key: "Water",
    name: "Water",
    productionTime: new Time(1.2, TimeUnit.SECONDS),
    components: {
      Water: 1,
    },
    buildings: ["WaterPump"],
    prerequisites: ["FluidStorageEncapsulation"],
  }),

  WaterPump: new StandardRecipe({
    key: "WaterPump",
    name: "WaterPump",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      CircuitBoard: -2,
      ElectricMotor: -4,
      IronIngot: -8,
      StoneBrick: -4,
      WaterPump: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["FluidStorageEncapsulation"],
  }),

  WindTurbine: new StandardRecipe({
    key: "WindTurbine",
    name: "WindTurbine",
    productionTime: new Time(4, TimeUnit.SECONDS),
    components: {
      Gear: -1,
      IronIngot: -6,
      MagneticCoil: -3,
      WindTurbine: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: [],
  }),

  WirelessPowerTower: new StandardRecipe({
    key: "WirelessPowerTower",
    name: "WirelessPowerTower",
    productionTime: new Time(3, TimeUnit.SECONDS),
    components: {
      PlasmaExciter: -3,
      TeslaTower: -1,
      WirelessPowerTower: 1,
    },
    buildings: ["AssemblingMachineMkI", "AssemblingMachineMkII", "AssemblingMachineMkIII"],
    prerequisites: ["HighEfficiencyPlasmaControl"],
  }),

  XRayCracking: ({
    key: "XRayCracking",
    name: "X-Ray Cracking",
    buildings: new Set<BuildingKey>(["OilRefinery"]),
    inputs: new Set<ComponentKey>(["Hydrogen", "RefinedOil"]),
    outputs: new Set<ComponentKey>(["Hydrogen", "EnergeticGraphite"]),
    prerequisites: new Set<TechnologyKey>(["XRayCracking"]),
    productionTime: new Time(4, TimeUnit.SECONDS),
  } as (TimedRecipe & KeyedRecipe<"XRayCracking">)),
};

export default RECIPES;
