"use client";
import { TextInput } from "@repo/ui/TextInput";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleRoomIdChange = (roomId: string) => {
    if (!roomId) return;

    setRoomId(roomId);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 16,
      }}
    >
      <h1>Welcome to Turbo Chat</h1>

      <TextInput
        placeholder="Room Id"
        type="numeric"
        size="lg"
        value={roomId}
        onChange={handleRoomIdChange}
      />

      <button
        style={{
          padding: "10px 20px",
        }}
        onClick={() => {
          if (!roomId) return;
          router.push(`/chat/${roomId}`);
        }}
      >
        Join room
      </button>
    </div>
  );
}
