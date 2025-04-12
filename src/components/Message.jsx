import React from "react";

const Message = ({ text, sender, time }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`rounded-lg px-4 py-2 max-w-xs break-words ${
          isUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
        }`}
      >
        <p>{text}</p>
        <p className="text-xs mt-1 text-right text-gray-500">{time}</p>
      </div>
    </div>
  );
};

export default Message;
