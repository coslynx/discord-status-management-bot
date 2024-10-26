import logger from './logger';

export default class ErrorHandler {
  constructor() {
    this.handle = this.handle.bind(this);
  }

  handle(error, interaction) {
    logger.error('An error occurred:', error);

    if (interaction) {
      interaction.reply({
        content: 'An error occurred. Please try again later.',
        ephemeral: true,
      });
    }
  }
}