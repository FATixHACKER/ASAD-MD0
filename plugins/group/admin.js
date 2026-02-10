export const commands = [
  ".kick",".add",".promote",".demote",".mute",".unmute"
];

export async function run({ sock, msg, text }) {
  const jid = msg.key.remoteJid;
  const user = msg.message?.extendedTextMessage?.mentionedJid?.[0];
  if (!user) return sock.sendMessage(jid,{text:"❌ Mention user"});

  if (text.startsWith(".kick"))
    return sock.groupParticipantsUpdate(jid,[user],"remove");

  if (text.startsWith(".add"))
    return sock.groupParticipantsUpdate(jid,[user],"add");

  if (text.startsWith(".promote"))
    return sock.groupParticipantsUpdate(jid,[user],"promote");

  if (text.startsWith(".demote"))
    return sock.groupParticipantsUpdate(jid,[user],"demote");

  if (text === ".mute")
    return sock.groupSettingUpdate(jid,"announcement");

  if (text === ".unmute")
    return sock.groupSettingUpdate(jid,"not_announcement");
}