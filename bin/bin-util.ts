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
