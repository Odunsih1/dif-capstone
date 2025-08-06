import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileHeader({ userProfile, isOwnProfile }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white mb-6" style={{ width: '348px', height: '157px', margin: '0 auto' }}>
      <div className="flex items-start gap-4 p-4">
        {/* Profile Picture - 96x96 */}
        <div className="flex-shrink-0" style={{ marginTop: '0px', marginLeft: '0px' }}>
          <img 
            src={userProfile.profileImage} 
            alt={userProfile.username}
            className="rounded-full object-cover border border-gray-200"
            style={{ width: '96px', height: '96px' }}
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 pt-2">
          {/* Username and Edit Button */}
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-lg font-normal">{userProfile.username}</h1>
            {isOwnProfile ? (
              <button 
                onClick={() => navigate('/profile/edit')}
                className="px-3 py-1 border border-gray-300 rounded text-xs font-medium hover:bg-gray-50"
              >
                Edit Profile
              </button>
            ) : (
              <button className="px-3 py-1 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600">
                Follow
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="flex gap-6 mb-3">
            <div>
              <span className="font-semibold text-sm">{userProfile.postsCount}</span>
              <span className="text-gray-600 text-xs ml-1">posts</span>
            </div>
            <div>
              <span className="font-semibold text-sm">{userProfile.followersCount}</span>
              <span className="text-gray-600 text-xs ml-1">followers</span>
            </div>
            <div>
              <span className="font-semibold text-sm">{userProfile.followingCount}</span>
              <span className="text-gray-600 text-xs ml-1">following</span>
            </div>
          </div>

          {/* Bio */}
          {userProfile.bio && (
            <div className="text-xs">
              <p>{userProfile.bio}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
