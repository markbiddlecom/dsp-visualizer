import { Dimension, ScalarBase, Unit } from "./units";

export type PowerUnit = Unit<Dimension.Power, Power>;

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PowerUnit {
  export const WATTS: PowerUnit = {
    name: "watts",
    symbol: "W",
    dimension: Dimension.POWER,
    toStandardAmount(watts: number) { return watts; },
    fromStandardAmount(watts: number) { return watts; },
    of(amount: number) { return new Power(amount, WATTS); },
  };
}

export class Power extends ScalarBase<Dimension.Power, Power> {
  constructor(copyFrom: Power);
  constructor(amount: number, unit: PowerUnit);

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(firstArg: Power | number, unit?: PowerUnit) {
    super(firstArg, unit);
  }

  protected construct(amount: number, unit: PowerUnit): Power {
    return new Power(amount, unit);
  }

  protected self(): Power {
    return this;
  }
}
