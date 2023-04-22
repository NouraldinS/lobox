/* eslint-disable import/prefer-default-export */

export const callAllWithArgs = <T, >(
  fns: Array<((...args: T[]) => unknown) | undefined>,
): ((...args: T[]) => void) => (...args: T[]): void => fns
    .filter(Boolean)
    .forEach((fn) => (fn as ((...args1: T[]) => unknown))(...args));
