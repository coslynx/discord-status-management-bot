import { Schema, model } from 'mongoose';

const pollSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  votes: {
    type: Object,
    default: {},
  },
});

export const pollModel = model('Poll', pollSchema);