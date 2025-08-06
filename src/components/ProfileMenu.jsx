import React, { useState } from 'react';

function ProfileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  const menuItems = [
    {
      icon: "📁",
      label: "Archive",
      onClick: () => console.log('Archive clicked')
    },
    {
      icon: "📈", 
      label: "Your Activity",
      onClick: () => console.log('Your Activity clicked')
    },
    {
      icon: "🏷️",
      label: "Nametag", 
      onClick: () => console.log('Nametag clicked')
    },
    {
      icon: "🔖",
      label: "Saved",
      onClick: () => console.log('Saved clicked')
    },
    {
      icon: "👥",
      label: "Close Friends",
      onClick: () => console.log('Close Friends clicked')
    },
    {
      icon: "👤",
      label: "Discover People",
      onClick: () => console.log('Discover People clicked')
    },
    {
      icon: "📘",
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
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold mr-3">
              @
            </div>
            <div>
              <p className="font-semibold text-gray-900">@hasanov.</p>
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-4">162 Following</span>
                <span>162 Followers</span>
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
              className="w-full px-4 py-4 flex items-center text-left hover:bg-gray-50 transition-colors duration-150"
            >
              <span className="mr-4 text-xl">{item.icon}</span>
              <span className="text-gray-900 font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Settings at bottom */}
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full px-4 py-3 flex items-center text-left border-t border-gray-200 pt-4">
            <span className="mr-4 text-xl">⚙️</span>
            <span className="text-gray-900 font-medium">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileMenu;
