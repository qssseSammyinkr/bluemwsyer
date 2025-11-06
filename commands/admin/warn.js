// === warn.js ===
import { SlashCommandBuilder, PermissionFlagsBits } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Add or view warnings for a member")
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addSubcommand(subcommand =>
      subcommand
        .setName("add")
        .setDescription("Add a warning to a user")
        .addUserOption(option =>
          option.setName("user").setDescription("The user to warn").setRequired(true)
        )
        .addStringOption(option =>
          option.setName("reason").setDescription("Reason for the warning").setRequired(false)
        )
    )
    .addSubcommand(subcommand =>
      subcommand
        .setName("list")
        .setDescription("Show all warnings for a user")
        .addUserOption(option =>
          option.setName("user").setDescription("The user to check").setRequired(true)
        )
    ),

  async execute(interaction) {
    const sub = interaction.options.getSubcommand();

    if (sub === "add") {
      const user = interaction.options.getUser("user");
      const reason = interaction.options.getString("reason") || "No reason provided.";
      // In a real system, you’d save this to a database
      await interaction.reply(`⚠️ Warned **${user.tag}** for: ${reason}`);
    }

    if (sub === "list") {
      const user = interaction.options.getUser("user");
      // In a real system, this would fetch from a database
      await interaction.reply(`📋 **${user.tag}** has 0 warnings (demo mode).`);
    }
  },
};
