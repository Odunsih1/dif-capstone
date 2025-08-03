import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    alert('Logged out!');
    navigate('/login');
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#f8f8f8', textAlign: 'center' }}>
      <h3>📸 Instagram</h3>
      {user ? (
        <div>
          <span>Welcome, {user.email}!</span>
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={() => navigate('/login')} style={{ marginRight: '10px' }}>Login</button>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
