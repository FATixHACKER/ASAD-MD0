export const commands = [
  ".tagall",".tagadmins"
];

export async function run({ sock, msg, text }) {
  const jid = msg.key.remoteJid;
  const meta = await sock.groupMetadata(jid);
  const members = meta.participants;

  if (text === ".tagall") {
    return sock.sendMessage(jid,{
      text:"📢 Tagging all",
      mentions: members.map(m=>m.id)
    });
  }

  if (text === ".tagadmins") {
    const admins = members.filter(m=>m.admin);
    return sock.sendMessage(jid,{
      text:"👑 Tagging admins",
      mentions: admins.map(a=>a.id)
    });
  }
}