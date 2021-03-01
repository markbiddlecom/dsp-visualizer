import { Component, ComponentKey, ComponentTableOrder, TableRowOrder } from "./components";

interface KeyedComponent<KEY extends ComponentKey> extends Component {
  readonly key: KEY;
}

export enum ComponentKeyNames {
  Accumulator,
  AnnihilationConstraintSphere,
  Antimatter,
  AntimatterFuelRod,
  ArtificialStar,
  AssemblingMachineMkI,
  AssemblingMachineMkII,
  AssemblingMachineMkIII,
  CarbonNanotube,
  CasimirCrystal,
  ChemicalPlant,
  CircuitBoard,
  Coal,
  ConveyorBeltMkI,
  ConveyorBeltMkII,
  ConveyorBeltMkIII,
  CopperIngot,
  CopperOre,
  CriticalPhoton,
  CrudeOil,
  CrystalSilicon,
  Deuterium,
  DeuteronFuelRod,
  Diamond,
  DysonSphereComponent,
  ElectricMotor,
  ElectromagneticMatrix,
  ElectromagneticTurbine,
  EMRailEjector,
  EnergeticGraphite,
  EnergyExchanger,
  EnergyMatrix,
  FireIce,
  Foundation,
  FractalSilicon,
  Fractionator,
  FrameMaterial,
  FullAccumulator,
  Gear,
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
  Log,
  LogisticsDrone,
  LogisticsVessel,
  Magnet,
  MagneticCoil,
  MatrixLab,
  MicrocrystallineComponent,
  MiniatureParticleCollider,
  MiniFusionPowerStation,
  MiningMachine,
  OilExtractor,
  OilRefinery,
  OpticalGratingCrystal,
  OrbitalCollector,
  OrganicCrystal,
  ParticleBroadband,
  ParticleContainer,
  PhotonCombiner,
  PlaneFilter,
  PlanetaryLogisticsStation,
  PlantFuel,
  PlasmaExciter,
  Plastic,
  Prism,
  Processor,
  QuantumChip,
  RayReceiver,
  RefinedOil,
  ReinforcedThruster,
  SatelliteSubstation,
  SiliconOre,
  SmallCarrierRocket,
  Smelter,
  SolarPanel,
  SolarSail,
  SorterMkI,
  SorterMkII,
  SorterMkIII,
  SpaceWarper,
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
}

const COMPONENTS: Readonly<{ [C in ComponentKey]: Readonly<KeyedComponent<C>> }> = {
  Accumulator: {
    key: "Accumulator",
    name: "Accumulator",
    href: "https://dsp-wiki.com/Accumulator",
    iconHref: "https://dsp-wiki.com/images/7/71/Icon_Accumulator.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.PowerBuildings, 70],
    recipes: new Set([]),
  },

  AnnihilationConstraintSphere: {
    key: "AnnihilationConstraintSphere",
    name: "Annihilation Constraint Sphere",
    href: "https://dsp-wiki.com/Annihilation_Constraint_Sphere",
    iconHref: "https://dsp-wiki.com/images/3/37/Icon_Annihilation_Constraint_Sphere.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents2, 80],
    recipes: new Set([]),
  },

  Antimatter: {
    key: "Antimatter",
    name: "Antimatter",
    href: "https://dsp-wiki.com/Antimatter",
    iconHref: "https://dsp-wiki.com/images/7/78/Icon_Antimatter.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RawComponents, 110],
    recipes: new Set([]),
  },

  AntimatterFuelRod: {
    key: "AntimatterFuelRod",
    name: "Antimatter Fuel Rod",
    href: "https://dsp-wiki.com/Antimatter_Fuel_Rod",
    iconHref: "https://dsp-wiki.com/images/1/1c/Icon_Antimatter_Fuel_Rod.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RefinedComponents, 110],
    recipes: new Set([]),
  },

  ArtificialStar: {
    key: "ArtificialStar",
    name: "Artificial Star",
    href: "https://dsp-wiki.com/Artificial_Star",
    iconHref: "https://dsp-wiki.com/images/b/b6/Icon_Artificial_Star.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.PowerBuildings, 120],
    recipes: new Set([]),
  },

  AssemblingMachineMkI: {
    key: "AssemblingMachineMkI",
    name: "Assembling Machine Mk.I",
    href: "https://dsp-wiki.com/Assembling_Machine_Mk.I",
    iconHref: "https://dsp-wiki.com/images/8/8e/Icon_Assembling_Machine_Mk.I.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.FabricationComponents, 10],
    recipes: new Set([]),
  },

  AssemblingMachineMkII: {
    key: "AssemblingMachineMkII",
    name: "Assembling Machine Mk.II",
    href: "https://dsp-wiki.com/Assembling_Machine_Mk.II",
    iconHref: "https://dsp-wiki.com/images/9/93/Icon_Assembling_Machine_Mk.II.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.FabricationComponents, 20],
    recipes: new Set([]),
  },

  AssemblingMachineMkIII: {
    key: "AssemblingMachineMkIII",
    name: "Assembling Machine Mk.III",
    href: "https://dsp-wiki.com/Assembling_Machine_Mk.III",
    iconHref: "https://dsp-wiki.com/images/8/8c/Icon_Assembling_Machine_Mk.III.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.FabricationComponents, 30],
    recipes: new Set([]),
  },

  CarbonNanotube: {
    key: "CarbonNanotube",
    name: "Carbon Nanotube",
    href: "https://dsp-wiki.com/Carbon_Nanotube",
    iconHref: "https://dsp-wiki.com/images/7/7c/Icon_Carbon_Nanotube.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents1, 100],
    recipes: new Set([]),
  },

  CasimirCrystal: {
    key: "CasimirCrystal",
    name: "Casimir Crystal",
    href: "https://dsp-wiki.com/Casimir_Crystal",
    iconHref: "https://dsp-wiki.com/images/d/d7/Icon_Casimir_Crystal.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents1, 70],
    recipes: new Set([]),
  },

  ChemicalPlant: {
    key: "ChemicalPlant",
    name: "Chemical Plant",
    href: "https://dsp-wiki.com/Chemical_Plant",
    iconHref: "https://dsp-wiki.com/images/f/f9/Icon_Chemical_Plant.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.FabricationComponents, 70],
    recipes: new Set([]),
  },

  CircuitBoard: {
    key: "CircuitBoard",
    name: "Circuit Board",
    href: "https://dsp-wiki.com/Circuit_Board",
    iconHref: "https://dsp-wiki.com/images/2/2f/Icon_Circuit_Board.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents1, 20],
    recipes: new Set([]),
  },

  Coal: {
    key: "Coal",
    name: "Coal",
    href: "https://dsp-wiki.com/Coal",
    iconHref: "https://dsp-wiki.com/images/a/a2/Icon_Coal.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RawComponents, 40],
    recipes: new Set([]),
  },

  ConveyorBeltMkI: {
    key: "ConveyorBeltMkI",
    name: "Conveyor Belt Mk.I",
    href: "https://dsp-wiki.com/Conveyor_Belt_Mk.I",
    iconHref: "https://dsp-wiki.com/images/7/78/Icon_Conveyor_Belt_Mk.I.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.LogisticComponents, 10],
    recipes: new Set([]),
  },

  ConveyorBeltMkII: {
    key: "ConveyorBeltMkII",
    name: "Conveyor Belt Mk.II",
    href: "https://dsp-wiki.com/Conveyor_Belt_Mk.II",
    iconHref: "https://dsp-wiki.com/images/3/38/Icon_Conveyor_Belt_Mk.II.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.LogisticComponents, 20],
    recipes: new Set([]),
  },

  ConveyorBeltMkIII: {
    key: "ConveyorBeltMkIII",
    name: "Conveyor Belt Mk.III",
    href: "https://dsp-wiki.com/Conveyor_Belt_Mk.III",
    iconHref: "https://dsp-wiki.com/images/1/18/Icon_Conveyor_Belt_Mk.III.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.LogisticComponents, 30],
    recipes: new Set([]),
  },

  CopperIngot: {
    key: "CopperIngot",
    name: "Copper Ingot",
    href: "https://dsp-wiki.com/Copper_Ingot",
    iconHref: "https://dsp-wiki.com/images/e/ec/Icon_Copper_Ingot.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RefinedComponents, 20],
    recipes: new Set([]),
  },

  CopperOre: {
    key: "CopperOre",
    name: "Copper Ore",
    href: "https://dsp-wiki.com/Copper_Ore",
    iconHref: "https://dsp-wiki.com/images/9/90/Icon_Copper_Ore.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RawComponents, 20],
    recipes: new Set([]),
  },

  CriticalPhoton: {
    key: "CriticalPhoton",
    name: "Critical Photon",
    href: "https://dsp-wiki.com/Critical_Photon",
    iconHref: "https://dsp-wiki.com/images/9/92/Icon_Critical_Photon.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents1, 20],
    recipes: new Set([]),
  },

  CrudeOil: {
    key: "CrudeOil",
    name: "Crude Oil",
    href: "https://dsp-wiki.com/Crude_Oil",
    iconHref: "https://dsp-wiki.com/images/8/8f/Icon_Crude_Oil.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RawComponents, 80],
    recipes: new Set([]),
  },

  CrystalSilicon: {
    key: "CrystalSilicon",
    name: "Crystal Silicon",
    href: "https://dsp-wiki.com/Crystal_Silicon",
    iconHref: "https://dsp-wiki.com/images/2/2a/Icon_Crystal_Silicon.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.BasicComponents, 50],
    recipes: new Set([]),
  },

  Deuterium: {
    key: "Deuterium",
    name: "Deuterium",
    href: "https://dsp-wiki.com/Deuterium",
    iconHref: "https://dsp-wiki.com/images/4/4d/Icon_Deuterium.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RawComponents, 100],
    recipes: new Set([]),
  },

  DeuteronFuelRod: {
    key: "DeuteronFuelRod",
    name: "Deuteron Fuel Rod",
    href: "https://dsp-wiki.com/Deuteron_Fuel_Rod",
    iconHref: "https://dsp-wiki.com/images/5/58/Icon_Deuteron_Fuel_Rod.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RefinedComponents, 100],
    recipes: new Set([]),
  },

  Diamond: {
    key: "Diamond",
    name: "Diamond",
    href: "https://dsp-wiki.com/Diamond",
    iconHref: "https://dsp-wiki.com/images/a/af/Icon_Diamond.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.BasicComponents, 40],
    recipes: new Set([]),
  },

  DysonSphereComponent: {
    key: "DysonSphereComponent",
    name: "Dyson Sphere Component",
    href: "https://dsp-wiki.com/Dyson_Sphere_Component",
    iconHref: "https://dsp-wiki.com/images/c/ce/Icon_Dyson_Sphere_Component.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents2, 100],
    recipes: new Set([]),
  },

  ElectricMotor: {
    key: "ElectricMotor",
    name: "Electric Motor",
    href: "https://dsp-wiki.com/Electric_Motor",
    iconHref: "https://dsp-wiki.com/images/8/84/Icon_Electric_Motor.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents1, 40],
    recipes: new Set([]),
  },

  ElectromagneticMatrix: {
    key: "ElectromagneticMatrix",
    name: "Electromagnetic Matrix",
    href: "https://dsp-wiki.com/Electromagnetic_Matrix",
    iconHref: "https://dsp-wiki.com/images/0/0f/Icon_Electromagnetic_Matrix.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents2, 10],
    recipes: new Set([]),
  },

  ElectromagneticTurbine: {
    key: "ElectromagneticTurbine",
    name: "Electromagnetic Turbine",
    href: "https://dsp-wiki.com/Electromagnetic_Turbine",
    iconHref: "https://dsp-wiki.com/images/5/53/Icon_Electromagnetic_Turbine.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents2, 40],
    recipes: new Set([]),
  },

  EMRailEjector: {
    key: "EMRailEjector",
    name: "EM-Rail Ejector",
    href: "https://dsp-wiki.com/EM-Rail_Ejector",
    iconHref: "https://dsp-wiki.com/images/a/a2/Icon_EM-Rail_Ejector.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.LogisticComponents, 80],
    recipes: new Set([]),
  },

  EnergeticGraphite: {
    key: "EnergeticGraphite",
    name: "Energetic Graphite",
    href: "https://dsp-wiki.com/Energetic_Graphite",
    iconHref: "https://dsp-wiki.com/images/1/11/Icon_Energetic_Graphite.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RefinedComponents, 40],
    recipes: new Set([]),
  },

  EnergyExchanger: {
    key: "EnergyExchanger",
    name: "Energy Exchanger",
    href: "https://dsp-wiki.com/Energy_Exchanger",
    iconHref: "https://dsp-wiki.com/images/6/64/Icon_Energy_Exchanger.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.PowerBuildings, 110],
    recipes: new Set([]),
  },

  EnergyMatrix: {
    key: "EnergyMatrix",
    name: "Energy Matrix",
    href: "https://dsp-wiki.com/Energy_Matrix",
    iconHref: "https://dsp-wiki.com/images/8/83/Icon_Energy_Matrix.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents2, 20],
    recipes: new Set([]),
  },

  FireIce: {
    key: "FireIce",
    name: "Fire Ice",
    href: "https://dsp-wiki.com/Fire_Ice",
    iconHref: "https://dsp-wiki.com/images/a/ab/Icon_Fire_Ice.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.BasicComponents, 70],
    recipes: new Set([]),
  },

  Foundation: {
    key: "Foundation",
    name: "Foundation",
    href: "https://dsp-wiki.com/Foundation",
    iconHref: "https://dsp-wiki.com/images/6/60/Icon_Foundation.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents1, 10],
    recipes: new Set([]),
  },

  FractalSilicon: {
    key: "FractalSilicon",
    name: "Fractal Silicon",
    href: "https://dsp-wiki.com/Fractal_Silicon",
    iconHref: "https://dsp-wiki.com/images/3/35/Icon_Fractal_Silicon.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RefinedComponents, 120],
    recipes: new Set([]),
  },

  Fractionator: {
    key: "Fractionator",
    name: "Fractionator",
    href: "https://dsp-wiki.com/Fractionator",
    iconHref: "https://dsp-wiki.com/images/2/28/Icon_Fractionator.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.FabricationComponents, 60],
    recipes: new Set([]),
  },

  FrameMaterial: {
    key: "FrameMaterial",
    name: "Frame Material",
    href: "https://dsp-wiki.com/Frame_Material",
    iconHref: "https://dsp-wiki.com/images/9/9d/Icon_Frame_Material.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents2, 90],
    recipes: new Set([]),
  },

  FullAccumulator: {
    key: "FullAccumulator",
    name: "Full Accumulator",
    href: "https://dsp-wiki.com/Full_Accumulator",
    iconHref: "https://dsp-wiki.com/images/6/67/Icon_Full_Accumulator.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.PowerBuildings, 80],
    recipes: new Set([]),
  },

  Gear: {
    key: "Gear",
    name: "Gear",
    href: "https://dsp-wiki.com/Gear",
    iconHref: "https://dsp-wiki.com/images/8/87/Icon_Gear.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents2, 10],
    recipes: new Set([]),
  },

  Glass: {
    key: "Glass",
    name: "Glass",
    href: "https://dsp-wiki.com/Glass",
    iconHref: "https://dsp-wiki.com/images/7/76/Icon_Glass.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.BasicComponents, 30],
    recipes: new Set([]),
  },

  Graphene: {
    key: "Graphene",
    name: "Graphene",
    href: "https://dsp-wiki.com/Graphene",
    iconHref: "https://dsp-wiki.com/images/a/af/Icon_Graphene.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.BasicComponents, 100],
    recipes: new Set([]),
  },

  GravitonLens: {
    key: "GravitonLens",
    name: "Graviton Lens",
    href: "https://dsp-wiki.com/Graviton_Lens",
    iconHref: "https://dsp-wiki.com/images/d/df/Icon_Graviton_Lens.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents1, 50],
    recipes: new Set([]),
  },

  GravityMatrix: {
    key: "GravityMatrix",
    name: "Gravity Matrix",
    href: "https://dsp-wiki.com/Gravity_Matrix",
    iconHref: "https://dsp-wiki.com/images/4/47/Icon_Gravity_Matrix.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents2, 50],
    recipes: new Set([]),
  },

  HighPuritySilicon: {
    key: "HighPuritySilicon",
    name: "High-Purity Silicon",
    href: "https://dsp-wiki.com/High-Purity_Silicon",
    iconHref: "https://dsp-wiki.com/images/8/8a/Icon_High-Purity_Silicon.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RefinedComponents, 50],
    recipes: new Set([]),
  },

  Hydrogen: {
    key: "Hydrogen",
    name: "Hydrogen",
    href: "https://dsp-wiki.com/Hydrogen",
    iconHref: "https://dsp-wiki.com/images/4/42/Icon_Hydrogen.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RawComponents, 90],
    recipes: new Set([]),
  },

  HydrogenFuelRod: {
    key: "HydrogenFuelRod",
    name: "Hydrogen Fuel Rod",
    href: "https://dsp-wiki.com/Hydrogen_Fuel_Rod",
    iconHref: "https://dsp-wiki.com/images/2/2d/Icon_Hydrogen_Fuel_Rod.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RefinedComponents, 90],
    recipes: new Set([]),
  },

  InformationMatrix: {
    key: "InformationMatrix",
    name: "Information Matrix",
    href: "https://dsp-wiki.com/Information_Matrix",
    iconHref: "https://dsp-wiki.com/images/c/ca/Icon_Information_Matrix.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents2, 40],
    recipes: new Set([]),
  },

  InterstellarLogisticsStation: {
    key: "InterstellarLogisticsStation",
    name: "Interstellar Logistics Station",
    href: "https://dsp-wiki.com/Interstellar_Logistics_Station",
    iconHref: "https://dsp-wiki.com/images/6/6c/Icon_Interstellar_Logistics_Station.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.SourceComponents, 90],
    recipes: new Set([]),
  },

  IronIngot: {
    key: "IronIngot",
    name: "Iron Ingot",
    href: "https://dsp-wiki.com/Iron_Ingot",
    iconHref: "https://dsp-wiki.com/images/f/f1/Icon_Iron_Ingot.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RefinedComponents, 10],
    recipes: new Set([]),
  },

  IronOre: {
    key: "IronOre",
    name: "Iron Ore",
    href: "https://dsp-wiki.com/Iron_Ore",
    iconHref: "https://dsp-wiki.com/images/f/fc/Icon_Iron_Ore.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RawComponents, 10],
    recipes: new Set([]),
  },

  KimberliteOre: {
    key: "KimberliteOre",
    name: "Kimberlite Ore",
    href: "https://dsp-wiki.com/Kimberlite_Ore",
    iconHref: "https://dsp-wiki.com/images/5/55/Icon_Kimberlite_Ore.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RawComponents, 120],
    recipes: new Set([]),
  },

  Log: {
    key: "Log",
    name: "Log",
    href: "https://dsp-wiki.com/Log",
    iconHref: "https://dsp-wiki.com/images/4/4a/Icon_Log.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents1, 120],
    recipes: new Set([]),
  },

  LogisticsDrone: {
    key: "LogisticsDrone",
    name: "Logistics Drone",
    href: "https://dsp-wiki.com/Logistics_Drone",
    iconHref: "https://dsp-wiki.com/images/a/a2/Icon_Logistics_Drone.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents2, 110],
    recipes: new Set([]),
  },

  LogisticsVessel: {
    key: "LogisticsVessel",
    name: "Logistics Vessel",
    href: "https://dsp-wiki.com/Logistics_Vessel",
    iconHref: "https://dsp-wiki.com/images/7/7e/Icon_Logistics_Vessel.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents1, 110],
    recipes: new Set([]),
  },

  Magnet: {
    key: "Magnet",
    name: "Magnet",
    href: "https://dsp-wiki.com/Magnet",
    iconHref: "https://dsp-wiki.com/images/c/c6/Icon_Magnet.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.BasicComponents, 10],
    recipes: new Set([]),
  },

  MagneticCoil: {
    key: "MagneticCoil",
    name: "Magnetic Coil",
    href: "https://dsp-wiki.com/Magnetic_Coil",
    iconHref: "https://dsp-wiki.com/images/e/e5/Icon_Magnetic_Coil.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.BasicComponents, 20],
    recipes: new Set([]),
  },

  MatrixLab: {
    key: "MatrixLab",
    name: "Matrix Lab",
    href: "https://dsp-wiki.com/Matrix_Lab",
    iconHref: "https://dsp-wiki.com/images/b/b7/Icon_Matrix_Lab.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.FabricationComponents, 80],
    recipes: new Set([]),
  },

  MicrocrystallineComponent: {
    key: "MicrocrystallineComponent",
    name: "Microcrystalline Component",
    href: "https://dsp-wiki.com/Microcrystalline_Component",
    iconHref: "https://dsp-wiki.com/images/f/f5/Icon_Microcrystalline_Component.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents1, 50],
    recipes: new Set([]),
  },

  MiniatureParticleCollider: {
    key: "MiniatureParticleCollider",
    name: "Miniature Particle Collider",
    href: "https://dsp-wiki.com/Miniature_Particle_Collider",
    iconHref: "https://dsp-wiki.com/images/a/aa/Icon_Miniature_Particle_Collider.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.LogisticComponents, 100],
    recipes: new Set([]),
  },

  MiniFusionPowerStation: {
    key: "MiniFusionPowerStation",
    name: "Mini Fusion Power Station",
    href: "https://dsp-wiki.com/Mini_Fusion_Power_Station",
    iconHref: "https://dsp-wiki.com/images/5/54/Icon_Mini_Fusion_Power_Station.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.PowerBuildings, 100],
    recipes: new Set([]),
  },

  MiningMachine: {
    key: "MiningMachine",
    name: "Mining Machine",
    href: "https://dsp-wiki.com/Mining_Machine",
    iconHref: "https://dsp-wiki.com/images/c/cf/Icon_Mining_Machine.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.SourceComponents, 40],
    recipes: new Set([]),
  },

  OilExtractor: {
    key: "OilExtractor",
    name: "Oil Extractor",
    href: "https://dsp-wiki.com/Oil_Extractor",
    iconHref: "https://dsp-wiki.com/images/8/8f/Icon_Oil_Extractor.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.SourceComponents, 60],
    recipes: new Set([]),
  },

  OilRefinery: {
    key: "OilRefinery",
    name: "Oil Refinery",
    href: "https://dsp-wiki.com/Oil_Refinery",
    iconHref: "https://dsp-wiki.com/images/7/74/Icon_Oil_Refinery.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.SourceComponents, 70],
    recipes: new Set([]),
  },

  OpticalGratingCrystal: {
    key: "OpticalGratingCrystal",
    name: "Optical Grating Crystal",
    href: "https://dsp-wiki.com/Optical_Grating_Crystal",
    iconHref: "https://dsp-wiki.com/images/a/ac/Icon_Optical_Grating_Crystal.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.BasicComponents, 120],
    recipes: new Set([]),
  },

  OrbitalCollector: {
    key: "OrbitalCollector",
    name: "Orbital Collector",
    href: "https://dsp-wiki.com/Orbital_Collector",
    iconHref: "https://dsp-wiki.com/images/6/64/Icon_Orbital_Collector.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.FabricationComponents, 90],
    recipes: new Set([]),
  },

  OrganicCrystal: {
    key: "OrganicCrystal",
    name: "Organic Crystal",
    href: "https://dsp-wiki.com/Organic_Crystal",
    iconHref: "https://dsp-wiki.com/images/9/96/Icon_Organic_Crystal.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.BasicComponents, 90],
    recipes: new Set([]),
  },

  ParticleBroadband: {
    key: "ParticleBroadband",
    name: "Particle Broadband",
    href: "https://dsp-wiki.com/Particle_Broadband",
    iconHref: "https://dsp-wiki.com/images/b/b6/Icon_Particle_Broadband.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents2, 100],
    recipes: new Set([]),
  },

  ParticleContainer: {
    key: "ParticleContainer",
    name: "Particle Container",
    href: "https://dsp-wiki.com/Particle_Container",
    iconHref: "https://dsp-wiki.com/images/f/fd/Icon_Particle_Container.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents1, 30],
    recipes: new Set([]),
  },

  PhotonCombiner: {
    key: "PhotonCombiner",
    name: "Photon Combiner",
    href: "https://dsp-wiki.com/Photon_Combiner",
    iconHref: "https://dsp-wiki.com/images/9/93/Icon_Photon_Combiner.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents2, 30],
    recipes: new Set([]),
  },

  PlaneFilter: {
    key: "PlaneFilter",
    name: "Plane Filter",
    href: "https://dsp-wiki.com/Plane_Filter",
    iconHref: "https://dsp-wiki.com/images/1/15/Icon_Plane_Filter.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents1, 90],
    recipes: new Set([]),
  },

  PlanetaryLogisticsStation: {
    key: "PlanetaryLogisticsStation",
    name: "Planetary Logistics Station",
    href: "https://dsp-wiki.com/Planetary_Logistics_Station",
    iconHref: "https://dsp-wiki.com/images/e/e5/Icon_Planetary_Logistics_Station.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.LogisticComponents, 90],
    recipes: new Set([]),
  },

  PlantFuel: {
    key: "PlantFuel",
    name: "Plant Fuel",
    href: "https://dsp-wiki.com/Plant_Fuel",
    iconHref: "https://dsp-wiki.com/images/6/6a/Icon_Plant_Fuel.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents2, 120],
    recipes: new Set([]),
  },

  PlasmaExciter: {
    key: "PlasmaExciter",
    name: "Plasma Exciter",
    href: "https://dsp-wiki.com/Plasma_Exciter",
    iconHref: "https://dsp-wiki.com/images/c/cc/Icon_Plasma_Exciter.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents2, 20],
    recipes: new Set([]),
  },

  Plastic: {
    key: "Plastic",
    name: "Plastic",
    href: "https://dsp-wiki.com/Plastic",
    iconHref: "https://dsp-wiki.com/images/c/c8/Icon_Plastic.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.BasicComponents, 80],
    recipes: new Set([]),
  },

  Prism: {
    key: "Prism",
    name: "Prism",
    href: "https://dsp-wiki.com/Prism",
    iconHref: "https://dsp-wiki.com/images/d/d3/Icon_Prism.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents1, 30],
    recipes: new Set([]),
  },

  Processor: {
    key: "Processor",
    name: "Processor",
    href: "https://dsp-wiki.com/Processor",
    iconHref: "https://dsp-wiki.com/images/f/f1/Icon_Processor.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents2, 50],
    recipes: new Set([]),
  },

  QuantumChip: {
    key: "QuantumChip",
    name: "Quantum Chip",
    href: "https://dsp-wiki.com/Quantum_Chip",
    iconHref: "https://dsp-wiki.com/images/2/2f/Icon_Quantum_Chip.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents1, 100],
    recipes: new Set([]),
  },

  RayReceiver: {
    key: "RayReceiver",
    name: "Ray Receiver",
    href: "https://dsp-wiki.com/Ray_Receiver",
    iconHref: "https://dsp-wiki.com/images/7/7b/Icon_Ray_Receiver.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.PowerBuildings, 90],
    recipes: new Set([]),
  },

  RefinedOil: {
    key: "RefinedOil",
    name: "Refined Oil",
    href: "https://dsp-wiki.com/Refined_Oil",
    iconHref: "https://dsp-wiki.com/images/f/f9/Icon_Refined_Oil.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RefinedComponents, 80],
    recipes: new Set([]),
  },

  ReinforcedThruster: {
    key: "ReinforcedThruster",
    name: "Reinforced Thruster",
    href: "https://dsp-wiki.com/Reinforced_Thruster",
    iconHref: "https://dsp-wiki.com/images/3/3d/Icon_Reinforced_Thruster.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents1, 110],
    recipes: new Set([]),
  },

  SatelliteSubstation: {
    key: "SatelliteSubstation",
    name: "Satellite Substation",
    href: "https://dsp-wiki.com/Satellite_Substation",
    iconHref: "https://dsp-wiki.com/images/d/d7/Icon_Satellite_Substation.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.PowerBuildings, 30],
    recipes: new Set([]),
  },

  SiliconOre: {
    key: "SiliconOre",
    name: "Silicon Ore",
    href: "https://dsp-wiki.com/Silicon_Ore",
    iconHref: "https://dsp-wiki.com/images/d/d4/Icon_Silicon_Ore.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RawComponents, 50],
    recipes: new Set([]),
  },

  SmallCarrierRocket: {
    key: "SmallCarrierRocket",
    name: "Small Carrier Rocket",
    href: "https://dsp-wiki.com/Small_Carrier_Rocket",
    iconHref: "https://dsp-wiki.com/images/1/1c/Icon_Small_Carrier_Rocket.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents2, 110],
    recipes: new Set([]),
  },

  Smelter: {
    key: "Smelter",
    name: "Smelter",
    href: "https://dsp-wiki.com/Smelter",
    iconHref: "https://dsp-wiki.com/images/e/e6/Icon_Smelter.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.FabricationComponents, 40],
    recipes: new Set([]),
  },

  SolarPanel: {
    key: "SolarPanel",
    name: "Solar Panel",
    href: "https://dsp-wiki.com/Solar_Panel",
    iconHref: "https://dsp-wiki.com/images/7/77/Icon_Solar_Panel.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.PowerBuildings, 60],
    recipes: new Set([]),
  },

  SolarSail: {
    key: "SolarSail",
    name: "Solar Sail",
    href: "https://dsp-wiki.com/Solar_Sail",
    iconHref: "https://dsp-wiki.com/images/5/50/Icon_Solar_Sail.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents2, 80],
    recipes: new Set([]),
  },

  SorterMkI: {
    key: "SorterMkI",
    name: "Sorter Mk.I",
    href: "https://dsp-wiki.com/Sorter_Mk.I",
    iconHref: "https://dsp-wiki.com/images/4/4f/Icon_Sorter_Mk.I.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.SourceComponents, 10],
    recipes: new Set([]),
  },

  SorterMkII: {
    key: "SorterMkII",
    name: "Sorter Mk.II",
    href: "https://dsp-wiki.com/Sorter_Mk.II",
    iconHref: "https://dsp-wiki.com/images/2/25/Icon_Sorter_Mk.II.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.SourceComponents, 20],
    recipes: new Set([]),
  },

  SorterMkIII: {
    key: "SorterMkIII",
    name: "Sorter Mk.III",
    href: "https://dsp-wiki.com/Sorter_Mk.III",
    iconHref: "https://dsp-wiki.com/images/b/b5/Icon_Sorter_Mk.III.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.SourceComponents, 30],
    recipes: new Set([]),
  },

  SpaceWarper: {
    key: "SpaceWarper",
    name: "Space Warper",
    href: "https://dsp-wiki.com/Space_Warper",
    iconHref: "https://dsp-wiki.com/images/c/cb/Icon_Space_Warper.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents1, 80],
    recipes: new Set([]),
  },

  SpiniformStalagmiteCrystal: {
    key: "SpiniformStalagmiteCrystal",
    name: "Spiniform Stalagmite Crystal",
    href: "https://dsp-wiki.com/Spiniform_Stalagmite_Crystal",
    iconHref: "https://dsp-wiki.com/images/b/bd/Icon_Spiniform_Stalagmite_Crystal.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents1, 120],
    recipes: new Set([]),
  },

  Splitter: {
    key: "Splitter",
    name: "Splitter",
    href: "https://dsp-wiki.com/Splitter",
    iconHref: "https://dsp-wiki.com/images/d/d6/Icon_Splitter.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.LogisticComponents, 40],
    recipes: new Set([]),
  },

  Steel: {
    key: "Steel",
    name: "Steel",
    href: "https://dsp-wiki.com/Steel",
    iconHref: "https://dsp-wiki.com/images/3/38/Icon_Steel.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents1, 10],
    recipes: new Set([]),
  },

  Stone: {
    key: "Stone",
    name: "Stone",
    href: "https://dsp-wiki.com/Stone",
    iconHref: "https://dsp-wiki.com/images/5/5a/Icon_Stone.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RawComponents, 30],
    recipes: new Set([]),
  },

  StoneBrick: {
    key: "StoneBrick",
    name: "Stone Brick",
    href: "https://dsp-wiki.com/Stone_Brick",
    iconHref: "https://dsp-wiki.com/images/6/61/Icon_Stone_Brick.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RefinedComponents, 30],
    recipes: new Set([]),
  },

  StorageMkI: {
    key: "StorageMkI",
    name: "Storage Mk.I",
    href: "https://dsp-wiki.com/Storage_Mk.I",
    iconHref: "https://dsp-wiki.com/images/6/68/Icon_Storage_Mk.I.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.LogisticComponents, 50],
    recipes: new Set([]),
  },

  StorageMkII: {
    key: "StorageMkII",
    name: "Storage Mk.II",
    href: "https://dsp-wiki.com/Storage_Mk.II",
    iconHref: "https://dsp-wiki.com/images/e/e2/Icon_Storage_Mk.II.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.LogisticComponents, 60],
    recipes: new Set([]),
  },

  StorageTank: {
    key: "StorageTank",
    name: "Storage Tank",
    href: "https://dsp-wiki.com/Storage_Tank",
    iconHref: "https://dsp-wiki.com/images/0/00/Icon_Storage_Tank.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.LogisticComponents, 70],
    recipes: new Set([]),
  },

  StrangeMatter: {
    key: "StrangeMatter",
    name: "Strange Matter",
    href: "https://dsp-wiki.com/Strange_Matter",
    iconHref: "https://dsp-wiki.com/images/8/8f/Icon_Strange_Matter.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents1, 80],
    recipes: new Set([]),
  },

  StructureMatrix: {
    key: "StructureMatrix",
    name: "Structure Matrix",
    href: "https://dsp-wiki.com/Structure_Matrix",
    iconHref: "https://dsp-wiki.com/images/4/44/Icon_Structure_Matrix.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents2, 30],
    recipes: new Set([]),
  },

  SulfuricAcid: {
    key: "SulfuricAcid",
    name: "Sulfuric Acid",
    href: "https://dsp-wiki.com/Sulfuric_Acid",
    iconHref: "https://dsp-wiki.com/images/5/53/Icon_Sulfuric_Acid.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RefinedComponents, 70],
    recipes: new Set([]),
  },

  SuperMagneticRing: {
    key: "SuperMagneticRing",
    name: "Super-Magnetic Ring",
    href: "https://dsp-wiki.com/Super-Magnetic_Ring",
    iconHref: "https://dsp-wiki.com/images/b/b4/Icon_Super-Magnetic_Ring.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents1, 40],
    recipes: new Set([]),
  },

  TeslaTower: {
    key: "TeslaTower",
    name: "Tesla Tower",
    href: "https://dsp-wiki.com/Tesla_Tower",
    iconHref: "https://dsp-wiki.com/images/f/f1/Icon_Tesla_Tower.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.PowerBuildings, 10],
    recipes: new Set([]),
  },

  ThermalPowerStation: {
    key: "ThermalPowerStation",
    name: "Thermal Power Station",
    href: "https://dsp-wiki.com/Thermal_Power_Station",
    iconHref: "https://dsp-wiki.com/images/0/05/Icon_Thermal_Power_Station.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.PowerBuildings, 50],
    recipes: new Set([]),
  },

  Thruster: {
    key: "Thruster",
    name: "Thruster",
    href: "https://dsp-wiki.com/Thruster",
    iconHref: "https://dsp-wiki.com/images/e/ea/Icon_Thruster.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.BasicComponents, 110],
    recipes: new Set([]),
  },

  TitaniumAlloy: {
    key: "TitaniumAlloy",
    name: "Titanium Alloy",
    href: "https://dsp-wiki.com/Titanium_Alloy",
    iconHref: "https://dsp-wiki.com/images/8/85/Icon_Titanium_Alloy.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.BasicComponents, 60],
    recipes: new Set([]),
  },

  TitaniumCrystal: {
    key: "TitaniumCrystal",
    name: "Titanium Crystal",
    href: "https://dsp-wiki.com/Titanium_Crystal",
    iconHref: "https://dsp-wiki.com/images/5/5b/Icon_Titanium_Crystal.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents1, 90],
    recipes: new Set([]),
  },

  TitaniumGlass: {
    key: "TitaniumGlass",
    name: "Titanium Glass",
    href: "https://dsp-wiki.com/Titanium_Glass",
    iconHref: "https://dsp-wiki.com/images/5/56/Icon_Titanium_Glass.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents2, 90],
    recipes: new Set([]),
  },

  TitaniumIngot: {
    key: "TitaniumIngot",
    name: "Titanium Ingot",
    href: "https://dsp-wiki.com/Titanium_Ingot",
    iconHref: "https://dsp-wiki.com/images/f/f1/Icon_Titanium_Ingot.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RefinedComponents, 60],
    recipes: new Set([]),
  },

  TitaniumOre: {
    key: "TitaniumOre",
    name: "Titanium Ore",
    href: "https://dsp-wiki.com/Titanium_Ore",
    iconHref: "https://dsp-wiki.com/images/9/91/Icon_Titanium_Ore.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RawComponents, 60],
    recipes: new Set([]),
  },

  UnipolarMagnet: {
    key: "UnipolarMagnet",
    name: "Unipolar Magnet",
    href: "https://dsp-wiki.com/Unipolar_Magnet",
    iconHref: "https://dsp-wiki.com/images/a/a9/Icon_Unipolar_Magnet.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.IntermediateComponents2, 120],
    recipes: new Set([]),
  },

  UniverseMatrix: {
    key: "UniverseMatrix",
    name: "Universe Matrix",
    href: "https://dsp-wiki.com/Universe_Matrix",
    iconHref: "https://dsp-wiki.com/images/f/fc/Icon_Universe_Matrix.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.AdvancedComponents2, 60],
    recipes: new Set([]),
  },

  VerticalLaunchingSilo: {
    key: "VerticalLaunchingSilo",
    name: "Vertical Launching Silo",
    href: "https://dsp-wiki.com/Vertical_Launching_Silo",
    iconHref: "https://dsp-wiki.com/images/0/05/Icon_Vertical_Launching_Silo.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.SourceComponents, 80],
    recipes: new Set([]),
  },

  Water: {
    key: "Water",
    name: "Water",
    href: "https://dsp-wiki.com/Water",
    iconHref: "https://dsp-wiki.com/images/6/65/Icon_Water.png",
    coordinates: [ComponentTableOrder.Components, TableRowOrder.RawComponents, 70],
    recipes: new Set([]),
  },

  WaterPump: {
    key: "WaterPump",
    name: "Water Pump",
    href: "https://dsp-wiki.com/Water_Pump",
    iconHref: "https://dsp-wiki.com/images/6/69/Icon_Water_Pump.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.SourceComponents, 50],
    recipes: new Set([]),
  },

  WindTurbine: {
    key: "WindTurbine",
    name: "Wind Turbine",
    href: "https://dsp-wiki.com/Wind_Turbine",
    iconHref: "https://dsp-wiki.com/images/1/14/Icon_Wind_Turbine.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.PowerBuildings, 40],
    recipes: new Set([]),
  },

  WirelessPowerTower: {
    key: "WirelessPowerTower",
    name: "Wireless Power Tower",
    href: "https://dsp-wiki.com/Wireless_Power_Tower",
    iconHref: "https://dsp-wiki.com/images/c/c7/Icon_Wireless_Power_Tower.png",
    coordinates: [ComponentTableOrder.Buildings, TableRowOrder.PowerBuildings, 20],
    recipes: new Set([]),
  },
};

export default COMPONENTS;
