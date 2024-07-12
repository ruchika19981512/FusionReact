import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import UserList from './components/UserList';
import './styles.css';
import { FaSignOutAlt } from 'react-icons/fa';

const App = () => {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});
  const [clearedChats, setClearedChats] = useState(new Set());

  // Load clearedChats from localStorage on initial load
  useEffect(() => {
    const storedClearedChats = localStorage.getItem('clearedChats');
    if (storedClearedChats) {
      setClearedChats(new Set(JSON.parse(storedClearedChats)));
    }
  }, []);

  // Update visibleMessages whenever messages or clearedChats change
  useEffect(() => {
    const filteredMessages = messages.filter(
      (message) =>
        !clearedChats.has(message.id) // Assuming message.id uniquely identifies each message
    );
    setVisibleMessages(filteredMessages);
  }, [messages, clearedChats]);

  // Save clearedChats to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('clearedChats', JSON.stringify(Array.from(clearedChats)));
  }, [clearedChats]);

  const addMessage = (message) => {
    setMessages([...messages, message]);

    if (message.to !== username) {
      setUnreadMessages((prev) => ({
        ...prev,
        [message.to]: (prev[message.to] || 0) + 1,
      }));
    }
  };

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const handleLogout = () => {
    setUsername('');
    setSelectedUser(null);
    setUnreadMessages({});
    setClearedChats(new Set());
  };

  const markMessagesAsRead = (user) => {
    setUnreadMessages((prev) => {
      const newUnreadMessages = { ...prev };
      delete newUnreadMessages[user];
      return newUnreadMessages;
    });
  };

  const clearChat = (user) => {
    // Mark all messages with the user as cleared
    const messagesToClear = messages.filter(
      (message) => message.from === user || message.to === user
    );

    const updatedClearedChats = new Set(clearedChats);
    messagesToClear.forEach((message) => {
      updatedClearedChats.add(message.id); // Assuming message.id uniquely identifies each message
    });
    setClearedChats(updatedClearedChats);

    // If the current selected user is the one being cleared, reset the selection
    if (selectedUser === user) {
      setSelectedUser(null);
    }
  };

  if (!username) {
    return (
      <Login
        users={users}
        addUser={addUser}
        setUsername={(name) => {
          setUsername(name);
          setSelectedUser(null);
          setUnreadMessages({});
          setClearedChats(new Set());
        }}
      />
    );
  }

  const filteredUsers = users.filter((user) => user.username !== username);

  return (
    <div className="app">
      <div className="sidebar">
        <div className="current-user">
          <div className="profile-info">
            <div className="profile-icon">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="username">
              Logged in as : <strong>{username}</strong>
            </div>
          </div>
          <div className="logout-button" onClick={handleLogout}>
            <FaSignOutAlt className="logout-icon" />
          </div>
        </div>
        <UserList
          users={filteredUsers}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          unreadMessages={unreadMessages}
          clearChat={clearChat}
        />
      </div>
      <div className="main">
        {selectedUser ? (
          <Chat
            username={username}
            selectedUser={selectedUser}
            messages={visibleMessages.filter(
              (message) =>
                (message.from === username || message.to === username)
            )}
            addMessage={addMessage}
            markMessagesAsRead={markMessagesAsRead}
          />
        ) : (
          <div className="chat-placeholder">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
