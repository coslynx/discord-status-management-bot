import { Schema, model } from 'mongoose';

const serverSchema = new Schema({
  guildId: {
    type: String,
    required: true,
  },
  welcomeMessage: {
    type: String,
    default: null,
  },
  welcomeChannel: {
    type: String,
    default: null,
  },
  loggingChannel: {
    type: String,
    default: null,
  },
  defaultRole: {
    type: String,
    default: null,
  },
  autoRole: {
    type: String,
    default: null,
  },
  roles: {
    type: [
      {
        roleId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        permissions: {
          type: [String],
          required: true,
        },
      },
    ],
    default: [],
  },
  channels: {
    type: [
      {
        channelId: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ['GUILD_TEXT', 'GUILD_VOICE'],
          required: true,
        },
        topic: {
          type: String,
          default: null,
        },
      },
    ],
    default: [],
  },
});

export const serverModel = model('Server', serverSchema);