import dotenv from 'dotenv';
import { existsSync, readFileSync } from 'fs';

dotenv.config();

export const configLoader = () => {
  const config = {
    DISCORD_TOKEN: process.env.DISCORD_TOKEN,
    MONGO_URI: process.env.MONGO_URI,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  };

  const customConfigPath = process.env.CUSTOM_CONFIG_PATH;

  if (customConfigPath && existsSync(customConfigPath)) {
    try {
      const customConfig = JSON.parse(readFileSync(customConfigPath, 'utf-8'));
      return { ...config, ...customConfig };
    } catch (error) {
      console.error('Error loading custom config:', error);
    }
  }

  return config;
};