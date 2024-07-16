import { AppDispatch, RootState } from "./store";
import { useDispatch, useSelector, useStore } from "react-redux";

export function useAppStore<TSelected = unknown>(
  selector: (state: RootState) => TSelected
): [TSelected, AppDispatch] {
  return [useAppSelector(selector), useAppDispatch()];
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
