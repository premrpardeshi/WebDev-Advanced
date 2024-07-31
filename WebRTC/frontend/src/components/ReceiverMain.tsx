import React, { useEffect, useState } from "react";

function Receiver() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  let pc: null | RTCPeerConnection = null;

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setSocket(socket);
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: "receiver" }));
    };

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "createdOffer") {
        pc = new RTCPeerConnection();

        await pc.setRemoteDescription(message.offer);
        const answer = await pc.createAnswer();
        console.log(answer);
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
        // console.log("Receiver Candidates: ",message.candidate)
        await pc.addIceCandidate(message.candidate);
      }
    };

    // pc.ontrack = (event) => {
    //   console.log("in");
    //   const video = document.createElement("video");
    //   document.body.appendChild(video);
    //   video.srcObject = new MediaStream([event.track]);
    //   video.play();
    // };
  }, []);

  return <div>Receiver</div>;
}

export default Receiver;
