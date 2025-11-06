import fs from "fs";
import path from "path";

export async function loadCommands(client) {
  client.commands.clear();
  const commandsPath = path.join(process.cwd(), "commands");

  for (const folder of fs.readdirSync(commandsPath)) {
    const folderPath = path.join(commandsPath, folder);
    for (const file of fs.readdirSync(folderPath).filter(f => f.endsWith(".js"))) {
      const command = (await import(`../commands/${folder}/${file}`)).default;
      client.commands.set(command.data.name, command);
    }
  }

  console.log(`🧩 Loaded ${client.commands.size} commands`);
}
