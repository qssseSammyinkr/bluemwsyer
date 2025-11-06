import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmute a previously muted user.")
    .addUserOption(option =>
      option.setName("target").setDescription("User to unmute").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("target");
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member) return interaction.reply({ content: "❌ User not found.", ephemeral: true });

    await member.timeout(null);
    await interaction.reply(`🔊 Unmuted **${user.tag}**.`);
  },
};
