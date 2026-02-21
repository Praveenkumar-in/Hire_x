// import React, { useState, useRef, useEffect } from "react";
// import axios from "axios";
// import "./AIChat.css";

// const API_URL = import.meta.env.VITE_API_URL;

// const AIChat = () => {
//   const [open, setOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([
//     {
//       sender: "ai",
//       text: "Hi 👋 I'm HireX AI. Ask me about jobs or career tips!"
//     }
//   ]);
//   const [loading, setLoading] = useState(false);

//   const chatEndRef = useRef(null);

//   // Auto scroll
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     const userMsg = { sender: "user", text: message };

//     setMessages(prev => [...prev, userMsg]);
//     setMessage("");
//     setLoading(true);

//     try {
//       const res = await axios.post(`${API_URL}/chat`, {
//         message: userMsg.text
//       });

//       setMessages(prev => [
//         ...prev,
//         { sender: "ai", text: res.data.reply }
//       ]);
//     } catch (err) {
//       setMessages(prev => [
//         ...prev,
//         { sender: "ai", text: "⚠️ AI server error." }
//       ]);
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       {/* Floating Button */}
//       <button className="ai-chat-btn" onClick={() => setOpen(!open)}>
//         🤖
//       </button>

//       {open && (
//         <div className="ai-chat-container">
//           <div className="ai-chat-header">
//             HireX AI Assistant
//             <span className="close-btn" onClick={() => setOpen(false)}>
//               ✕
//             </span>
//           </div>

//           {/* Messages */}
//           <div className="ai-chat-messages">
//             {messages.map((m, i) => (
//               <div
//                 key={i}
//                 className={`message ${m.sender === "user" ? "user" : "ai"}`}
//               >
//                 {m.text}
//               </div>
//             ))}

//             {loading && (
//               <div className="message ai typing">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//             )}

//             <div ref={chatEndRef}></div>
//           </div>

//           {/* Input */}
//           <div className="ai-chat-input">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Ask anything..."
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button onClick={sendMessage}>➤</button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AIChat;
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./AIChat.css";

const API_URL = import.meta.env.VITE_API_URL;

const AIChat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hi 👋 I'm HireX AI. Ask me about jobs, resumes, or career tips!"
    }
  ]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null);

  // auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "user", text: message };

    setMessages(prev => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/chat`, {
        message: userMsg.text
      });

      setMessages(prev => [
        ...prev,
        { sender: "ai", text: res.data.reply }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { sender: "ai", text: "⚠️ AI server error." }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button className="ai-chat-btn" onClick={() => setOpen(!open)}>
        🤖
      </button>

      {open && (
        <div className="ai-chat-container">

          {/* HEADER */}
          <div className="ai-chat-header">
            <span>🤖 HireX AI Assistant</span>
            <span className="close-btn" onClick={() => setOpen(false)}>✕</span>
          </div>

          {/* CHAT MESSAGES */}
          <div className="ai-chat-messages">

            {messages.map((m, i) => (
              <div
                key={i}
                className={`message ${m.sender === "user" ? "user" : "ai"}`}
              >
                {m.sender === "ai" && <span className="avatar">🤖</span>}
                {m.text}
              </div>
            ))}

           {loading && (
  <div className="message ai typing">
    <div className="typing-dot"></div>
    <div className="typing-dot"></div>
    <div className="typing-dot"></div>
  </div>
)}

            <div ref={chatEndRef}></div>
          </div>

          {/* INPUT */}
          <div className="ai-chat-input">
            <input
              type="text"
              placeholder="Ask about jobs, resumes..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={sendMessage}>➤</button>
          </div>

        </div>
      )}
    </>
  );
};

export default AIChat;