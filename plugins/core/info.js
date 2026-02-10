export const commands = [
  ".menu",".help",".rules",".owner",".botinfo"
];

export async function run({ sock, msg, text }) {
  const jid = msg.key.remoteJid;

  if (text === ".menu")
    return sock.sendMessage(jid,{text:`PASTE_HEAVY_MENU_HERE`});

  if (text === ".help")
    return sock.sendMessage(jid,{text:"Use .menu to see all commands"});

  if (text === ".rules")
    return sock.sendMessage(jid,{text:"🚫 No links • No abuse"});

  if (text === ".owner")
    return sock.sendMessage(jid,{text:"👑 Owner: JANI"});

  if (text === ".botinfo")
    return sock.sendMessage(jid,{text:"Power Bot • Plugin Based"});
}