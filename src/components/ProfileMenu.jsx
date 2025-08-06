import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { 
  MdArchive, 
  MdBarChart, 
  MdCropFree, 
  MdBookmarkBorder, 
  MdStars, 
  MdPersonAdd, 
  MdSettings 
} from 'react-icons/md';
import { FaFacebookSquare } from 'react-icons/fa';

function ProfileMenu({ isOpen, onClose }) {
  const [userProfile, setUserProfile] = useState(null);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const loadUserProfile = async () => {
      if (!currentUser) return;
      
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserProfile({
            username: userData.username || currentUser.email?.split('@')[0] || 'user',
            name: userData.name || '',
            followersCount: userData.followersCount || 0,
            followingCount: userData.followingCount || 0,
            profileImage: userData.profileImage || null
          });
        } else {
          // Fallback to basic user data
          setUserProfile({
            username: currentUser.email?.split('@')[0] || 'user',
            name: currentUser.displayName || '',
            followersCount: 0,
            followingCount: 0,
            profileImage: currentUser.photoURL || null
          });
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
        // Fallback
        setUserProfile({
          username: currentUser.email?.split('@')[0] || 'user',
          name: currentUser.displayName || '',
          followersCount: 0,
          followingCount: 0,
          profileImage: currentUser.photoURL || null
        });
      }
    };

    if (isOpen && currentUser) {
      loadUserProfile();
    }
  }, [isOpen, currentUser]);
  if (!isOpen || !currentUser) return null;

  const menuItems = [
    {
      icon: <MdArchive size={20} />,
      label: "Archive",
      onClick: () => console.log('Archive clicked')
    },
    {
      icon: <MdBarChart size={20} />,
      label: "Your Activity",
      onClick: () => console.log('Your Activity clicked')
    },
    {
      icon: <MdCropFree size={20} />,
      label: "Nametag", 
      onClick: () => console.log('Nametag clicked')
    },
    {
      icon: <MdBookmarkBorder size={20} />,
      label: "Saved",
      onClick: () => console.log('Saved clicked')
    },
    {
      icon: <MdStars size={20} />,
      label: "Close Friends",
      onClick: () => console.log('Close Friends clicked')
    },
    {
      icon: <MdPersonAdd size={20} />,
      label: "Discover People",
      onClick: () => console.log('Discover People clicked')
    },
    {
      icon: <FaFacebookSquare size={20} />,
      label: "Open Facebook",
      onClick: () => console.log('Open Facebook clicked')
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Menu Slide-out - Mobile: 251x812 */}
      <div 
        className="fixed top-0 right-0 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out"
        style={{ width: '251px' }}
      >
        {/* Header with username */}
        <div className="px-4 py-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3 overflow-hidden">
              {userProfile?.profileImage ? (
                <img 
                  src={userProfile.profileImage} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
              )}
            </div>
            <div>
              <p className="font-medium text-gray-900">
                @{userProfile?.username || 'loading...'}
              </p>
              <div className="flex text-sm text-gray-600 mt-1">
                <span className="mr-4">{userProfile?.followingCount || 0} Following</span>
                <span>{userProfile?.followersCount || 0} Followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="w-full px-4 py-3 flex items-center text-left hover:bg-gray-50"
            >
              <span className="text-gray-700 mr-3">{item.icon}</span>
              <span className="text-gray-900 font-normal text-base">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Settings at bottom */}
        <div className="absolute bottom-6 left-4 right-4">
          <button className="w-full px-4 py-3 flex items-center text-left border-t border-gray-200 pt-4">
            <span className="text-gray-700 mr-3"><MdSettings size={20} /></span>
            <span className="text-gray-900 font-normal text-base">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
} 

export default ProfileMenu;
