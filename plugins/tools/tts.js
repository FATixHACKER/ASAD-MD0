import { exec } from "child_process";
import fs from "fs";

export const commands = [".tts"];

export async function run({ sock, msg, text }) {
  const t = text.replace(".tts","").trim();
  if (!t) return;

  exec(`gtts-cli "${t}" --output tts.mp3`, async () => {
    await sock.sendMessage(msg.key.remoteJid,{
      audio: fs.readFileSync("tts.mp3"),
      mimetype:"audio/mpeg",
      ptt:true
    });
    fs.unlinkSync("tts.mp3");
  });
}