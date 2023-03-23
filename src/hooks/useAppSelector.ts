import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store';

//TODO: Удалить хук если не потребуется
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
