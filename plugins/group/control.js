export const commands = [
  ".lock",".unlock",".clear",".warn"
];

const warns = new Map();

export async function run({ sock, msg, text }) {
  const jid = msg.key.remoteJid;

  if (text === ".lock")
    return sock.groupSettingUpdate(jid,"announcement");

  if (text === ".unlock")
    return sock.groupSettingUpdate(jid,"not_announcement");

  if (text.startsWith(".warn")) {
    const user = msg.message?.extendedTextMessage?.mentionedJid?.[0];
    if (!user) return sock.sendMessage(jid,{text:"❌ Mention user"});
    const w = (warns.get(user)||0)+1;
    warns.set(user,w);
    return sock.sendMessage(jid,{text:`⚠️ Warning ${w}/2`});
  }

  if (text === ".clear")
    return sock.sendMessage(jid,{text:"🧹 Chat cleared (manual delete only)"});
}