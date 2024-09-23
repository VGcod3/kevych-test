"use client";
import { useCallback, useState } from "react";

export const getFromLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);

  if (value === null) {
    return null;
  }

  const parsed = JSON.parse(value);
  const isString = typeof parsed === "string";

  return isString ? value : parsed;
};

export const removeFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const saveToLocalStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const useLocalStorage = <T>(key: string) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      return getFromLocalStorage(key);
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        saveToLocalStorage(key, value);
      } catch (error) {
        console.error(error);
      }
    },
    [key]
  );

  const removeValue = useCallback(() => {
    try {
      removeFromLocalStorage(key);
    } catch (error) {
      console.error(error);
    }
  }, [key]);

  return [storedValue, setValue, removeValue] as const;
};
