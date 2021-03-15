export function* counts(from: number, to: number, step = 1): Generator<number> {
  for (let i = from; i < to; i += step) {
    yield i;
  }
}
