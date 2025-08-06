import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileHeader({ userProfile, isOwnProfile }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-6 mb-8 rounded-lg shadow">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Picture */}
        <div className="flex-shrink-0">
          <img 
            src={userProfile.profileImage} 
            alt={userProfile.username}
            className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center md:text-left">
          {/* Username and Edit Button */}
          <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
            <h1 className="text-2xl font-light">{userProfile.username}</h1>
            {isOwnProfile ? (
              <button 
                onClick={() => navigate('/profile/edit')}
                className="px-4 py-1 border border-gray-300 rounded text-sm font-semibold hover:bg-gray-50"
              >
                Edit Profile
              </button>
            ) : (
              <button className="px-4 py-1 bg-blue-500 text-white rounded text-sm font-semibold hover:bg-blue-600">
                Follow
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex justify-center md:justify-start gap-8 mb-4">
            <div className="text-center">
              <span className="font-semibold">{userProfile.postsCount}</span>
              <span className="text-gray-600 ml-1">posts</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">{userProfile.followersCount}</span>
              <span className="text-gray-600 ml-1">followers</span>
            </div>
            <div className="text-center">
              <span className="font-semibold">{userProfile.followingCount}</span>
              <span className="text-gray-600 ml-1">following</span>
            </div>
          </div>

          {/* Bio */}
          {userProfile.bio && (
            <div className="text-sm">
              <p>{userProfile.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
