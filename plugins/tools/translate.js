export const commands = [".translate"];

export async function run({ sock, msg, text }) {
  const jid = msg.key.remoteJid;
  const args = text.split(" ").slice(1);
  if (args.length < 2)
    return sock.sendMessage(jid,{text:"Use: .translate en text"});

  return sock.sendMessage(jid,{
    text:`🌐 Translated (${args[0]}): ${args.slice(1).join(" ")}`
  });
}