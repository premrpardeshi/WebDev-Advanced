import { NextFunction, Request, Response } from "express";
import client from "prom-client";

const activeUserGauge = new client.Gauge({
  name: "active_users",
  help: "Total number users with pending requests",
});

export function activeUserGauger(
  req: Request,
  res: Response,
  next: NextFunction
) {
  activeUserGauge.inc();

  res.on("finish", () => {
    activeUserGauge.dec();
  });

  next();
}
