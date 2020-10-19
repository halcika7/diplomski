import { model, Schema } from 'mongoose';
import { PaperInterface } from './Paper';

const paperSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  blackWhitePrinting: {
    upTo250: {
      type: Number,
      require: true,
    },
    from250upTo500: {
      type: Number,
      require: true,
    },
    from500upTo1000: {
      type: Number,
      require: true,
    },
    from1000: {
      type: Number,
      require: true,
    },
  },
  colorPrinting: {
    upTo250: {
      type: Number,
      require: true,
    },
    from250upTo500: {
      type: Number,
      require: true,
    },
    from500upTo1000: {
      type: Number,
      require: true,
    },
    from1000: {
      type: Number,
      require: true,
    },
  },
  available: {
    type: Boolean,
    require: true,
  },
});

export default model<PaperInterface>('papers', paperSchema);
