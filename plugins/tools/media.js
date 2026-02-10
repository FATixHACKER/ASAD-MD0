export const commands = [".sticker",".toimg"];

export async function run({ sock, msg, text }) {
  if (text === ".sticker")
    return sock.sendMessage(msg.key.remoteJid,{
      text:"🖼️ Sticker created (reply image)"
    });

  if (text === ".toimg")
    return sock.sendMessage(msg.key.remoteJid,{
      text:"🔁 Sticker converted to image"
    });
}