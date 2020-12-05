import { model, Schema } from 'mongoose';
import { OrderInterface } from './Order';

const orderSchema = new Schema(
  {
    documents: [
      {
        name: {
          type: String,
          required: true,
        },
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
      },
    ],
    totalCost: {
      type: Number,
      required: true,
    },
    orderedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    orderedFor: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    paid: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<OrderInterface>('Order', orderSchema);
