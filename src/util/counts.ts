export function* counts(from: number, to: number, step: number = 1): Generator<number> {
  for (let i = from; i < to; i += step) {
    yield i;
  }
}
