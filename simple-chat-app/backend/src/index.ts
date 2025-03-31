import { WebSocket, WebSocketServer } from "ws";

interface JoinMessage {
  type: "join";
  payload: {
    roomId: string;
  };
}

interface ChatMessage {
  type: "chat";
  payload: {
    roomId: string;
    text: string;
  };
}

type Message = JoinMessage | ChatMessage;

const wss = new WebSocketServer({ port: 8080 });

const rooms = new Map<string, Set<WebSocket>>();

wss.on("connection", (socket) => {
  socket.on("message", (data) => {
    const message: Message = JSON.parse(data.toString());
    const roomId = message.payload.roomId;

    if (message.type === "join") {
      if (!rooms.has(roomId)) {
        rooms.set(roomId, new Set());
      }

      rooms.get(roomId)?.add(socket);

      socket.send(`User has successfully joined the room: ${roomId}`);
    } else if (message.type === "chat") {
      // If room not present
      if (!rooms.has(roomId)) {
        socket.send("Invalid room!");
      } else {
        // If user not part of room
        const roomSockets = rooms.get(roomId);
        if (!roomSockets?.has(socket)) {
          socket.send("User isn't not part of this room");
        } else {
          roomSockets.forEach((socketObj) =>
            socketObj.send(message.payload.text)
          );
        }
      }
    }
  });

  socket.on("close", () => {
    // close socket from all rooms
    rooms.forEach((clients, roomId) => {
      clients.delete(socket);

      // Optional: delete room if empty
      if (clients.size === 0) rooms.delete(roomId);
    });

    console.log("Socket disconnected and removed from all rooms");
  });
});
