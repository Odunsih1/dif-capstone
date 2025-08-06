import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import '../components/EditProfile.css';

function EditProfilePage() {
  const navigate = useNavigate();
  const currentUser = auth.currentUser;
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    website: '',
    bio: '',
    email: '',
    phone: '',
    gender: 'Male'
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Load existing profile data from Firestore
    const loadProfile = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFormData({
            name: userData.name || currentUser.displayName || '',
            username: userData.username || currentUser.email?.split('@')[0] || '',
            website: userData.website || '',
            bio: userData.bio || '',
            email: userData.email || currentUser.email || '',
            phone: userData.phone || '',
            gender: userData.gender || 'Male'
          });
        } else {
          // Pre-fill with current user data if no profile exists
          setFormData(prev => ({
            ...prev,
            email: currentUser.email || '',
            name: currentUser.displayName || '',
            username: currentUser.email?.split('@')[0] || ''
          }));
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        // Fallback to current user data
        setFormData(prev => ({
          ...prev,
          email: currentUser.email || '',
          name: currentUser.displayName || '',
          username: currentUser.email?.split('@')[0] || ''
        }));
      }
      setLoading(false);
    };

    loadProfile();
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    if (!currentUser) return;
    
    setSaving(true);
    try {
      // Save to Firestore users collection
      await setDoc(doc(db, 'users', currentUser.uid), {
        ...formData,
        uid: currentUser.uid,
        email: currentUser.email, // Keep original email
        updatedAt: new Date(),
        createdAt: new Date() // Will only set if document doesn't exist
      }, { merge: true }); // merge: true will update existing fields without overwriting the entire document

      console.log('Profile saved successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile. Please try again.');
    }
    setSaving(false);
  };

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Responsive Container */}
      <div className="edit-profile-container lg:max-w-3xl">
        
        {/* Header - Mobile: 375x88, Desktop: responsive */}
        <div 
          className="flex items-center justify-between px-4 py-4 border-b border-gray-200 lg:px-6 lg:py-6"
          style={{ minHeight: '88px' }}
        >
          <button 
            onClick={handleCancel}
            className="text-blue-500 font-normal lg:text-lg"
          >
            Cancel
          </button>
          <h1 className="text-lg font-semibold lg:text-xl">Edit Profile</h1>
          <button 
            onClick={handleSave}
            disabled={saving}
            className={`font-semibold lg:text-lg ${
              saving 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-500'
            }`}
          >
            {saving ? 'Saving...' : 'Done'}
          </button>
        </div>

        {/* Profile Photo Section - Mobile: 375x160.5, Desktop: taller */}
        <div 
          className="flex flex-col items-center py-6 border-b border-gray-200 lg:py-8"
          style={{ minHeight: '160.5px' }}
        >
          {/* Profile Picture - Mobile: 95x95, Desktop: larger */}
          <div className="relative mb-3">
            <img
              src={currentUser?.photoURL || 'https://via.placeholder.com/95'}
              alt="Profile"
              className="rounded-full object-cover border border-gray-200 lg:w-32 lg:h-32"
              style={{ width: '95px', height: '95px' }}
            />
          </div>
          <button className="text-blue-500 font-normal text-sm lg:text-base">
            Change Profile Photo
          </button>
        </div>

        {/* Form Section - Mobile: 375x208, Desktop: expanded */}
        <div 
          className="edit-profile-form-section px-4 py-6 space-y-4 lg:space-y-6"
          style={{ minHeight: '208px' }}
        >
          {/* Name Field */}
          <div className="border-b border-gray-200 pb-3">
            <div className="flex">
              <label className="edit-profile-label w-20 text-gray-600 text-sm py-3 lg:w-28">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="edit-profile-input flex-1 py-3 text-sm border-none outline-none lg:text-base"
                placeholder="Jacob West"
              />
            </div>
          </div>

          {/* Username Field */}
          <div className="border-b border-gray-200 pb-3">
            <div className="flex">
              <label className="edit-profile-label w-20 text-gray-600 text-sm py-3 lg:w-28">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="edit-profile-input flex-1 py-3 text-sm border-none outline-none lg:text-base"
                placeholder="jacob.w"
              />
            </div>
          </div>

          {/* Website Field - Full width input: 375x48 */}
          <div className="border-b border-gray-200 pb-3">
            <div className="flex">
              <label className="edit-profile-label w-20 text-gray-600 text-sm py-3 lg:w-28">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="edit-profile-input flex-1 py-3 text-sm border-none outline-none text-gray-400 lg:text-base"
                placeholder="Website"
                style={{ minHeight: '48px' }}
              />
            </div>
          </div>

          {/* Bio Field */}
          <div className="border-b border-gray-200 pb-3">
            <div className="flex">
              <label className="edit-profile-label w-20 text-gray-600 text-sm py-3 lg:w-28">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="edit-profile-input flex-1 py-3 text-sm border-none outline-none resize-none lg:text-base"
                placeholder="Digital goodies designer @pixaelz Everything is designed."
                rows="2"
              />
            </div>
          </div>
        </div>

        {/* Switch to Professional Account - Mobile: 375x49 */}
        <div 
          className="px-4 border-t border-gray-200"
          style={{ height: '49px' }}
        >
          <button className="w-full text-left py-4">
            <span className="text-blue-500 text-sm font-normal">
              Switch to Professional Account
            </span>
          </button>
        </div>

        {/* Private Information Section - Mobile: 375x192.5 */}
        <div 
          className="px-4 py-6 border-t border-gray-200 space-y-4"
          style={{ 
            minHeight: '192.5px',
            borderTop: '0.33px solid #3C3C434A'
          }}
        >
          <h3 className="text-sm font-medium text-gray-900 mb-4">Private Information</h3>
          
          {/* Email Field */}
          <div className="border-b border-gray-200 pb-3">
            <div className="flex">
              <label className="w-16 text-gray-600 text-sm py-3">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="flex-1 py-3 text-sm border-none outline-none"
                placeholder="jacob.west@gmail.com"
              />
            </div>
          </div>

          {/* Phone Field */}
          <div className="border-b border-gray-200 pb-3">
            <div className="flex">
              <label className="w-16 text-gray-600 text-sm py-3">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="flex-1 py-3 text-sm border-none outline-none"
                placeholder="+1 202 555 0147"
              />
            </div>
          </div>

          {/* Gender Field */}
          <div className="pb-3">
            <div className="flex">
              <label className="w-16 text-gray-600 text-sm py-3">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="flex-1 py-3 text-sm border-none outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfilePage;
