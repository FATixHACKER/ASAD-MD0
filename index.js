import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason
} from "@whiskeysockets/baileys";
import P from "pino";
import { handleMessage } from "./handlers/message.js";
import { reactSelf, reactStatus } from "./utils/autoReact.js";

let pairingRequested = false;

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    auth: state,
    logger: P({ level: "silent" }),
    browser: ["PowerBot", "Chrome", "1.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  // 🔑 Pairing Code
  if (!state.creds.registered && !pairingRequested) {
    pairingRequested = true;
    const code = await sock.requestPairingCode("92XXXXXXXXXX");
    console.log("PAIRING CODE:", code);
  }

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg?.message) return;

    // 👀 Status seen + react
    if (msg.key.remoteJid === "status@broadcast") {
      await sock.readMessages([msg.key]);
      await reactStatus(sock, msg);
      return;
    }

    // 😎 React on own messages
    if (msg.key.fromMe) {
      await reactSelf(sock, msg);
      return;
    }

    await handleMessage(sock, msg);
  });

  sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
    if (connection === "open") console.log("✅ Bot Connected");

    if (
      connection === "close" &&
      lastDisconnect?.error?.output?.statusCode !==
        DisconnectReason.loggedOut
    ) {
      startBot();
    }
  });
}

startBot();