import React from 'react';
import './../Styles/signup.scss';


const SignUp = () => {
        return (
        <div className="signup-container">
            <form className="signupform-box">

                <h1 className="header-text">Sign Up</h1>

                <div className="fullname">
                    <input type="text"  id="firstName" className='inputSignup firstname'
                        name="firstName" placeholder="FirstName"                      
                        required />
                    <input type="text"  id="lastName" className='inputSignup firstname'
                        name="lastName" placeholder="LastName"
                        required />
                </div>
               
                <div className="email">
                    <input type="text" id="email" className='inputSignup'
                        name="email" placeholder="Email"
                        required />
                </div>
                <div className="password">
                    <input type="password" id="password" className='inputSignup'
                        name="password" placeholder="Password"
                        required />
                </div>
                <div className="cnfpassword">
                    <input type="password" id="confirmpassword" className='inputSignup'
                        name="confirmpassword" placeholder="Confirm Password"
                        required />
                </div>

                <div>
                    <a className="alreadyAcc" href="/">Already have an account? Login</a>
                </div>
                <button className="signupbutton" type="submit">Sign Up</button>

            </form>


        </div>
    );
}

export default SignUp;
