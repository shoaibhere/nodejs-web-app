// index.js
import { Client, GatewayIntentBits } from "discord.js";
import fetch from "node-fetch";

// create client with message intent
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// when bot is ready
client.once("ready", () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// listen for messages
client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // ignore bot messages

  // Example: only forward messages starting with "!expense"
  if (message.content.startsWith("!expense")) {
    console.log(`Forwarding: ${message.content}`);

    await fetch("https://n8n.adnantariq.pk/webhook/expense", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    text: message.content,          // 👈 now matches n8n
    user: message.author.username,  // optional, for tracking
  }),
});

  }
});

// login with token (from environment variable)
client.login(
  process.env.BOT_TOKEN,
);

import express from "express";

const app = express();
app.get("/", (req, res) => res.send("Bot is running!"));
app.listen(3000, () => console.log("🌐 Keepalive server on 3000"));
