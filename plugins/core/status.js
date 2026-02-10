export const commands = [
  ".alive",".ping",".uptime",".speed",".runtime",".status"
];

export async function run({ sock, msg, text }) {
  const jid = msg.key.remoteJid;
  if (text === ".alive") return sock.sendMessage(jid,{text:"🤖 Bot Alive"});
  if (text === ".ping") return sock.sendMessage(jid,{text:"🏓 Pong"});
  if (text === ".uptime") return sock.sendMessage(jid,{text:"⏱️ Uptime OK"});
  if (text === ".speed") return sock.sendMessage(jid,{text:"⚡ Speed Stable"});
  if (text === ".runtime") return sock.sendMessage(jid,{text:"🕒 Runtime Normal"});
  if (text === ".status") return sock.sendMessage(jid,{text:"🟢 All systems running"});
}