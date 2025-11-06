import config from "../../config.json" assert { type: "json" };

export default {
  name: "warnAdded",

  async execute(guild, userId, warnCount) {
    const logChannel = guild.channels.cache.get(config.logs.moderation);
    const member = await guild.members.fetch(userId).catch(() => null);

    if (!member) return;

    try {
      if (warnCount === 3) {
        await member.timeout(10 * 60 * 1000, "3 warnings reached");
        await logChannel?.send(`🔇 ${member.user.tag} has been muted for 10 minutes (3 warnings).`);
      } else if (warnCount === 5) {
        await member.kick("5 warnings reached");
        await logChannel?.send(`👢 ${member.user.tag} was kicked (5 warnings).`);
      } else if (warnCount >= 7) {
        await member.ban({ reason: "7 warnings reached" });
        await logChannel?.send(`⛔ ${member.user.tag} was banned (7 warnings).`);
      }
    } catch (err) {
      console.error("Auto punishment failed:", err);
    }
  }
};
