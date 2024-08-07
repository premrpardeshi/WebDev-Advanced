import express from "express";
import { NextFunction, Request, Response } from "express";
import client from "prom-client";
import { requestCounter } from "./monitoring/requestCount";
import { activeUserGauger } from "./monitoring/requestGauge";
import { histogrammer } from "./monitoring/histogram";

const app = express();

app.use(express.json());
app.use(requestCounter);
app.use(activeUserGauger);
app.use(histogrammer);

app.get("/user", (req, res) => {
  res.json({ name: "Prem" });
});

app.get("/metrics", async (req, res) => {
  const metrics = await client.register.metrics();
  res.set("Content-Type", client.register.contentType);
  res.end(metrics);
});

app.post("/user", (req, res) => {
  res.json({ name: "Prem" });
});

app.listen(3000, () => {
  console.log("Listening...");
});
