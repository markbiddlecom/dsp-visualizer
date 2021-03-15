export const Truthy: <T>(x: T | undefined) => x is T = Boolean as any;

export function arrDiff<T>(arr1: T[], arr2: T[]) {
  const arr1Set = new Set(arr1);
  const result: T[] = [];
  for (let t of arr2) {
    if (!arr1Set.has(t)) {
      result.push(t);
    }
  }
  return result;
}

export function findParent(elem: Element | undefined, nodeName: string) {
  while (elem && elem.nodeName !== nodeName) {
    elem = elem.parentElement || undefined;
  }
  return elem;
};

export type CreateBatchingPromiseArgs<ITEM, OUTPUT> = {
  items: ITEM[],
  processFunction: (item: ITEM) => Promise<OUTPUT>,
  batchSize?: number,
  onBatchStart?: (items: ITEM[], remainingBatches: ITEM[][]) => boolean,
  onBatchFinish?: (items: ITEM[], batchOutput: OUTPUT[], previousOutput: OUTPUT[], remainingBatches: ITEM[][]) => boolean,
};

export function createBatchingPromise<ITEM, OUTPUT>({
  items, processFunction, batchSize = 3, onBatchStart = () => true, onBatchFinish = () => true
}: CreateBatchingPromiseArgs<ITEM, OUTPUT>): Promise<OUTPUT[]> {
  const batches: ITEM[][] = [];

  while (items.length) {
    const batch: ITEM[] = [];
    batches.push(batch);
    for (let i = 0; i < batchSize && items.length; i++) {
      const toPush = items.shift();
      if (toPush) { batch.push(toPush); }
    }
  }

  const outputs: OUTPUT[] = [];

  const fetchNextBatch = async (): Promise<OUTPUT[]> => {
    const nextBatch = batches.shift();
    if (!nextBatch || !onBatchStart(nextBatch, batches)) {
      return Promise.resolve(outputs);
    }

    const curOutputs = await Promise.all(nextBatch.map(processFunction));
    if (!onBatchFinish(nextBatch, curOutputs, outputs, batches)) {
      return Promise.resolve(outputs);
    }
    curOutputs.forEach(o => outputs.push(o));

    return await fetchNextBatch();
  }

  return fetchNextBatch();
}

export function identity<T>(): (t: T) => T {
  return i => i;
}

export function toFlattenedArray<T>(): (combined: T[], arr: T[]) => T[] {
  return (combined, arr) => combined.concat(arr);
}

export function toMap<I, K, V>(
  keyFunction: (item: I) => K,
  valueFunction: (item: I) => V,
  mergeFunction: (firstValue: V, secondValue: V) => V = identity(),
): (map: Map<K, V>, item: I) => Map<K, V> {
  return (map, item) => {
    const key = keyFunction(item);
    const value = valueFunction(item);
    const existing = map.get(key);
    if (existing !== undefined) {
      map.set(key, mergeFunction(existing, value));
    } else {
      map.set(key, value);
    }
    return map;
  };
}

export function toMapByKey<K, V>(keyFunction: (value: V) => K): (map: Map<K, V>, value: V) => Map<K, V> {
  return toMap(keyFunction, identity());
}

export function nameToKey(title: string): string {
  return title.replace(/[^a-z0-9]/ig, "");
}
