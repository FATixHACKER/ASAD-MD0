export const commands = [
  ".ytmp3",".ytmp4",".play",".video",".song"
];

export async function run({ sock, msg }) {
  await sock.sendMessage(msg.key.remoteJid,{
    text:"⬇️ Download processing… (VPS recommended)"
  });
}