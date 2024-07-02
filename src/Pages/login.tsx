import React from 'react';
import './../Styles/login.scss';
import backgroungImg from './../Assets/backgroundImg.jpg';



const Login = () => {
    return(
    
      <div className="login-container" >
      <form className="form-box" >
        <h1 className="header-text">Login</h1>
        <div className="email">
          <input
            type="text"
            className='inputlogin'
            id="email"
            name="email"
            placeholder="UserName"
            required
            
          />
        </div>
        <div className="password">
          <input
            type="password"
            id="password"
            className='inputlogin'
            name="password"
            placeholder="Password"
            required
                    
          />
        </div>
        <div >
          <a className='signuplink' href="/">
            Don't have an account? Sign up
          </a>
        </div>
        <button className='loginbutton' type="submit">
          Login
        </button>
      </form>
    </div>
)};
export default Login;