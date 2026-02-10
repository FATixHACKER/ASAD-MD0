export const commands = [
  ".tiktok",".insta",".fb",".media",".thumb"
];

export async function run({ sock, msg }) {
  await sock.sendMessage(msg.key.remoteJid,{
    text:"📥 Fetching media… (VPS recommended)"
  });
}