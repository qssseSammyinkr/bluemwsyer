import { Client, GatewayIntentBits, Collection } from "discord.js";
import dotenv from "dotenv";
import { loadCommands } from "./handlers/commandHandler.js";
import { loadEvents } from "./handlers/eventHandler.js";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration
  ]
});

client.commands = new Collection();

await loadCommands(client);
await loadEvents(client);

// ===== Handle Interactions =====
client.on("interactionCreate", async interaction => {
  try {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (!command) return;

      // Se o comando precisar de mais tempo, você pode deferir
      if (!interaction.deferred && !interaction.replied) {
        await interaction.deferReply({ ephemeral: true });
      }

      await command.execute(interaction, client);
    }
  } catch (err) {
    console.error("⚠️ Interaction error:", err);

    // Tenta enviar uma mensagem segura de erro
    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({ content: "⚠️ Error executing command.", ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN);
