export type IdentityFunction<T> = (t: T) => T;

export const IDENTITY: IdentityFunction<any> = t => t;

export function identityFunction<T>(): IdentityFunction<T> {
  return <IdentityFunction<T>> IDENTITY;
}
