import React, { useEffect, useState } from "react";

function Receiver() {
  const [socket, setSocket] = useState<null | WebSocket>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setSocket(socket);
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "receiver" }));
    };

    const pc = new RTCPeerConnection();

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "createdOffer") {
        await pc.setRemoteDescription(message.offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.send(JSON.stringify({ type: "createdAnswer", answer }));

        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socket?.send(
              JSON.stringify({
                type: "addIce",
                candidate: event.candidate,
              })
            );
          }
        };
      } else if (message.type === "iceCandidate") {
        if (!pc) return;
        await pc.addIceCandidate(message.candidate);
      }
    };

    pc.ontrack = async (event) => {
      const video = document.createElement("video");
      video.setAttribute("autoplay", "true");
      video.setAttribute("muted", "muted");
      document.body.appendChild(video);
      video.srcObject = new MediaStream([event.track]);
      video.play();
    };
  }, []);

  return <div>Receiver</div>;
}

export default Receiver;
