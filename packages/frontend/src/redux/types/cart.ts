export enum CartActions {
  SET_CART = 'SET_CART',
  ADD_FILE = 'ADD_FILE',
}

export type FileDocument = {
  _id: string;
  path: string;
  pages: number;
  copies: number;
  price: number;
  print: string;
  paper: string;
  binding: string;
  name: string;
};

export interface Cart {
  documents: FileDocument[];
  totalCost: number;
  userId: string;
}

interface SetCart {
  type: typeof CartActions.SET_CART;
  payload: { cart: Cart };
}

export type CartActionTypes = SetCart;
