import React, { useState, useEffect } from 'react';
import axios from '../api/axiosInstance';

const ProfileUpdate = ({ user }) => {
  const [updatedDetails, setUpdatedDetails] = useState({
    name: user.name,
    email: user.email,
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to update user details
      const response = await axios.put(`/users/${user.id}`, updatedDetails);
      setMessage('Profile updated successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={updatedDetails.name} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={updatedDetails.email} onChange={handleChange} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ProfileUpdate;
