import fs from "fs";

export const command = ".menu";

export async function run({ sock, msg }) {
  await sock.sendMessage(msg.key.remoteJid, {
    image: fs.readFileSync(
      new URL("../../media/menu.jpg", import.meta.url)
    ),
    caption: `
⚡ POWER BOT ⚡

.alive   .ping   .pair
.tts     .sticker
.ytmp3   .tiktok
.kick    .tagall

🛡️ Anti-Link • Anti-Badword
👀 Auto Status Seen
❤️ Auto React
`
  });
}