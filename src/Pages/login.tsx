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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
          const response = await axios.post(`${base_url}/user/login`, loginData);
          if (response.status === 200) {
            localStorage.setItem('token', response.data.id);
            toast.success("User logged in successfully!", { position: 'top-center' });
            navigate('/Note');
          }
        } catch (error: any) {
          console.error('Login failed:', error);
          toast.error('Invalid Credentials. Please try again later', { position: 'top-center' });
        }
      };

    return (
      <div className="login-container">
        <ToastContainer />
        <form onSubmit={handleSubmit} className="form-box">
          <h1 className="header-text">Login</h1>

          <div className="email">
            <input
              type="text"
              className="inputlogin"
              id="email"
              name="email"
              placeholder="UserName"
              value={loginData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="password">
            <input
              type="password"
              id="password"
              className="inputlogin"
              name="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <a className="signuplink" href="/signup">
              Don't have an account? Sign up
            </a>
          </div>
          <button className="loginbutton" type="submit">
            Login
          </button>
        </form>
      </div>
    );
};

export default Login;
