import { Client, IntentsBitField } from 'discord.js';
import { configLoader } from './utils/configLoader';
import commandHandler from './utils/commandHandler';
import logger from './utils/logger';

const config = configLoader();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildVoiceStates,
  ],
});

client.commands = new Map();

client.on('ready', async () => {
  logger.info(`Logged in as ${client.user.tag}!`);

  // Register all commands
  const commandFiles = await commandHandler.registerCommands(client);

  // Load commands from commands directory
  commandFiles.forEach((file) => {
    const command = require(file);
    client.commands.set(command.data.name, command);
  });

  // Log all loaded commands
  logger.info('Loaded commands:');
  for (const [key, value] of client.commands) {
    logger.info(`  ${key}: ${value.data.description}`);
  }
});

client.login(config.DISCORD_TOKEN);