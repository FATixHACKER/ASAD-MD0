export const commands = [".pair"];

export async function run({ sock, msg }) {
  const code = await sock.requestPairingCode("92XXXXXXXXXX");
  await sock.sendMessage(msg.key.remoteJid,{
    text:`🔑 Pairing Code:\n${code}`
  });
}