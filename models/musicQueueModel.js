import { model, Schema } from 'mongoose';

const musicQueueSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  queue: {
    type: [
      {
        title: {
          type: String,
          required: true,
        },
        artist: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
        thumbnail: {
          type: String,
          required: true,
        },
      },
    ],
    default: [],
  },
  loopMode: {
    type: String,
    enum: ['song', 'queue', 'off'],
    default: 'off',
  },
});

export const musicQueueModel = model('MusicQueue', musicQueueSchema);