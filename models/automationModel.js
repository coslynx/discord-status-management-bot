import { model, Schema } from 'mongoose';

const automationSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  channelId: {
    type: String,
    required: false,
  },
  time: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
});

export const automationModel = model('Automation', automationSchema);