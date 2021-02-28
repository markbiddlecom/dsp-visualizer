export function flatten<T>(items: (T|T[])[]): T[] {
  const results: T[] = [];
  for (let i of items) {
    if (i instanceof Array) {
      Array.prototype.push.apply(results, i);
    } else {
      results.push(i);
    }
  }
  return results;
}

export function flatteningReducer<T>(): (arr: T[] | null | undefined, item: T | T[], index: number) => T[] {
  return (arr, item) => {
    const toReturn = arr ?? [];
    if (item instanceof Array) {
      Array.prototype.push.apply(toReturn, item);
    } else {
      toReturn.push(item);
    }
    return toReturn;
  }
}
