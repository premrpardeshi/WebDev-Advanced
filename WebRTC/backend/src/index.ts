import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let senderSocket: null | WebSocket = null;
let receiverSocket: null | WebSocket = null;

wss.on("connection", (ws) => {
  ws.on("message", (data: any) => {
    const message = JSON.parse(data);

    if (message.type === "sender") {
      console.log("Sender set");
      senderSocket = ws;
    } else if (message.type === "receiver") {
      console.log("Receiver set");
      receiverSocket = ws;
    } else if (message.type === "createdOffer") {
      console.log("Offer received");
      receiverSocket?.send(
        JSON.stringify({ type: "createdOffer", offer: message.offer })
      );
    } else if (message.type === "createdAnswer") {
      console.log("Answer received");
      senderSocket?.send(
        JSON.stringify({ type: "createdAnswer", answer: message.answer })
      );
    } else if (message.type === "addIce") {
      if (ws === senderSocket) {
        receiverSocket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: message.candidate })
        );
      } else if (ws === receiverSocket) {
        senderSocket?.send(
          JSON.stringify({ type: "iceCandidate", candidate: message.candidate })
        );
      }
    }
  });
});
