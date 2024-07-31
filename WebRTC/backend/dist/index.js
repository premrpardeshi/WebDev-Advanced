"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let senderSocket = null;
let receiverSocket = null;
wss.on("connection", (ws) => {
    ws.on("message", (data) => {
        const message = JSON.parse(data);
        if (message.type === "sender") {
            console.log("Sender set");
            senderSocket = ws;
        }
        else if (message.type === "receiver") {
            console.log("Receiver set");
            receiverSocket = ws;
        }
        else if (message.type === "createdOffer") {
            console.log("Offer received");
            receiverSocket === null || receiverSocket === void 0 ? void 0 : receiverSocket.send(JSON.stringify({ type: "createdOffer", offer: message.offer }));
        }
        else if (message.type === "createdAnswer") {
            console.log("Answer received");
            senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "createdAnswer", answer: message.answer }));
        }
        else if (message.type === "addIce") {
            if (ws === senderSocket) {
                receiverSocket === null || receiverSocket === void 0 ? void 0 : receiverSocket.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }));
            }
            else if (ws === receiverSocket) {
                senderSocket === null || senderSocket === void 0 ? void 0 : senderSocket.send(JSON.stringify({ type: "iceCandidate", candidate: message.candidate }));
            }
        }
    });
});
