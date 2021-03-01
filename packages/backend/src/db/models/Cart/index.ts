import { model, Schema } from 'mongoose';
import { CartInterface } from './Cart';

const cartSchema = new Schema({
  documents: [
    {
      path: {
        type: String,
        required: true,
      },
      pages: {
        type: Number,
        required: true,
      },
      copies: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        require: true,
      },
      print: {
        type: String,
        required: true,
      },
      paper: {
        type: String,
        required: true,
      },
      binding: String,
      name: {
        type: String,
        required: true,
      },
    },
  ],
  totalCost: {
    type: Number,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
});

export default model<CartInterface>('Cart', cartSchema);
