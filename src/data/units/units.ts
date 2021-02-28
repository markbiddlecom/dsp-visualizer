import { ItemRateUnit, ItemRate as ItemRateScalar } from './itemRate';
import { TimeUnit, Time as TimeScalar } from './time';
import { PowerUnit, Power as PowerScalar } from './power';
import { createPrefix } from 'typescript';

export interface Dimension<
  DIMENSION extends Dimension<DIMENSION, SCALAR>,
  SCALAR extends Scalar<DIMENSION, SCALAR>
> {
  readonly standardUnit: Unit<DIMENSION, SCALAR>;
}

export module Dimension {
  export class Time implements Dimension<Time, TimeScalar> {
    get standardUnit() { return TimeUnit.SECONDS; }
  }
  export const TIME = new Time();

  export class Power implements Dimension<Power, PowerScalar> {
    get standardUnit() { return PowerUnit.WATTS; }
  }
  export const POWER = new Power();

  export class ItemRate implements Dimension<ItemRate, ItemRateScalar> {
    get standardUnit() { return ItemRateUnit.ITEMS_PER_SECOND; }
  }
  export const ITEM_RATE = new ItemRate();
}

export interface Unit<
  DIMENSION extends Dimension<DIMENSION, SCALAR>,
  SCALAR extends Scalar<DIMENSION, SCALAR>
> {
  readonly name: string;
  readonly symbol: string;
  readonly dimension: DIMENSION;
  toStandardAmount(amount: number): number;
  fromStandardAmount(standardAmount: number): number;
  of(amount: number): SCALAR;
}

export interface Scalar<
  DIMENSION extends Dimension<DIMENSION, T>,
  T extends Scalar<DIMENSION, T>
> {
  readonly amount: number;
  readonly unit: Unit<DIMENSION, T>;
  scale(facor: number): T;
  as(newUnit: Unit<DIMENSION, T>): T;
  valueAs(newUnit: Unit<DIMENSION, T>): number;
  negate(): T;
  abs(): T;
  add(scalar: T): T;
  subtract(scalar: T): T;
}

export abstract class ScalarBase<
  DIMENSION extends Dimension<DIMENSION, T>,
  T extends ScalarBase<DIMENSION, T>
> implements Scalar<DIMENSION, T> {
  readonly amount: number;
  readonly unit: Unit<DIMENSION, T>;

  protected constructor(firstArg: T | number, unit?: Unit<DIMENSION, T>) {
    if (firstArg instanceof ScalarBase) {
      this.amount = firstArg.amount;
      this.unit = firstArg.unit;
    } else if (unit === null || unit === undefined) {
      throw new Error();
    } else {
      this.amount = firstArg;
      this.unit = unit;
    }
  }

  protected abstract construct(value: number, unit: Unit<DIMENSION, T>): T;
  protected abstract self(): T;

  scale(factor: number): T {
    return this.construct(this.amount * factor, this.unit);
  }

  as(newUnit: Unit<DIMENSION, T>): T {
    return this.construct(this.valueAs(newUnit), newUnit);
  }

  valueAs(newUnit: Unit<DIMENSION, T>): number {
    return newUnit.fromStandardAmount(this.unit.toStandardAmount(this.amount));
  }

  negate(): T {
    return this.scale(-1);
  }

  abs(): T {
    return this.amount >= 0 ? this.self() : this.negate();
  }

  add(scalar: T): T {
    return this.construct(this.amount + scalar.valueAs(this.unit), this.unit);
  }

  subtract(scalar: T): T {
    return this.construct(this.amount - scalar.valueAs(this.unit), this.unit);
  }
}

function makePrefixFactory(
  prefixName: string,
  prefixSymbol: string,
  factor: number
) {
  return {
    createPrefixUnit<
      DIMENSION extends Dimension<DIMENSION, SCALAR>,
      SCALAR extends Scalar<DIMENSION, SCALAR>,
      UNIT extends Unit<DIMENSION, SCALAR>,
    >(baseUnit: UNIT): UNIT {
      const PREFIXED_UNIT: UNIT = {
        name: `${prefixName}${baseUnit.name}`,
        symbol: `${prefixSymbol}${baseUnit.symbol}`,
        dimension: baseUnit.dimension,
        toStandardAmount(amount: number) { return baseUnit.toStandardAmount(amount * factor); },
        fromStandardAmount(standardAmount: number) { return baseUnit.fromStandardAmount(standardAmount / factor); },
        of(amount: number): SCALAR { return baseUnit.of(PREFIXED_UNIT.fromStandardAmount(amount)).as(PREFIXED_UNIT); },
      } as UNIT;
      return PREFIXED_UNIT;
    },
  };
}

const KILO_FACTORY = makePrefixFactory("kilo", "k", 1e3);
const MEGA_FACTORY = makePrefixFactory("mega", "M", 1e6);
const GIGA_FACTORY = makePrefixFactory("giga", "G", 1e9);

export const SI = Object.freeze({
  KILO<
    DIMENSION extends Dimension<DIMENSION, SCALAR>,
    SCALAR extends Scalar<DIMENSION, SCALAR>,
    UNIT extends Unit<DIMENSION, SCALAR>,
  >(baseUnit: UNIT): UNIT { return KILO_FACTORY.createPrefixUnit(baseUnit); },
  MEGA<
    DIMENSION extends Dimension<DIMENSION, SCALAR>,
    SCALAR extends Scalar<DIMENSION, SCALAR>,
    UNIT extends Unit<DIMENSION, SCALAR>,
  >(baseUnit: UNIT): UNIT { return MEGA_FACTORY.createPrefixUnit(baseUnit); },
  GIGA<
    DIMENSION extends Dimension<DIMENSION, SCALAR>,
    SCALAR extends Scalar<DIMENSION, SCALAR>,
    UNIT extends Unit<DIMENSION, SCALAR>,
  >(baseUnit: UNIT): UNIT { return GIGA_FACTORY.createPrefixUnit(baseUnit); },
});
