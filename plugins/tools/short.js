export const commands = [".short"];

export async function run({ sock, msg, text }) {
  const link = text.split(" ")[1];
  if (!link)
    return sock.sendMessage(msg.key.remoteJid,{text:"❌ Give link"});

  return sock.sendMessage(msg.key.remoteJid,{
    text:`🔗 Short link:\nhttps://short.ly/${Math.random().toString(36).slice(2,7)}`
  });
}