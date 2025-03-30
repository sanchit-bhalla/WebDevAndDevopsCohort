import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8000 });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data, isBinary) {
    // console.log({ data, isBinary });

    if (data.toString() === "ping") ws.send("Pong");
    else ws.send("come again...");
  });

  ws.send("Persistent connection established with websocket server 🚀");
});
