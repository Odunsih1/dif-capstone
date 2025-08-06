import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const suggestions = [
  { username: 'sam.codes', image: 'https://via.placeholder.com/40' },
  { username: 'ui.zainab', image: 'https://via.placeholder.com/40' },
  { username: 'dev.chuks', image: 'https://via.placeholder.com/40' },
];

function Sidebar() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const authUser = auth.currentUser;

  useEffect(() => {
    const loadCurrentUser = async () => {
      if (!authUser) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', authUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentUser({
            username: userData.username || authUser.email?.split('@')[0] || 'user',
            name: userData.name || '',
            profileImage: userData.profileImage || authUser.photoURL || 'https://via.placeholder.com/50'
          });
        } else {
          // Fallback to auth data
          setCurrentUser({
            username: authUser.email?.split('@')[0] || 'user',
            name: authUser.displayName || '',
            profileImage: authUser.photoURL || 'https://via.placeholder.com/50'
          });
        }
      } catch (error) {
        console.error('Error loading current user:', error);
        // Fallback
        setCurrentUser({
          username: authUser.email?.split('@')[0] || 'user',
          name: authUser.displayName || '',
          profileImage: 'https://via.placeholder.com/50'
        });
      }
    };

    if (authUser) {
      loadCurrentUser();
    }
  }, [authUser]);
  return (
    <div className="sidebar">
      {/* Logged-in User - Real Data */}
      <div className="profile">
        <img 
          src={currentUser?.profileImage || 'https://via.placeholder.com/50'} 
          alt="user" 
        />
        <div>
          <p className="username">
            {currentUser?.username || 'loading...'}
          </p>
          <button 
            className="switch"
            onClick={() => navigate('/profile')}
          >
            Switch
          </button>
        </div>
      </div>

      {/* Suggestions - Keep simple for now */}
      <div className="suggestions">
        <p className="suggested-title">Suggested for you</p>
        {suggestions.map((user, index) => (
          <div key={index} className="suggestion-item">
            <img src={user.image} alt={user.username} />
            <p>{user.username}</p>
            <button onClick={() => navigate(`/profile/${user.username}`)}>
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
