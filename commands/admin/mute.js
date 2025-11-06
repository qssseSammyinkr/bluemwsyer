import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute a user in the server.")
    .addUserOption(option =>
      option.setName("target").setDescription("User to mute").setRequired(true)
    )
    .addIntegerOption(option =>
      option.setName("minutes").setDescription("Mute duration in minutes").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("target");
    const minutes = interaction.options.getInteger("minutes");
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member) return interaction.reply({ content: "❌ User not found.", ephemeral: true });
    if (!member.moderatable) return interaction.reply({ content: "❌ I cannot mute this user.", ephemeral: true });

    const duration = minutes * 60 * 1000;
    await member.timeout(duration, `Muted by ${interaction.user.tag}`);

    await interaction.reply(`🔇 Muted **${user.tag}** for ${minutes} minutes.`);
  },
};
