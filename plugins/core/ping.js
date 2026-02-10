export const command = ".ping";
export async function run({ sock, msg }) {
  await sock.sendMessage(msg.key.remoteJid, { text: "🏓 Pong" });
}