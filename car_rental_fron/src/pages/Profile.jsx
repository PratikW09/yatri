import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../api/auth.js';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await getUserProfile();
        setUser(data?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col items-center justify-center h-screen p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">Welcome, {user?.name}!</h2>
      <p className="text-lg">Email: {user?.email}</p>
      <p className="text-lg">Username: {user?.username}</p>
      <p className="text-lg">Phone: {user?.mobile}</p>
      <p className="text-lg">Role: {user?.role}</p>
    </div>
  );
};

export default Profile;
