import { useEffect, useRef, useState } from "react";
import Message from "./components/Message";
import SendIcon from "./icons/SendIcon";

function App() {
  const roomId = "test";
  const [msg, setMsg] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const socket = useRef<WebSocket | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setMsg(e.target.value);

  const sendMessage = () => {
    if (socket.current && msg) {
      socket.current?.send(
        JSON.stringify({
          type: "chat",
          payload: {
            roomId,
            text: msg,
          },
        })
      );

      setMsg("");
    }
  };

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onerror = console.error;

    ws.onmessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message.data]);
    };

    ws.onopen = () => {
      // connect with room `test`
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId,
          },
        })
      );

      socket.current = ws;
    };

    return () => {
      if (ws.readyState === 1) ws.close();
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-[url(./images/bg.jpg)] bg-center">
      <div className="h-full max-h-screen max-w-3xl m-auto  flex flex-col justify-between p-4 gap-4 ">
        <div className="py-4 shrink overflow-y-auto">
          {messages.map((msg) => (
            <Message key={msg} text={msg} />
          ))}
        </div>

        <footer className="px-4  rounded-xl relative">
          <input
            type="text"
            placeholder="Type message..."
            className="w-full p-4 pr-14 text-white flex-1 bg-slate-800 rounded-xl focus:border focus:border-slate-500 focus:outline-hidden shadow-2xl"
            value={msg}
            onChange={handleChange}
          />
          <div
            className="absolute right-8 top-[50%] -translate-y-[50%] cursor-pointer"
            onClick={sendMessage}
          >
            <SendIcon color="white" />
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
