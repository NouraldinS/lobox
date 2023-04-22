import { useState } from 'react';

type UseSetReturnType<T> = [
  Set<T>,
  {
    add: (item: T) => void,
    remove: (item: T) => void,
    clear: () => void,
    has: (item: T) => boolean
  }
];

function useSet<T>(initialSet: Set<T> = new Set()): UseSetReturnType<T> {
  const [set, setSet] = useState(initialSet);

  const add = (item: T): void => {
    const newSet = new Set(set);
    newSet.add(item);
    setSet(newSet);
  };

  const remove = (item: T): void => {
    const newSet = new Set(set);
    newSet.delete(item);
    setSet(newSet);
  };

  const clear = (): void => {
    setSet(new Set());
  };

  const has = (item: T): boolean => set.has(item);

  return [set, {
    add, remove, clear, has,
  }];
}

export default useSet;
