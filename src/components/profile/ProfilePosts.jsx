import React from 'react';
import PostCard from '../PostCard';

function ProfilePosts({ posts, isOwnProfile }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {isOwnProfile ? 'Share Photos' : 'No Posts Yet'}
        </h3>
        <p className="text-gray-500">
          {isOwnProfile ? 'When you share photos, they will appear on your profile.' : 'When this user shares photos, they will appear here.'}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Posts Grid - Instagram Style */}
      <div className="grid grid-cols-3 gap-1 p-1">
        {posts.map((post) => (
          <div key={post.id} className="aspect-square bg-gray-100 rounded overflow-hidden group cursor-pointer">
            {post.imageUrl ? (
              <div className="relative h-full">
                <img 
                  src={post.imageUrl} 
                  alt={post.caption}
                  className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                />
                {/* Hover overlay with likes count */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center text-white">
                    <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">{post.likes?.length || 0}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full bg-gray-200 flex items-center justify-center">
                <div className="text-center text-gray-500 p-4">
                  <p className="text-xs font-medium truncate">{post.caption}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Alternative: List View (uncomment if preferred) */}
      {/* <div className="space-y-4 p-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div> */}
    </div>
  );
}

export default ProfilePosts;
