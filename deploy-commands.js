// === deploy-guild.js ===
import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID; // ID do seu servidor de teste

const commands = [];

// Caminho das pastas de comandos
const foldersPath = path.join(process.cwd(), "commands");
const commandFolders = fs.readdirSync(foldersPath);

// Importa todos os comandos
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    try {
      const fileImport = await import(`file://${filePath}`);
      const command = fileImport?.default;

      if (command && "data" in command && "execute" in command) {
        commands.push(command.data.toJSON());
        console.log(`🧩 Loaded command: ${command.data.name}`);
      } else {
        console.log(`⚠️ Skipping invalid command file: ${filePath}`);
      }
    } catch (err) {
      console.error(`❌ Error importing ${filePath}: ${err.message}`);
    }
  }
}

// Deploy apenas para a guild
const rest = new REST({ version: "10" }).setToken(TOKEN);

(async () => {
  try {
    console.log(`🔄 Clearing all commands from guild ${GUILD_ID}...`);
    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), { body: [] });
    console.log("🧹 All guild commands removed");

    console.log(`🔄 Deploying ${commands.length} commands to guild ${GUILD_ID}...`);
    const data = await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log(`✅ Successfully deployed ${data.length} commands to guild!`);
  } catch (err) {
    console.error("❌ Error deploying commands:", err);
  }
})();
