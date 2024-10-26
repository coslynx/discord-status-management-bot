import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  discriminator: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    default: null,
  },
  joinedAt: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: null,
  },
  roles: {
    type: [String],
    default: [],
  },
  permissions: {
    type: [String],
    default: [],
  },
  status: {
    type: Object,
    default: null,
  },
  profile: {
    type: Object,
    default: null,
  },
});

export const userModel = model('User', userSchema);