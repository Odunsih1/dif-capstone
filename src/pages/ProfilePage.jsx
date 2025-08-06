import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
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

    const loadProfileData = async () => {
      // Get user's posts
      const q = query(
        collection(db, 'posts'),
        where('username', '==', profileUsername)
      );

      const unsubscribe = onSnapshot(q, async (snapshot) => {
        const userPosts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(userPosts);
        
        // Try to load user profile from Firestore
        try {
          // Find user by email/username
          let userData = null;
          
          if (currentUser && currentUser.email === profileUsername) {
            // For current user, load from users collection by UID
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists()) {
              userData = userDoc.data();
            }
          }
          
          // Create user profile with Firestore data or fallback to basic data
          setUserProfile({
            username: userData?.username || profileUsername,
            email: userData?.email || profileUsername,
            name: userData?.name || '',
            bio: userData?.bio || '',
            website: userData?.website || '',
            postsCount: userPosts.length,
            followersCount: userData?.followersCount || 0,
            followingCount: userData?.followingCount || 0,
            profileImage: userData?.profileImage || 'https://via.placeholder.com/150',
          });
        } catch (error) {
          console.error('Error loading user profile:', error);
          // Fallback to basic profile
          setUserProfile({
            username: profileUsername,
            email: profileUsername,
            postsCount: userPosts.length,
            followersCount: 0,
            followingCount: 0,
            bio: '',
            profileImage: 'https://via.placeholder.com/150',
          });
        }
        
        setLoading(false);
      });

      return () => unsubscribe();
    };

    loadProfileData();
  }, [profileUsername, currentUser]);

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
