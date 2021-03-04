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
