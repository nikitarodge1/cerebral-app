import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/api';
import AuthContext from '../context/AuthContext';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (isRegister) {
        response = await api.register(formData);
      } else {
        response = await api.login(formData);
      }
      login(response.token, response.user);
      toast.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-purple-700 text-white flex-col justify-center items-start p-10 relative">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/src/assets/auth-bg.png')" }}></div>
        <div className="relative z-10">
          <img  src="" alt="" width={256} height={57} className="mb-6" />
          <h1 className="text-4xl font-thin max-w-lg mt-4">
            Salesway AI Assistant
          </h1>
          <p className="text-lg mt-2 max-w-md">
            Supercharge Your Distribution using our AI assistant!
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full lg:w-1/2 bg-gray-100 justify-center items-center p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700">Welcome to SalesWay</h2>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            {isRegister && (
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
              />
            )}
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              placeholder="Name"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Password"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex justify-end text-sm text-purple-600">
              <a href="#">Forgot password?</a>
            </div>
            <button 
              type="submit" 
              className="w-full p-3 bg-purple-700 text-white rounded-md flex justify-center items-center transition hover:bg-purple-800"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
              ) : (
                isRegister ? 'Register' : 'Login'
              )}
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600 text-center">
            {isRegister ? "Already have an account?" : "Don’t have an account?"}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="ml-2 text-purple-600 font-semibold"
            >
              {isRegister ? 'Login' : 'Create Account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
