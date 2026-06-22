import { useState } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);

      if (item !== null) {
        return JSON.parse(item) as T;
      }

      return initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (
    value: T | ((prev: T) => T)
  ) => {
    setStoredValue((prev) => {
      const valueToStore =
        value instanceof Function
          ? value(prev)
          : value;

      try {
        localStorage.setItem(
          key,
          JSON.stringify(valueToStore)
        );
      } catch {
        // Ignore write errors
      }

      return valueToStore;
    });
  };

  return [storedValue, setValue];
}