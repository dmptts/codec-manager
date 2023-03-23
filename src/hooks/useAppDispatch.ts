import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';

//TODO: Удалить хук если не потребуется
export const useAppDispatch = () => useDispatch<AppDispatch>();
