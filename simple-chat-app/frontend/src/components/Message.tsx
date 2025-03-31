import React from "react";

interface Message {
  text: string;
}

const Message: React.FC<Message> = ({ text }) => {
  return (
    <p className="bg-slate-800 text-white py-2 px-4 rounded-lg max-w-3xs w-fit mb-4">
      {text}
    </p>
  );
};

export default Message;
