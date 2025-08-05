import React from 'react';
import './Stories.css';

const dummyStories = [
  { username: 'abba.dev', image: 'https://via.placeholder.com/60' },
  { username: 'saliu.tech', image: 'https://via.placeholder.com/60' },
  { username: 'zainab_ui', image: 'https://via.placeholder.com/60' },
  { username: 'jay.codes', image: 'https://via.placeholder.com/60' },
  { username: 'nerdzfactory', image: 'https://via.placeholder.com/60' },
];

function Stories() {
  return (
    <div className="stories-container">
      {dummyStories.map((story, index) => (
        <div key={index} className="story">
          <img src={story.image} alt={story.username} />
          <p>{story.username}</p>
        </div>
      ))}
    </div>
  );
}

export default Stories;
