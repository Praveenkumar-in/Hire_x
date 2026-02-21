import React, { useState } from "react";
import { sendMessage } from "../api/chatApi";


const AIChat = () => {

  const [messages, setMessages] = useState([
    { sender: "ai", text: "👋 Hi! I'm HireX AI. Ask anything about jobs." }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);

    setInput("");
    setLoading(true);

    try {
      const data = await sendMessage(input);
   console.log(input)
      const aiMsg = {
        sender: "ai",
        text: data.reply || "No response"
      };

      setMessages(prev => [...prev, aiMsg]);

    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "⚠️ AI server error" }
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="ai-wrapper">

      <div className="chat-card">

        <h2 className="chat-title">🤖 HireX AI Assistant</h2>

        <div className="chat-body">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.sender}`}>
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="msg ai typing">
              <span></span><span></span><span></span>
            </div>
          )}
        </div>

        <div className="chat-input-area">
          <input
            value={input}
            onChange={(e)=>setInput(e.target.value)}
            placeholder="Ask about jobs, resume tips..."
          />

          <button onClick={handleSend}>
            Send
          </button>
        </div>

      </div>

    </div>
  );
};

export default AIChat;