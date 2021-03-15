import { TimeUnit } from "./time";
import { Dimension, ScalarBase, Unit } from "./units";

export interface ItemRateUnit extends Unit<Dimension.ItemRate, ItemRate> {
  readonly timeUnit: TimeUnit;
}

function createItemRateUnit(timeUnit: TimeUnit): ItemRateUnit {
  const UNIT: ItemRateUnit = {
    name: `items/${timeUnit.name}`,
    symbol: `ip${timeUnit.symbol}`,
    timeUnit,
    dimension: Dimension.ITEM_RATE,
    fromStandardAmount(standardAmount: number) { return timeUnit.fromStandardAmount(standardAmount); },
    toStandardAmount(amount: number) { return timeUnit.toStandardAmount(amount); },
    of(amount: number) { return new ItemRate(amount, UNIT); },
  };
  return UNIT;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ItemRateUnit {
  export const ITEMS_PER_SECOND = createItemRateUnit(TimeUnit.SECONDS);
  export const ITEMS_PER_MINUTE = createItemRateUnit(TimeUnit.MINUTES);
  export const ITEMS_PER_HOUR = createItemRateUnit(TimeUnit.HOURS);
}

export class ItemRate extends ScalarBase<Dimension.ItemRate, ItemRate> {
  constructor(copyFrom: ItemRate);
  constructor(amount: number, unit: ItemRateUnit);

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(firstArg: ItemRate | number, unit?: ItemRateUnit) {
    super(firstArg, unit);
  }

  protected construct(amount: number, unit: ItemRateUnit): ItemRate {
    return new ItemRate(amount, unit);
  }

  protected self(): ItemRate {
    return this;
  }
}
