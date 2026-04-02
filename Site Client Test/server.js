const express = require("express");
const webpush = require("web-push");

const app = express();
app.use(express.json());

const subscriptions = [];

// clés VAPID
const vapidKeys = {
  publicKey: "TA_PUBLIC_KEY",
  privateKey: "TA_PRIVATE_KEY",
};

webpush.setVapidDetails(
  "mailto:test@test.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);

// enregistrer abonnements
app.post("/subscribe", (req, res) => {
  const { subscription, ownerId } = req.body;

  subscriptions.push({
    ownerId: ownerId,
    sub: subscription,
  });

  res.sendStatus(201);
});

// envoyer notification
app.post("/notify", async (req, res) => {
  const { ownerId, title, body, url } = req.body;

  const payload = JSON.stringify({
    title,
    body,
    url,
  });

  // 🔥 filtrer seulement les abonnés de CE client
  const userSubs = subscriptions.filter((s) => s.ownerId === ownerId);

  await Promise.all(
    userSubs.map((s) => webpush.sendNotification(s.sub, payload)),
  );

  res.send("Notification envoyée");
});

app.listen(3000, () => console.log("Server running"));
