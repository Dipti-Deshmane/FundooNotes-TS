import React, { ChangeEvent, FormEvent, useState } from 'react';
import './../Styles/login.scss';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import base_url from "../API/baseUrl";
import { useNavigate } from 'react-router-dom';

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = loginData;

    if (!validateEmail(email)) {
      toast.error('Invalid email format.', { position: 'top-center' });
      return;
    }

    if (!validatePassword(password)) {
      toast.error('Password should be at least 6 characters long.', { position: 'top-center' });
      return;
    }

    try {
      const response = await axios.post(`${base_url}/user/login`, loginData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.id);
        toast.success("User logged in successfully!", { position: 'top-center' });
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      toast.error('Invalid Credentials. Please try again later', { position: 'top-center' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="above-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input className="login-input" type="text" id="email" name="email" placeholder="Enter your email" value={loginData.email} onChange={handleChange} required />
            </div>
            <div className="input-group">
              <input className="login-input" type="password" id="password" name="password" placeholder="Enter your password" value={loginData.password} onChange={handleChange} required />
            </div>
            <div className="links">
              <a href="#">Forgot Password?</a>
              <a href="/signup">Create Account</a>
            </div>
            <button id="submit-button" type="submit">Login</button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
