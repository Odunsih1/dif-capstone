import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

function PostForm() {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handlePost = async (e) => {
    e.preventDefault();
    if (!caption) return alert('Caption is required');

    try {
      await addDoc(collection(db, 'posts'), {
        caption,
        imageUrl,
        username: auth.currentUser.email,
        createdAt: serverTimestamp(),
        likes: [],
      });
      setCaption('');
      setImageUrl('');
      alert('Post uploaded!');
    } catch (error) {
      alert('Error uploading post: ' + error.message);
    }
  };

  return (
    <form onSubmit={handlePost} className="bg-white p-4 rounded shadow mb-6">
      <h3 className="font-bold mb-2">Create a Post</h3>
      <input
        type="text"
        placeholder="Caption"
        className="w-full p-2 border mb-2"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        className="w-full p-2 border mb-2"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Post
      </button>
    </form>
  );
}

export default PostForm;
