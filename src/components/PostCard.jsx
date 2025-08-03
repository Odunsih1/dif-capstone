import React, { useEffect, useState } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, 'posts', post.id), (docSnap) => {
      const data = docSnap.data();
      const likes = data?.likes || [];
      setLikesCount(likes.length);
      setLiked(userId ? likes.includes(userId) : false);
    });

    return () => unsubscribe();
  }, [post.id, userId]);

  const toggleLike = async () => {
    const postRef = doc(db, 'posts', post.id);
    if (!userId) return alert('Login first to like posts.');

    await updateDoc(postRef, {
      likes: liked ? arrayRemove(userId) : arrayUnion(userId),
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <p className="text-sm font-semibold text-gray-800">{post.username}</p>
      <p className="mb-2">{post.caption}</p>
      {post.imageUrl && (
        <img src={post.imageUrl} alt="Post" className="w-full h-auto rounded mb-2" />
      )}
      <div className="flex items-center gap-2">
        <button onClick={toggleLike}>
          {liked ? (
            <AiFillHeart className="text-red-500 text-xl" />
          ) : (
            <AiOutlineHeart className="text-gray-600 text-xl" />
          )}
        </button>
        <span className="text-sm text-gray-600">{likesCount} likes</span>
      </div>
    </div>
  );
}

export default PostCard;
