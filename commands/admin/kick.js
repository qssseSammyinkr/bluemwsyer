import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member from the server.")
    .addUserOption(option =>
      option.setName("target").setDescription("User to kick").setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reason").setDescription("Reason for the kick").setRequired(false)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(interaction) {
    const user = interaction.options.getUser("target");
    const reason = interaction.options.getString("reason") || "No reason provided";
    const member = await interaction.guild.members.fetch(user.id).catch(() => null);

    if (!member) return interaction.reply({ content: "❌ User not found on this server.", ephemeral: true });
    if (!member.kickable) return interaction.reply({ content: "❌ I cannot kick this user.", ephemeral: true });

    await member.kick(reason);
    await interaction.reply(`👢 Kicked **${user.tag}** | Reason: ${reason}`);
  },
};
