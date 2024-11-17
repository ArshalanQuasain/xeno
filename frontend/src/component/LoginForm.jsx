// src/components/Auth/LoginForm.jsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/api';

const LoginForm = () => {
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const { data } = await api.auth.googleLogin(response.credential);
      localStorage.setItem('authToken', data.token);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={() => alert('Login failed. Please try again.')}
        />
      </div>
    </div>
  );
};

export default LoginForm;
