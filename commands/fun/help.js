// === help.js ===
import { SlashCommandBuilder } from "discord.js";
import fs from "fs";
import path from "path";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows a list of all commands"),

  async execute(interaction) {
    const commandsPath = path.join(process.cwd(), "commands");
    const categories = fs.readdirSync(commandsPath);
    let reply = "📜 **Available Commands:**\n\n";

    for (const category of categories) {
      const files = fs.readdirSync(path.join(commandsPath, category))
        .filter((f) => f.endsWith(".js"));

      reply += `**${category.toUpperCase()}**\n`;
      for (const file of files) {
        const { default: command } = await import(
          `file://${path.join(commandsPath, category, file)}`
        );
        if (command?.data) {
          reply += `• \`/${command.data.name}\` — ${command.data.description}\n`;
        }
      }
      reply += "\n";
    }

    await interaction.reply(reply);
  },
};
