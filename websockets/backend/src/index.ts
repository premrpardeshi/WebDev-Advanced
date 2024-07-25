import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();

app.get("/", (req: any, res: any) => {
  res.send("Hello World!");
});

const httpServer = app.listen(8080, function () {
  console.log(new Date() + " Server is listening on port 8080");
});

const wss = new WebSocketServer({ server: httpServer });

let userCount = 0;
wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  //   is binary defaulted to false as no binary data used
  ws.on("message", function message(data, isBinary) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  console.log(`User ${++userCount} connected!`);
  ws.send("Hello! Message From Server!!");
});
