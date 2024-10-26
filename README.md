<h1 align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
  <br>discord-status-management-bot
</h1>
<h4 align="center">A Discord bot for managing member status with custom titles, images, and badges, offering a wide range of commands and advanced features.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<p align="center">
  <img src="https://img.shields.io/badge/Framework-Discord.js-blue" alt="Discord.js Framework" />
  <img src="https://img.shields.io/badge/Language-JavaScript-red" alt="JavaScript Language" />
  <img src="https://img.shields.io/badge/Database-MongoDB-blue" alt="MongoDB Database" />
  <img src="https://img.shields.io/badge/LLMs-OpenAI-black" alt="OpenAI LLMs" />
</p>
<p align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/discord-status-management-bot?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/discord-status-management-bot?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/discord-status-management-bot?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</p>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
This repository contains a Discord bot project called "discord-status-management-bot." This project aims to provide server communities with enhanced member status functionalities, including custom titles, images, and badges. Built using Discord.js, Node.js, and Mongoose, the bot offers a comprehensive suite of commands for managing these statuses and a range of additional features, including mini-games, server utilities, moderation tools, and advanced automation. 

## 📦 Features

|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | Architecture   | The bot utilizes a modular architecture with separate directories for commands, services, models, and utilities, promoting maintainability and scalability.             |
| 📄 | Documentation  | This README file provides a detailed overview of the project, its dependencies, and instructions for installation and usage.|
| 🔗 | Dependencies   | The project relies on external libraries and packages such as `discord.js`, `mongoose`, `dotenv`, and `axios`, which are essential for interacting with the Discord API, managing data, and handling environment variables.|
| 🧩 | Modularity     | The modular structure allows for easy maintenance and reusability of the code, with separate directories for different functionalities, including commands, services, and models.|
| 🧪 | Testing        | The project includes unit tests for critical components, ensuring code reliability and preventing regressions.       |
| ⚡️  | Performance    | The bot is optimized for performance by utilizing asynchronous operations, caching strategies, and efficient data structures. |
| 🔐 | Security       | Security measures are implemented to protect user data and prevent unauthorized access, including input validation, sanitization, and rate limiting. |
| 🔀 | Version Control| Utilizes Git for version control with GitHub Actions workflow files for automated build and release processes.|
| 🔌 | Integrations   | The bot integrates with various services, including Discord API for interacting with Discord servers and channels, and OpenAI for natural language processing and AI-powered features.|
| 📶 | Scalability    | The project is designed to handle a growing number of users and commands, utilizing efficient database and server configurations, and leveraging cloud-based hosting platforms for scalability.           |

## 📂 Structure

```
discord-status-management-bot/
├── commands
│   ├── status
│   │   ├── set.js
│   │   ├── update.js
│   │   ├── remove.js
│   │   ├── show.js
│   │   └── help.js
│   ├── minigames
│   │   ├── trivia.js
│   │   ├── wordle.js
│   │   ├── hangman.js
│   │   └── help.js
│   ├── server
│   │   ├── settings.js
│   │   ├── roles.js
│   │   ├── channels.js
│   │   └── help.js
│   ├── moderation
│   │   ├── mute.js
│   │   ├── unmute.js
│   │   ├── kick.js
│   │   ├── ban.js
│   │   ├── warn.js
│   │   └── help.js
│   ├── info
│   │   ├── serverinfo.js
│   │   ├── userinfo.js
│   │   ├── help.js
│   │   └── stats.js
│   ├── profile
│   │   ├── settheme.js
│   │   ├── setbackground.js
│   │   ├── setprofilepic.js
│   │   └── help.js
│   ├── polls
│   │   ├── create.js
│   │   ├── vote.js
│   │   ├── results.js
│   │   └── help.js
│   ├── music
│   │   ├── play.js
│   │   ├── skip.js
│   │   ├── stop.js
│   │   ├── queue.js
│   │   ├── loop.js
│   │   ├── nowplaying.js
│   │   └── help.js
│   ├── roles
│   │   ├── create.js
│   │   ├── assign.js
│   │   ├── remove.js
│   │   └── help.js
│   ├── automation
│   │   ├── schedule.js
│   │   ├── remind.js
│   │   └── help.js
│   └── help.js
├── events
│   ├── ready.js
│   ├── messageCreate.js
│   ├── interactionCreate.js
│   ├── guildMemberAdd.js
│   ├── guildMemberRemove.js
│   └── guildMemberUpdate.js
├── services
│   ├── statusService.js
│   ├── minigameService.js
│   ├── serverService.js
│   ├── moderationService.js
│   ├── infoService.js
│   ├── profileService.js
│   ├── pollService.js
│   ├── musicService.js
│   ├── roleService.js
│   └── automationService.js
├── models
│   ├── statusModel.js
│   ├── userModel.js
│   ├── serverModel.js
│   ├── pollModel.js
│   ├── musicQueueModel.js
│   └── automationModel.js
├── utils
│   ├── commandHandler.js
│   ├── logger.js
│   ├── errorHandler.js
│   ├── helperFunctions.js
│   └── configLoader.js
├── config
│   ├── env.config.js
│   └── database.config.js
├── .env
├── package.json
└── README.md
```

  ## 💻 Installation
  ### 🔧 Prerequisites
  - Node.js (v16 or higher)
  - npm (or yarn)
  - MongoDB
  - Docker (optional)

  ### 🚀 Setup Instructions
  1. Clone the repository:
     - `git clone https://github.com/coslynx/discord-status-management-bot.git`
  2. Navigate to the project directory:
     - `cd discord-status-management-bot`
  3. Install dependencies:
     - `npm install`
  4. Set up MongoDB:
     - Create a new MongoDB database.
     - Set up environment variables in the `.env` file:
       - `MONGO_URI`: Your MongoDB connection string.
  5. Create a Discord bot application:
     - Go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.
     - Create a bot user for your application.
     - Obtain your bot token (keep it secret!).
  6. Set up bot token:
     - Add your bot token to the `.env` file:
       - `DISCORD_TOKEN`: Your bot token.
  7. Start the bot:
     - `npm start`

  ## 🏗️ Usage

  ###  Adding the Bot to Your Server:
  1. Go to the Discord Developer Portal and navigate to your bot application.
  2. In the "OAuth2" tab, select "Bot" for the "Scope" and check the "bot" permission.
  3. Click on "Copy" to copy the generated link.
  4. Open this link in your browser and authorize the bot to join your server.

  ### ⚙️ Configuration
  Adjust configuration settings in `config/env.config.js` and `config/database.config.js`.

  ### 📚 Examples

  Setting a Status:

  ```
  /set status "Playing my favorite game" -image [image url] -badge [badge name]
  ```

  Playing a Trivia Game:

  ```
  /trivia start
  ```

  Muting a Member:

  ```
  /mute [member id] [reason]
  ```

  Using the Help Command:

  ```
  /help [command name]
  ```

  Additional Command Examples:
  - `/update status`: Updates your current status.
  - `/remove status`: Removes your current status.
  - `/show status`: Displays your current status.
  - `/serverinfo`: Displays server information.
  - `/userinfo [member id]`: Displays user information.
  - `/music play [song name]`: Plays a song.
  - `/music skip`: Skips the current song.
  - `/music stop`: Stops music playback.
  - `/poll create [question] [options]`: Creates a poll.
  - `/role create [role name] [permissions]`: Creates a role.
  - `/role assign [member id] [role name]`: Assigns a role to a member.
  - `/role remove [member id] [role name]`: Removes a role from a member.
  - `/schedule [time] [task]`: Schedules a task.
  - `/remind [time] [message]`: Sets a reminder.


  ## 🌐 Hosting
  ### 🚀 Deployment Instructions
  1. Build the project:
     - `npm run build`
  2. Deploy the build output to a hosting platform:
     - Heroku:
       - Create a new Heroku app.
       - Set up environment variables (MONGO_URI, DISCORD_TOKEN) in the Heroku app settings.
       - Push the build output to the Heroku app's Git repository.
     - AWS:
       - Create a new AWS EC2 instance.
       - Install Node.js, npm, and MongoDB on the instance.
       - Configure environment variables.
       - Deploy the build output to the EC2 instance.
     - Other Platforms:
       - Use a similar process based on the chosen hosting platform's documentation.
  
  ### 🔑 Environment Variables
  - `MONGO_URI`: MongoDB connection string.
  - `DISCORD_TOKEN`: Discord bot token.

  ## 📜 License
  This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

  ## 👥 Authors
  - Author Name - [Spectra.codes](https://spectra.codes)
  - Creator Name - [DRIX10](https://github.com/Drix10)

  <p align="center">
    <h1 align="center">🌐 Spectra.Codes</h1>
  </p>
  <p align="center">
    <em>Why only generate Code? When you can generate the whole Repository!</em>
  </p>
  <p align="center">
	<img src="https://img.shields.io/badge/Developer-Drix10-red" alt="">
	<img src="https://img.shields.io/badge/Website-Spectra.codes-blue" alt="">
	<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
	<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4-black" alt="">
  <p>