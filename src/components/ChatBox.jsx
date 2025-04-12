import React, { useEffect, useState } from "react";
import Message from "./Message";

const ChatBox = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() === "") return;

    const newMessage = {
      text: input,
      sender: "user",
      time: new Date().toLocaleTimeString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInput("");

    // Simulate bot reply
    setTimeout(() => {
      const botReply = {
        text: "This is an automated reply.",
        sender: "bot",
        time: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => {
        const finalMessages = [...prev, botReply];
        localStorage.setItem("chatMessages", JSON.stringify(finalMessages));
        return finalMessages;
      });
    }, 1000);
  };

  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="w-full max-w-md bg-white shadow-md rounded-md flex flex-col h-[80vh]">
      <div className="bg-blue-600 text-white p-4 text-center font-semibold">
        Chat UI
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, id) => (
          <Message key={id} {...msg} />
        ))}
      </div>
      <div className="p-4 flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
