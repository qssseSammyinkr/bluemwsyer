import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Displays the server rules"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle("📜 Server Rules")
      .setDescription(`
1️⃣ Be respectful  
2️⃣ No spam or self-promo  
3️⃣ Use the right channels  
4️⃣ Follow Discord's ToS  
`)
      .setColor("Blurple");

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
