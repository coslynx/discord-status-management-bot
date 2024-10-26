import { Schema, model } from 'mongoose';

const statusSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  badge: {
    type: String,
    default: null,
  },
});

export const statusModel = model('Status', statusSchema);