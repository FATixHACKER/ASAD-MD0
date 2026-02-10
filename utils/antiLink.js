const warns = new Map();

export async function antiLink(sock, msg, text) {
  if (!/https?:\/\//i.test(text)) return false;

  const jid = msg.key.remoteJid;
  const user = msg.key.participant;

  await sock.sendMessage(jid, { delete: msg.key });

  const w = (warns.get(user) || 0) + 1;
  warns.set(user, w);

  if (w >= 2) {
    await sock.groupParticipantsUpdate(jid, [user], "remove");
    warns.delete(user);
  }
  return true;
}