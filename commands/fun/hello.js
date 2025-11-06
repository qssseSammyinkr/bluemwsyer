// === hello.js ===
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Replies with a friendly greeting"),

  async execute(interaction) {
    await interaction.reply("👋 Hello there!");
  },
};
