import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfilePosts from '../components/profile/ProfilePosts';
import Navbar from '../components/Navbar';

function ProfilePage() {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;

  // Use current user's email as username if no param provided
  const profileUsername = username || currentUser?.email;

  useEffect(() => {
    if (!profileUsername) return;

    // Get user's posts
    const q = query(
      collection(db, 'posts'),
      where('username', '==', profileUsername)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(userPosts);
      
      // For now, create basic user profile from posts or current user
      setUserProfile({
        username: profileUsername,
        email: profileUsername,
        postsCount: userPosts.length,
        followersCount: 0, // TODO: Implement followers system
        followingCount: 0, // TODO: Implement following system
        bio: '', // TODO: Add bio field to user profiles
        profileImage: 'https://via.placeholder.com/150', // TODO: Add profile image upload
      });
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, [profileUsername]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Profile not found</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.email === profileUsername;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto pt-8">
        <ProfileHeader 
          userProfile={userProfile}
          isOwnProfile={isOwnProfile}
        />
        <ProfilePosts 
          posts={posts}
          isOwnProfile={isOwnProfile}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
