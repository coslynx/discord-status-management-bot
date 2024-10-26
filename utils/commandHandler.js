import { Client, Collection, IntentsBitField } from 'discord.js';
import { configLoader } from './utils/configLoader';
import logger from './utils/logger';
import { readdirSync } from 'fs';
import path from 'path';

const config = configLoader();

const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildVoiceStates] });

client.commands = new Collection();

export default class CommandHandler {
  async registerCommands(client) {
    const commandFiles = [];

    const commandFolders = readdirSync(path.join(__dirname, '..', 'commands'));
    for (const folder of commandFolders) {
      const commandFilesInFolder = readdirSync(path.join(__dirname, '..', 'commands', folder)).filter((file) => file.endsWith('.js'));
      for (const file of commandFilesInFolder) {
        commandFiles.push(path.join(__dirname, '..', 'commands', folder, file));
      }
    }

    return commandFiles;
  }
}

client.on('ready', async () => {
  logger.info(`Logged in as ${client.user.tag}!`);

  // Register all commands
  const commandFiles = await new CommandHandler().registerCommands(client);

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