const bad = ["bc", "mc", "fuck", "shit"];

export async function antiBadword(sock, msg, text) {
  if (!bad.some(w => text.toLowerCase().includes(w))) return false;
  await sock.sendMessage(msg.key.remoteJid, { delete: msg.key });
  return true;
}