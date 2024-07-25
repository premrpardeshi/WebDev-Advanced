import express from "express";
import { createClient } from "redis";

const app = express();
app.use(express.json());

const client = createClient();
client.connect();

app.post("/submit", async (req, res) => {
  const { problem, userId, code, language } = await req.body;
  const data = await JSON.stringify({ problem, userId, code, language });

  await client.lPush("submission", data);

  res.json({ message: "Submitted to Redis" });
});

app.listen(3000);
