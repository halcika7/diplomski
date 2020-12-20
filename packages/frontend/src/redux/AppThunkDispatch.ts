import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { AnyDictionary } from '@job/common';

export type AppThunkDispatch = ThunkDispatch<
  AnyDictionary,
  AnyDictionary,
  AnyAction
>;

export const useThunkDispatch = (): AppThunkDispatch =>
  useDispatch<AppThunkDispatch>();
