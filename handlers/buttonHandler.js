// === handlers/buttonHandler.js ===
import { Events } from "discord.js";

export default function handleButton(interaction) {
  // Placeholder — handle button interactions here later
  if (!interaction.isButton()) return;
  console.log(`🖱️ Button clicked: ${interaction.customId}`);
}
