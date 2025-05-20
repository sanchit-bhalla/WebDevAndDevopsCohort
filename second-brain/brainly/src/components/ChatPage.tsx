import React, { useState } from "react";
import ChatFooter from "./ChatFooter";
import Logo from "./Logo";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
import { BACKEND_HOST } from "../constants";

interface Message {
  id: number;
  sender: "user" | "bot";
  text: string;
}

const initialMessages: Message[] = [
  { id: 1, sender: "user", text: "Hello!" },
  { id: 2, sender: "bot", text: "Hi there! How can I assist you?" },
  { id: 3, sender: "user", text: "Tell me a joke!" },
  {
    id: 4,
    sender: "bot",
    text: "Sure! Why don’t skeletons fight each other? Because they don’t have the guts!",
  },
  { id: 5, sender: "user", text: "Hello!" },
  { id: 6, sender: "bot", text: "Hi there! How can I assist you?" },
  { id: 7, sender: "user", text: "Tell me a joke!" },
  {
    id: 8,
    sender: "bot",
    text: "Sure! Why don’t skeletons fight each other? Because they don’t have the guts!",
  },
  { id: 9, sender: "user", text: "Hello!" },
  { id: 10, sender: "bot", text: "Hi there! How can I assist you?" },
  { id: 11, sender: "user", text: "Tell me a joke!" },
  {
    id: 12,
    sender: "bot",
    text: "Sure! Why don’t skeletons fight each other? Because they don’t have the guts!",
  },
];

const ChatPage: React.FC = () => {
  const axios = useAxios();

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();

  const handleAskQuery = async () => {
    try {
      setLoading(true);
      setError("");

      await axios({
        url: `${BACKEND_HOST}/api/v1/chat/?prompt=${query}`,
        method: "GET",
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
      setError("Could not get the response for the query");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen bg-slate-100 bg-img pt-24 overflow-y-auto flex justify-center">
      <div className="p-4 fixed top-0 left-0 right-0  bg-slate-50">
        <Logo />
      </div>

      {!messages || messages?.length === 0 ? (
        <div className="w-full max-w-4xl flex items-center text-center -mt-24">
          <h1 className="w-full text-5xl text-gradient font-semibold leading-14">
            {`Hi ${
              user?.username?.toUpperCase() || "BUDDY"
            }, what should we dive into today?`}
          </h1>
        </div>
      ) : (
        <div className="border border-red-500 w-full max-w-4xl">
          {/* {initialMessages.map((msg) => (
          <div className="w-[70%] p-4 rounded-2xl bg-white mb-4">
            <h3 className="text-xl">{msg.text}</h3>
            <p>{msg.sender}</p>
          </div>
        ))} */}
        </div>
      )}

      <ChatFooter
        handleAskQuery={handleAskQuery}
        setQuery={setQuery}
        query={query}
        loading={loading}
      />
    </div>
  );
};

export default ChatPage;
