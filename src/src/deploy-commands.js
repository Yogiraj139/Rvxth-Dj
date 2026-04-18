import 'dotenv/config';
import { ChannelType, REST, Routes, SlashCommandBuilder } from 'discord.js';

const { DISCORD_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

if (!DISCORD_TOKEN || !CLIENT_ID || !GUILD_ID) {
  throw new Error('Missing DISCORD_TOKEN, CLIENT_ID, or GUILD_ID in .env');
}

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check if the bot is responding'),
  new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song from YouTube in your voice channel')
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('YouTube URL or song name')
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Voice channel to join')
        .addChannelTypes(ChannelType.GuildVoice, ChannelType.GuildStageVoice)
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('tone')
    .setDescription('Play a short test tone in a voice channel')
    .addChannelOption((option) =>
      option
        .setName('channel')
        .setDescription('Voice channel to test')
        .addChannelTypes(ChannelType.GuildVoice, ChannelType.GuildStageVoice)
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skip the current song'),
  new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop playback and clear the queue'),
  new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Force the bot to leave voice and reset its voice connection'),
  new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Show the current music queue')
].map((command) => command.toJSON());

const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);

await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
  body: commands
});

console.log(`Slash commands deployed to server ${GUILD_ID}.`);
