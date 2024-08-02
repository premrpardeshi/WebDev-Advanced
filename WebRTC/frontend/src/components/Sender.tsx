import React, { useEffect, useState } from "react";

function Sender() {
  const [socket, setSocket] = useState<null | WebSocket>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setSocket(socket);
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "sender" }));
    };
  }, []);

  async function startSendingVideo() {
    const pc = new RTCPeerConnection();
    pc.onnegotiationneeded = async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket?.send(JSON.stringify({ type: "createdOffer", offer }));
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket?.send(
          JSON.stringify({ type: "addIce", candidate: event.candidate })
        );
      }
    };

    if (!socket) {
      alert("NULL SOCKET");
      return;
    }
    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "createdAnswer") {
        console.log(message.answer);
        await pc.setRemoteDescription(message.answer);
      } else if (message.type === "iceCandidate") {
        // console.log("Sender Candidates: ", message.candidate);
        await pc.addIceCandidate(message.candidate);
      }
    };

    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false,
    });
    pc.addTrack(stream.getVideoTracks()[0]);
  }

  return (
    <div>
      Sender
      <button onClick={startSendingVideo}>Send Video</button>
    </div>
  );
}

export default Sender;
