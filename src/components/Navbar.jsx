import React, { useState } from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

function Navbar() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    alert('Logged out!');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div style={{ padding: '10px', backgroundColor: '#f8f8f8', textAlign: 'center' }}>
        <h3>📸 Instagram</h3>
        {user ? (
          <div>
            <span>Welcome, {user.email}!</span>
            <button onClick={() => navigate('/profile')} style={{ marginLeft: '10px' }}>Profile</button>
            <button onClick={toggleMenu} style={{ marginLeft: '10px' }}>Menu</button>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>Logout</button>
          </div>
        ) : (
          <div>
            <button onClick={() => navigate('/login')} style={{ marginRight: '10px' }}>Login</button>
            <button onClick={() => navigate('/signup')}>Sign Up</button>
          </div>
        )}
      </div>
      
      {/* Profile Menu */}
      <ProfileMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
      />
    </>
  );
}

export default Navbar;
