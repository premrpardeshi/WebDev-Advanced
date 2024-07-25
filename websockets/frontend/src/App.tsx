import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [sendmessage, setSendMessage] = useState("");
  const [received, setReceived] = useState<any>("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send("Hello Server!");
      setSocket(newSocket);
    };
    newSocket.onmessage = (message) => {
      setReceived(message.data);
      console.log("Message received:", message.data);
    };

    return () => newSocket.close();
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="Chat"
        onChange={(e) => {
          setSendMessage(e.target.value);
        }}
      />
      <button onClick={() => socket?.send(sendmessage)}>Send</button>
      <div>{received}</div>
    </>
  );
}

export default App;
