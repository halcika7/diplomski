import { model, Schema } from 'mongoose';
import { BindingInterface } from './Binding';

const bindingSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  upTo25: {
    type: Number,
    require: true,
  },
  from25upTo50: {
    type: Number,
    require: true,
  },
  from50upTo100: {
    type: Number,
    require: true,
  },
  from100upTo150: {
    type: Number,
    require: true,
  },
  available: {
    type: Boolean,
    require: true,
  },
});

export default model<BindingInterface>('Binding', bindingSchema);
