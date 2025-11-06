// src/handlers/commandHandler.js

// Caminho da pasta de comandos
const commandsDir = './commands';

// Função para carregar os comandos
export async function loadCommands() {
  const commands = new Map();

  // Lendo arquivos da pasta de comandos
  for await (const dirEntry of Deno.readDir(commandsDir)) {
    if (dirEntry.isFile && dirEntry.name.endsWith('.js')) {
      const modulePath = `./commands/${dirEntry.name}`;
      const commandModule = await import(modulePath);
      
      // Assumindo que cada comando exporta { name, execute }
      commands.set(commandModule.name, commandModule);
    }
  }

  return commands;
}
