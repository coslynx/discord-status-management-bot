import { Interaction, Message } from 'discord.js';
import { hangmanModel, triviaModel, wordleModel } from '../models/minigameModel';
import logger from '../utils/logger';
import { shuffleArray } from '../utils/helperFunctions';

export const triviaService = {
  async startGame(interaction: Interaction): Promise<void> {
    try {
      // Fetch a random trivia question
      const triviaQuestions = await triviaModel.find();
      const randomIndex = Math.floor(Math.random()  triviaQuestions.length);
      const question = triviaQuestions[randomIndex];

      // Start a new trivia game
      await triviaModel.create({
        guildId: interaction.guild.id,
        channelId: interaction.channel.id,
        userId: interaction.user.id,
        question: question.question,
        answer: question.answer,
        options: shuffleArray([
          question.answer,
          ...question.incorrectAnswers,
        ]),
        startedAt: new Date(),
        endedAt: null,
        correct: false,
        attempts: 0,
      });

      // Send the trivia question to the channel
      await interaction.reply({
        content: `${question.question}\n${question.options.map((option, index) => `${index + 1}. ${option}`).join('\n')}`,
      });

      // Set up a listener for answer responses
      const filter = (m: Message) => m.author.id === interaction.user.id;
      const collector = interaction.channel.createMessageCollector({ filter, time: 30000 });

      // Handle answer responses
      collector.on('collect', async (m: Message) => {
        // Check if the answer is correct
        const selectedOption = parseInt(m.content, 10);
        const isCorrect = question.options[selectedOption - 1] === question.answer;

        // Update the game state
        await triviaModel.findOneAndUpdate(
          {
            guildId: interaction.guild.id,
            channelId: interaction.channel.id,
            userId: interaction.user.id,
          },
          {
            correct: isCorrect,
            endedAt: new Date(),
            attempts: selectedOption,
          }
        );

        // Send the result to the channel
        await interaction.channel.send(
          isCorrect ? 'Correct!' : `Incorrect. The correct answer was ${question.answer}.`
        );

        // Stop the message collector
        collector.stop();
      });

      // Handle collector timeout
      collector.on('end', async (collected, reason) => {
        if (reason === 'time') {
          await interaction.channel.send('Time\'s up!');
        }
      });
    } catch (error) {
      logger.error('Error starting trivia game:', error);
      await interaction.reply({
        content: 'An error occurred while starting the trivia game. Please try again later.',
        ephemeral: true,
      });
    }
  },
};

export const wordleService = {
  async startGame(interaction: Interaction): Promise<void> {
    try {
      // Fetch a random word
      const wordleWords = await wordleModel.find();
      const randomIndex = Math.floor(Math.random()  wordleWords.length);
      const word = wordleWords[randomIndex].word;

      // Start a new Wordle game
      await wordleModel.create({
        guildId: interaction.guild.id,
        channelId: interaction.channel.id,
        userId: interaction.user.id,
        word,
        attempts: 0,
        guesses: [],
        endedAt: null,
        won: false,
      });

      // Send the initial message to the channel
      await interaction.reply({
        content: 'Welcome to Wordle! Guess a 5-letter word.',
      });

      // Set up a listener for guess responses
      const filter = (m: Message) => m.author.id === interaction.user.id;
      const collector = interaction.channel.createMessageCollector({ filter, time: 30000 });

      // Handle guess responses
      collector.on('collect', async (m: Message) => {
        const guess = m.content.toLowerCase();

        // Validate guess (5 letters)
        if (guess.length !== 5 || !/^[a-z]+$/.test(guess)) {
          await interaction.channel.send('Please enter a valid 5-letter word.');
          return;
        }

        // Update the game state
        await wordleModel.findOneAndUpdate(
          {
            guildId: interaction.guild.id,
            channelId: interaction.channel.id,
            userId: interaction.user.id,
          },
          {
            $push: { guesses: guess },
            attempts: { $inc: 1 },
            endedAt: guess === word ? new Date() : null,
            won: guess === word,
          }
        );

        // Check if the game is over
        if (guess === word || interaction.attempts >= 6) {
          collector.stop();

          if (guess === word) {
            await interaction.channel.send(`You won! The word was ${word}.`);
          } else {
            await interaction.channel.send(`You lost! The word was ${word}.`);
          }
        } else {
          // Provide clues based on guess (like Wordle)
          // You'll need to implement logic to determine the clues based on the guess
          // (e.g., letter in correct position, letter in word but wrong position, etc.)
          await interaction.channel.send('Provide clues based on guess.');
        }
      });

      // Handle collector timeout
      collector.on('end', async (collected, reason) => {
        if (reason === 'time') {
          await interaction.channel.send('Time\'s up!');
        }
      });
    } catch (error) {
      logger.error('Error starting Wordle game:', error);
      await interaction.reply({
        content: 'An error occurred while starting the Wordle game. Please try again later.',
        ephemeral: true,
      });
    }
  },
};

export const hangmanService = {
  async startGame(interaction: Interaction): Promise<void> {
    try {
      // Fetch a random word
      const hangmanWords = await hangmanModel.find();
      const randomIndex = Math.floor(Math.random()  hangmanWords.length);
      const word = hangmanWords[randomIndex].word;

      // Start a new Hangman game
      await hangmanModel.create({
        guildId: interaction.guild.id,
        channelId: interaction.channel.id,
        userId: interaction.user.id,
        word,
        incorrectGuesses: 0,
        guessedLetters: [],
        endedAt: null,
        won: false,
      });

      // Send the initial message to the channel
      const displayedWord = word.split('').map(() => '_').join(' ');
      await interaction.reply({
        content: `Welcome to Hangman! Guess a letter to start.\nWord: ${displayedWord}`,
      });

      // Set up a listener for guess responses
      const filter = (m: Message) => m.author.id === interaction.user.id && m.content.length === 1 && /^[a-z]$/.test(m.content);
      const collector = interaction.channel.createMessageCollector({ filter, time: 30000 });

      // Handle guess responses
      collector.on('collect', async (m: Message) => {
        const guess = m.content.toLowerCase();

        // Check if the letter has already been guessed
        if (interaction.guessedLetters.includes(guess)) {
          await interaction.channel.send('You already guessed that letter!');
          return;
        }

        // Update the game state
        await hangmanModel.findOneAndUpdate(
          {
            guildId: interaction.guild.id,
            channelId: interaction.channel.id,
            userId: interaction.user.id,
          },
          {
            $push: { guessedLetters: guess },
            incorrectGuesses: word.includes(guess) ? interaction.incorrectGuesses : interaction.incorrectGuesses + 1,
            endedAt: interaction.incorrectGuesses >= 6 || word.split('').every((letter) => interaction.guessedLetters.includes(letter)) ? new Date() : null,
            won: word.split('').every((letter) => interaction.guessedLetters.includes(letter)),
          }
        );

        // Check if the game is over
        if (interaction.incorrectGuesses >= 6 || interaction.won) {
          collector.stop();

          if (interaction.won) {
            await interaction.channel.send(`You won! The word was ${word}.`);
          } else {
            await interaction.channel.send(`You lost! The word was ${word}.`);
          }
        } else {
          // Update the displayed word
          const displayedWord = word.split('').map((letter) => interaction.guessedLetters.includes(letter) ? letter : '_').join(' ');
          await interaction.channel.send(`Word: ${displayedWord}\nIncorrect Guesses: ${interaction.incorrectGuesses}`);
        }
      });

      // Handle collector timeout
      collector.on('end', async (collected, reason) => {
        if (reason === 'time') {
          await interaction.channel.send('Time\'s up!');
        }
      });
    } catch (error) {
      logger.error('Error starting hangman game:', error);
      await interaction.reply({
        content: 'An error occurred while starting the hangman game. Please try again later.',
        ephemeral: true,
      });
    }
  },
};

export const hangmanService = {
  async startGame(interaction: Interaction): Promise<void> {
    try {
      // Fetch a random word
      const hangmanWords = await hangmanModel.find();
      const randomIndex = Math.floor(Math.random()  hangmanWords.length);
      const word = hangmanWords[randomIndex].word;

      // Start a new Hangman game
      await hangmanModel.create({
        guildId: interaction.guild.id,
        channelId: interaction.channel.id,
        userId: interaction.user.id,
        word,
        incorrectGuesses: 0,
        guessedLetters: [],
        endedAt: null,
        won: false,
      });

      // Send the initial message to the channel
      const displayedWord = word.split('').map(() => '_').join(' ');
      await interaction.reply({
        content: `Welcome to Hangman! Guess a letter to start.\nWord: ${displayedWord}`,
      });

      // Set up a listener for guess responses
      const filter = (m: Message) => m.author.id === interaction.user.id && m.content.length === 1 && /^[a-z]$/.test(m.content);
      const collector = interaction.channel.createMessageCollector({ filter, time: 30000 });

      // Handle guess responses
      collector.on('collect', async (m: Message) => {
        const guess = m.content.toLowerCase();

        // Check if the letter has already been guessed
        if (interaction.guessedLetters.includes(guess)) {
          await interaction.channel.send('You already guessed that letter!');
          return;
        }

        // Update the game state
        await hangmanModel.findOneAndUpdate(
          {
            guildId: interaction.guild.id,
            channelId: interaction.channel.id,
            userId: interaction.user.id,
          },
          {
            $push: { guessedLetters: guess },
            incorrectGuesses: word.includes(guess) ? interaction.incorrectGuesses : interaction.incorrectGuesses + 1,
            endedAt: interaction.incorrectGuesses >= 6 || word.split('').every((letter) => interaction.guessedLetters.includes(letter)) ? new Date() : null,
            won: word.split('').every((letter) => interaction.guessedLetters.includes(letter)),
          }
        );

        // Check if the game is over
        if (interaction.incorrectGuesses >= 6 || interaction.won) {
          collector.stop();

          if (interaction.won) {
            await interaction.channel.send(`You won! The word was ${word}.`);
          } else {
            await interaction.channel.send(`You lost! The word was ${word}.`);
          }
        } else {
          // Update the displayed word
          const displayedWord = word.split('').map((letter) => interaction.guessedLetters.includes(letter) ? letter : '_').join(' ');
          await interaction.channel.send(`Word: ${displayedWord}\nIncorrect Guesses: ${interaction.incorrectGuesses}`);
        }
      });

      // Handle collector timeout
      collector.on('end', async (collected, reason) => {
        if (reason === 'time') {
          await interaction.channel.send('Time\'s up!');
        }
      });
    } catch (error) {
      logger.error('Error starting hangman game:', error);
      await interaction.reply({
        content: 'An error occurred while starting the hangman game. Please try again later.',
        ephemeral: true,
      });
    }
  },
};