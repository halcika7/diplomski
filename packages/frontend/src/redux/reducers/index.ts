import { combineReducers, Reducer } from 'redux';

// reducers
import { AuthReducer as auth, AuthState } from './auth';
import { UserReducer as user, UserState } from './user';
import { UploadReducer as upload, UploadState } from './upload';
import { CartReducer as cart, CartState } from './cart';
import {
  PaperBindingReducer as paperBinding,
  PaperBindingState,
} from './paperBinding';
import { FileReducer as file, FileState } from './file';
import { OrderReducer as order, OrderState } from './order';

export interface AppState {
  auth: AuthState;
  user: UserState;
  upload: UploadState;
  cart: CartState;
  paperBinding: PaperBindingState;
  file: FileState;
  order: OrderState;
}

export const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  auth,
  user,
  upload,
  cart,
  paperBinding,
  file,
  order,
});
