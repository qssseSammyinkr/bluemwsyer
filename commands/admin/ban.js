import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member from the server.")
    .addUserOption(option =>
      option.setName("target").setDescription("User to ban").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason").setDescription("Reason for the ban").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason") || "No reason provided";
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member) return interaction.reply({ content: "❌ User not found on this server.", ephemeral: true });
    if (!member.bannable) return interaction.reply({ content: "❌ I cannot ban this user.", ephemeral: true });

    await member.ban({ reason });
    await interaction.reply(`🔨 Banned **${user.tag}** | Reason: ${reason}`);
  },
};
