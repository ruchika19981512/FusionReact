// import React, { useState, useEffect, useRef } from 'react';
// import { FaPaperPlane, FaEllipsisV } from 'react-icons/fa';

// const Chat = ({ username, selectedUser, messages, addMessage, markMessagesAsRead }) => {
//   const [message, setMessage] = useState('');
//   const [showMenuForIndex, setShowMenuForIndex] = useState(null);
//   const optionsMenuRef = useRef(null);

//   useEffect(() => {
//     markMessagesAsRead(selectedUser);
//   }, [selectedUser, markMessagesAsRead]);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {
//         setShowMenuForIndex(null);
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (message) {
//       const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//       addMessage({ from: username, to: selectedUser, text: message, time: timestamp });
//       setMessage('');
//     }
//   };

//   const handleMenuClick = (index) => {
//     setShowMenuForIndex(index === showMenuForIndex ? null : index);
//   };

//   const handleDeleteMessage = (messageIndex, deleteForEveryone = false) => {
//     // Implement deletion logic here
//     // Example: You might call a function passed as a prop to handle deletion
//     // addMessage function can be used to handle deletion of messages
//     console.log(`Deleting message ${messageIndex} (deleteForEveryone: ${deleteForEveryone})`);
//     setShowMenuForIndex(null); // Close menu after action
//   };

//   const filteredMessages = messages.filter(
//     (msg) =>
//       (msg.from === username && msg.to === selectedUser) ||
//       (msg.from === selectedUser && msg.to === username)
//   );

//   return (
//     <div className="chat">
//       <div className="chat-window">
//         {filteredMessages.map((msg, index) => (
//           <div key={index} className={`message-container ${msg.from === username ? 'sent' : 'received'}`}>
//             <div className="message">
//               <div className="message-content">
//                 <span className='message-chat'>
//                   <strong className='font-semibold'>{msg.from} :</strong> {msg.text}
//                 </span>
//                 <span className="timestamp">{msg.time}
//                   {/* {msg.from === username && (
//                     <div className="message-options">
//                       <button className="menu-button" onClick={() => handleMenuClick(index)}>
//                         <FaEllipsisV />
//                       </button>
//                       {showMenuForIndex === index && (
//                         <div ref={optionsMenuRef} className="options-menu">
//                           <button onClick={() => handleDeleteMessage(index)}>Delete for me</button>
//                           <button onClick={() => handleDeleteMessage(index, true)}>Delete for everyone</button>
//                         </div>
//                       )}
//                     </div>
//                   )} */}
//                 </span>

//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit} className="message-form">
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message"
//           required
//         />
//         <button type="submit" className="send-button">
//           <FaPaperPlane />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Chat;
import React, { useState, useEffect, useRef } from 'react';
import { FaPaperPlane, FaEllipsisV } from 'react-icons/fa';

const Chat = ({ username, selectedUser, messages, addMessage, markMessagesAsRead }) => {
  const [message, setMessage] = useState('');
  const [showMenuForIndex, setShowMenuForIndex] = useState(null);
  const optionsMenuRef = useRef(null);

  useEffect(() => {
    markMessagesAsRead(selectedUser);
  }, [selectedUser, markMessagesAsRead]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (optionsMenuRef.current && !optionsMenuRef.current.contains(event.target)) {
        setShowMenuForIndex(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message) {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      addMessage({ id: Math.random().toString(36).substr(2, 9), from: username, to: selectedUser, text: message, time: timestamp }); // Generate a unique ID for each message
      setMessage('');
    }
  };

  const handleMenuClick = (index) => {
    setShowMenuForIndex(index === showMenuForIndex ? null : index);
  };

  const handleDeleteMessage = (messageId) => {
    // Implement deletion logic here
    // Example: You might call a function passed as a prop to handle deletion
    // addMessage function can be used to handle deletion of messages
    console.log(`Deleting message ${messageId}`);
    setShowMenuForIndex(null); // Close menu after action
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
                  {msg.from === username && (
                    <div className="message-options">
                      <button className="menu-button" onClick={() => handleMenuClick(msg.id)}>
                        <FaEllipsisV />
                      </button>
                      {showMenuForIndex === msg.id && (
                        <div ref={optionsMenuRef} className="options-menu">
                          <button onClick={() => handleDeleteMessage(msg.id)}>Delete for me</button>
                          {/* Add logic to allow deletion for everyone */}
                          {/* <button onClick={() => handleDeleteMessage(msg.id, true)}>Delete for everyone</button> */}
                        </div>
                      )}
                    </div>
                  )}
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
