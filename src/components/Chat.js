
import React, { useState, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Chat = ({ username, selectedUser, messages, addMessage, markMessagesAsRead }) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    markMessagesAsRead(selectedUser);
  }, [selectedUser, markMessagesAsRead]);


  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      addMessage({ id: Math.random().toString(36).substr(2, 9), from: username, to: selectedUser, text: message, time: timestamp }); // Generate a unique ID for each message
      setMessage('');
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      (msg.from === username && msg.to === selectedUser) ||
      (msg.from === selectedUser && msg.to === username)
  );

  return (
    <div className="chat">
      <div className="chat-window">
        {filteredMessages.map((msg, index) => (
          <div key={msg.id} className={`message-container ${msg.from === username ? 'sent' : 'received'}`}>
            <div className="message">
              <div className="message-content">
                <span className='message-chat'>
                  <strong className='font-semibold'>{msg.from} :</strong> {msg.text}
                </span>
                <span className="timestamp">{msg.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="message-form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          required
        />
        <button type="submit" className="send-button">
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default Chat;
