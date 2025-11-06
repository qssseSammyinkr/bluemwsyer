import { EmbedBuilder } from "discord.js";
import fs from "fs";
import path from "path";

const configPath = path.resolve("./config.json");
const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

export default {
  name: "messageDelete",
  async execute(message) {
    if (!message.guild || message.author?.bot) return;
    const logChannel = message.guild.channels.cache.get(config.logs.messageDelete);
    if (!logChannel) return;

    const embed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("🗑️ Message Deleted")
      .setDescription(`Message by ${message.author} deleted in ${message.channel}`)
      .addFields({ name: "Content", value: message.content || "*No content*" })
      .setTimestamp();

    logChannel.send({ embeds: [embed] });
  }
};
