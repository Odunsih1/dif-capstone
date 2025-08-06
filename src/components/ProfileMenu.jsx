import React from 'react';

function ProfileMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  const menuItems = [
    {
      label: "Archive",
      onClick: () => console.log('Archive clicked')
    },
    {
      label: "Your Activity",
      onClick: () => console.log('Your Activity clicked')
    },
    {
      label: "Nametag", 
      onClick: () => console.log('Nametag clicked')
    },
    {
      label: "Saved",
      onClick: () => console.log('Saved clicked')
    },
    {
      label: "Close Friends",
      onClick: () => console.log('Close Friends clicked')
    },
    {
      label: "Discover People",
      onClick: () => console.log('Discover People clicked')
    },
    {
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
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center mr-3">
              <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
            </div>
            <div>
              <p className="font-medium text-gray-900">@hasanov.</p>
              <div className="flex text-sm text-gray-600 mt-1">
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
              className="w-full px-4 py-3 flex items-center text-left hover:bg-gray-50"
            >
              <span className="text-gray-900 font-normal text-base">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Settings at bottom */}
        <div className="absolute bottom-6 left-4 right-4">
          <button className="w-full px-4 py-3 flex items-center text-left border-t border-gray-200 pt-4">
            <span className="text-gray-900 font-normal text-base">Settings</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProfileMenu;
