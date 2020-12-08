import { model, Schema } from 'mongoose';
import { UserInterface } from './User';

const userSchema = new Schema({
  googleID: {
    type: String,
    required: true,
    default: 'google',
  },
  name: {
    type: String,
    required: true,
    default: 'some name',
  },
  picture: {
    type: String,
    required: true,
    default:
      'https://res.cloudinary.com/halcika/image/upload/v1601248708/blank-user-img.jpg',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  facebookLink: {
    type: String,
    default: '',
  },
  twitterLink: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    default: '',
  },
  blocked: {
    type: Boolean,
    required: true,
    default: false,
  },
  subscription: {
    type: Object,
  },
});

export default model<UserInterface>('User', userSchema);
