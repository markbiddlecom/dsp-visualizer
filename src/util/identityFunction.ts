export type IdentityFunction<T> = (t: T) => T;

export const IDENTITY: IdentityFunction<unknown> = t => t;

export function identityFunction<T>(): IdentityFunction<T> {
  return <IdentityFunction<T>> IDENTITY;
}
