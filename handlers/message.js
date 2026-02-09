import fs from "fs";
import { antiLink } from "../utils/antiLink.js";
import { antiBadword } from "../utils/antiBadword.js";
import { reactIncoming } from "../utils/autoReact.js";

const plugins = [];

for (const folder of fs.readdirSync("./plugins")) {
  for (const file of fs.readdirSync(`./plugins/${folder}`)) {
    plugins.push(import(`../plugins/${folder}/${file}`));
  }
}

export async function handleMessage(sock, msg) {
  const jid = msg.key.remoteJid;
  const text =
    msg.message.conversation ||
    msg.message.extendedTextMessage?.text ||
    "";

  const isGroup = jid.endsWith("@g.us");

  if (isGroup) {
    if (await antiLink(sock, msg, text)) return;
    if (await antiBadword(sock, msg, text)) return;
  }

  // ❤️ react on incoming
  await reactIncoming(sock, msg);

  for (const p of plugins) {
    const plugin = await p;
    if (plugin.commands?.some(c => text.startsWith(c))) {
      await plugin.run({ sock, msg, text });
    }
  }
}
