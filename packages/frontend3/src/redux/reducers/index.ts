import { combineReducers, Reducer } from 'redux';
import { CartFront } from '@job/common';

// reducers
import { AuthReducer as auth, AuthState } from './auth';
import { UserReducer as user, UserState } from './user';
import { UploadReducer as upload, UploadState } from './upload';
import { CartReducer as cart } from './cart';
import {
  PaperBindingReducer as paperBinding,
  PaperBindingState,
} from './paperBinding';
import { FileReducer as file, FileState } from './file';
import { OrderReducer as order, OrderState } from './order';
import { DashboardReducer as dashboard, DashboardState } from './dashboard';

export interface AppState {
  auth: AuthState;
  user: UserState;
  upload: UploadState;
  cart: CartFront;
  paperBinding: PaperBindingState;
  file: FileState;
  order: OrderState;
  dashboard: DashboardState;
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  auth,
  user,
  upload,
  cart,
  paperBinding,
  file,
  order,
  dashboard,
});
