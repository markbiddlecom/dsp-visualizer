import { Dimension, ScalarBase, Unit } from "./units";

export type TimeUnit = Unit<Dimension.Time, Time>

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TimeUnit {
  export const SECONDS: TimeUnit = {
    name: "seconds",
    symbol: "s",
    dimension: Dimension.TIME,
    toStandardAmount(seconds: number) { return seconds; },
    fromStandardAmount(seconds: number) { return seconds; },
    of(amount: number) { return new Time(amount, SECONDS); },
  };

  export const SECONDS_PER_MINUTE = 60;
  export const MINUTES: TimeUnit = {
    name: "minutes",
    symbol: "m",
    dimension: Dimension.TIME,
    toStandardAmount(minutes: number) { return minutes * SECONDS_PER_MINUTE; },
    fromStandardAmount(seconds: number) { return seconds / SECONDS_PER_MINUTE; },
    of(amount: number) { return new Time(amount, MINUTES); },
  };

  export const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;
  export const HOURS: TimeUnit = {
    name: "hours",
    symbol: "hr",
    dimension: Dimension.TIME,
    toStandardAmount(hours: number) { return hours * SECONDS_PER_HOUR; },
    fromStandardAmount(seconds: number) { return seconds / SECONDS_PER_HOUR; },
    of(amount: number) { return new Time(amount, HOURS); },
  };
}

export class Time extends ScalarBase<Dimension.Time, Time> {
  constructor(copyFrom: Time);
  constructor(amount: number, unit: TimeUnit);

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(firstArg: Time | number, unit?: TimeUnit) {
    super(firstArg, unit);
  }

  protected construct(amount: number, unit: TimeUnit): Time {
    return new Time(amount, unit);
  }

  protected self(): Time {
    return this;
  }

  static ofSeconds(seconds: number): Time {
    return this.of(seconds, TimeUnit.SECONDS);
  }

  static of(amount: number, unit: TimeUnit = TimeUnit.SECONDS): Time {
    return new Time(amount, unit);
  }
}
