const incoming = ["❤️","🔥","😂","😎","✨","👍","💯"];
const self = ["😎","🔥","👑","💪","⚡","🎉","🤘"];
const status = ["❤️","😍","🔥","💯","⚡"];

const pick = a => a[Math.floor(Math.random() * a.length)];

export async function reactIncoming(sock, msg) {
  await sock.sendMessage(msg.key.remoteJid, {
    react: { text: pick(incoming), key: msg.key }
  });
}

export async function reactSelf(sock, msg) {
  await sock.sendMessage(msg.key.remoteJid, {
    react: { text: pick(self), key: msg.key }
  });
}

export async function reactStatus(sock, msg) {
  await sock.sendMessage("status@broadcast", {
    react: { text: pick(status), key: msg.key }
  });
}