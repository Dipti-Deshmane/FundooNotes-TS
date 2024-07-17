import React, { ChangeEvent, FormEvent, useState } from 'react';
import './../Styles/login.scss';
import axios from 'axios';
import base_url from "../API/baseUrl";
import { useNavigate } from 'react-router-dom';
import googleLogo from '../Assets/googleLogo.png';

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error message on input change
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

    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "Please enter email.";
    } else if (!validateEmail(email)) {
      emailError = "Invalid email format.";
    }

    if (!password) {
      passwordError = "Please enter password.";
    } else if (!validatePassword(password)) {
      passwordError = "Password should be at least 6 characters long.";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    try {
      const response = await axios.post(`${base_url}/user/login`, loginData);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.id);
        navigate('/dashboard');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      setErrors({ email: "", password: "Invalid credentials. Please try again later." });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="above-form">
          <div className='title'>
            <img src={googleLogo} className='glogo' alt="Google Logo"></img>
            <h2>Login</h2>
            <h4>Use your google account</h4>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                className="login-input"
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={loginData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            <div className="input-group">
              <input
                className="login-input"
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="error-message">{errors.password}</div>}
            </div>
            <div className="forgetBtn">
              <a href="#">Forgot Password?</a>
            </div>
            <div className="links">
              <a href="/signup">Create Account</a>
              <button id="submit-button" type="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
