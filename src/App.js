import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import UserList from './components/UserList';
import './styles.css';
import { FaSignOutAlt } from 'react-icons/fa';

const App = () => {
  const [username, setUsername] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unreadMessages, setUnreadMessages] = useState({});

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
  };

  const markMessagesAsRead = (user) => {
    setUnreadMessages((prev) => {
      const newUnreadMessages = { ...prev };
      delete newUnreadMessages[user];
      return newUnreadMessages;
    });
  };

  const clearMessages = (updatedMessages) => {
    setMessages(updatedMessages);
  };

  const clearChat = (user) => {
    const updatedMessages = messages.map((msg) => {
      if (msg.from === user || msg.to === user) {
        if (msg.from === username) {
          return { ...msg, chatClearedForFromUser: true };
        } else {
          return { ...msg, chatClearedForToUser: true };
        }
      }
      return msg;
    });
    setMessages(updatedMessages);
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
            messages={messages}
            addMessage={addMessage}
            markMessagesAsRead={markMessagesAsRead}
            clearMessages={clearMessages}
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
