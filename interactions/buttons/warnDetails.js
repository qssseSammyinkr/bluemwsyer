import fs from "fs";
import { EmbedBuilder } from "discord.js";

const warnsPath = "./data/warns.json";

export default {
  customId: /^warnDetails_/,
  async execute(interaction) {
    const userId = interaction.customId.split("_")[1];
    const warns = JSON.parse(fs.readFileSync(warnsPath));
    const userWarns = warns[userId];

    if (!userWarns || userWarns.length === 0)
      return interaction.reply({ content: "No warnings found for this user.", ephemeral: true });

    const embed = new EmbedBuilder()
      .setColor("Orange")
      .setTitle(`⚠️ Warnings for <@${userId}>`)
      .setDescription(
        userWarns
          .map(
            (w, i) =>
              `**#${i + 1}**\n📝 Reason: ${w.reason}\n👮 Moderator: ${w.moderator}\n📅 ${new Date(w.date).toLocaleString()}`
          )
          .join("\n\n")
      )
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  }
};
