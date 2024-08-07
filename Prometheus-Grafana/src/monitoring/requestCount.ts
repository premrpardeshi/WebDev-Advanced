import { NextFunction, Request, Response } from "express";
import client from "prom-client";

const requestCount = new client.Counter({
  name: "request_count",
  help: "Total request count",
  labelNames: ["method", "route", "status_code"],
});

export function requestCounter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const start = Date.now();

  res.on("finish", () => {
    const end = Date.now();
    const time = end - start;
    console.log("It took " + time + " ms.");

    requestCount.inc({
      method: req.method,
      route: req.path,
      status_code: res.statusCode,
    });
  });

  next();
}
