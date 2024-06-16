import {
  AppDispatch,
  RootState,
  useAppDispatch,
  useAppSelector,
} from "./store";

export function useAppStore<TSelected = unknown>(
  selector: (state: RootState) => TSelected
): [TSelected, AppDispatch] {
  return [useAppSelector(selector), useAppDispatch()];
}
