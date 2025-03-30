import { useEffect, useState } from "react";

function App() {
  const [msg, setMsg] = useState("");
  const [response, setResponse] = useState("");
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setMsg(e.target.value);

  const sendMessage = () => {
    socket?.send(msg);
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

    ws.onerror = console.error;

    ws.onopen = () => {
      console.log("Connection established 🤝");
      ws.send("Hello server!");
    };

    ws.onmessage = (message) => {
      setResponse(message.data);
    };

    setSocket(ws);

    return () => {
      console.log(ws.readyState);
      if (ws.readyState === 1) {
        console.log("Going to close web socket...");
        ws.close();
      }
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: " center",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <h2>ping-pong chat</h2>

      <input
        type="text"
        placeholder="Enter `ping` to get 'pong'"
        onChange={inputHandler}
        value={msg}
      />
      <button onClick={sendMessage}>Send</button>

      <h3>Response: {response}</h3>
    </div>
  );
}

export default App;
