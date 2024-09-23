// src/store/hooks.ts
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store"; // Adjust the path as necessary

// Create a typed version of useDispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Create a typed version of useSelector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
