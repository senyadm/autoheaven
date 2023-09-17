import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from './store'; 

export function useAppStore<TSelected = unknown>(
  selector: (state: RootState) => TSelected
): [TSelected | undefined, AppDispatch] {
  return [
    useSelector(selector),
    useDispatch<AppDispatch>()
  ];
}
