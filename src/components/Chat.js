import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Chat({ onExitChat }) {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
    document.body.classList.add('chatting-background');
    return () => {
      document.body.classList.remove('chatting-background');
    };
  }, []);

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = { type: 'user', text: message };
      setChatHistory([...chatHistory, userMessage]);
      setMessage('');
      setLoading(true);

      try {
        const response = await axios.post('https://i4xit3cmvb.execute-api.us-east-2.amazonaws.com/prod/chat', {
          question: message,
          history: chatHistory.map((msg) => msg.text),
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        //console.log(response)
        const body = response.data.body;
        const parsedData = JSON.parse(body); // Parse the JSON string in 'body'
        const replyMessage = parsedData.reply; // Extract the 'reply' field
        console.log(replyMessage); // Log the reply to check

        const botReply = {
          type: 'bot',
          text: replyMessage,
        };

        setChatHistory([...chatHistory, userMessage, botReply]);
      } catch (error) {
        console.error('Error sending message to the backend:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="chat-message typing-indicator">
            AI is typing...
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </div>
        )}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything about harshit..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
