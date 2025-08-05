import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Stories from './Stories';
import PostForm from './PostForm';
import PostCard from './PostCard';

function FeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      
      <div className="flex max-w-5xl mx-auto mt-4">
        <div className="hidden md:block w-1/4">
          <Sidebar />
        </div>
        <div className="flex-1 p-4">
          <Stories />
          <PostForm />
          {posts.length === 0 ? (
            <p className="text-center text-gray-500">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default FeedPage;
