import fs from "fs";
import path from "path";
import { EmbedBuilder } from "discord.js";

const configPath = path.resolve("./config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

export default {
  name: "moderationLog",
  async execute(action, member, moderator, reason) {
    const logChannel = member.guild.channels.cache.get(config.logs.moderation);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
      .setColor("Orange")
      .setTitle("🛡️ Moderation Action")
      .addFields(
        { name: "Action", value: action },
        { name: "Member", value: `${member.user.tag}` },
        { name: "Moderator", value: `${moderator.user.tag}` },
        { name: "Reason", value: reason || "No reason provided" }
      )
      .setTimestamp();

    logChannel.send({ embeds: [embed] });
  },
};
