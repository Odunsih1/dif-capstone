import React from 'react';
import './Sidebar.css';

const suggestions = [
  { username: 'sam.codes', image: 'https://via.placeholder.com/40' },
  { username: 'ui.zainab', image: 'https://via.placeholder.com/40' },
  { username: 'dev.chuks', image: 'https://via.placeholder.com/40' },
];

function Sidebar() {
  return (
    <div className="sidebar">
      {/* Logged-in User */}
      <div className="profile">
        <img src="https://via.placeholder.com/50" alt="user" />
        <div>
          <p className="username">abba.dev</p>
          <p className="switch">Switch</p>
        </div>
      </div>

      {/* Suggestions */}
      <div className="suggestions">
        <p className="suggested-title">Suggested for you</p>
        {suggestions.map((user, index) => (
          <div key={index} className="suggestion-item">
            <img src={user.image} alt={user.username} />
            <p>{user.username}</p>
            <button>Follow</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
