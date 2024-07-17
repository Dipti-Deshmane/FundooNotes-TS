import React, { ChangeEvent, FormEvent, useState } from 'react';
import './../Styles/signup.scss';
import axios from 'axios';
import base_url from "../API/baseUrl";
import register from "./../Assets/register.png";
import googleLogo from '../Assets/googleLogo.png';

interface RegisterState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    service: string;
    confirmPassword: string;
    apiError?: string; // Add the apiError property
}

const SignUp = () => {
    const [formData, setFormData] = useState<RegisterState>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        service: "advance",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<Partial<RegisterState>>({});

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password: string) => {
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: "" }); // Clear errors on change
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { firstName, lastName, email, password, confirmPassword } = formData;

        let validationErrors: Partial<RegisterState> = {};

        if (firstName.trim() === '') {
            validationErrors.firstName = 'Please enter your first name.';
        }
        if (lastName.trim() === '') {
            validationErrors.lastName = 'Please enter your last name.';
        }
        if (!validateEmail(email)) {
            validationErrors.email = 'Please enter a valid email address.';
        }
        if (!validatePassword(password)) {
            validationErrors.password = 'Please enter a valid password (Minimum 8 characters with a mix of letters, numbers & symbols).';
        }
        if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Confirm password does not match.';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post(`${base_url}/user/userSignUp`, formData);
            console.log("token", response);
            // Add your success handling here (e.g., redirect to a different page)
        } catch (error: any) {
            console.error("Error:", error.message);
            setErrors({ apiError: error.message });
        }
    };

    return (
        <div className="register-container">
            <div className="form-container">
                <div className='form-content'>
                <img src={googleLogo} className='glogo' alt="Google Logo"></img>
            
                    <h1>Create your Account</h1>
                    <form className='loginForm' onSubmit={handleSubmit}>
                        <div className="name-container">
                            <div className="input-groupsignup">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                {errors.firstName && <small className="error">{errors.firstName}</small>}
                            </div>
                            <div className="input-groupsignup">
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                                {errors.lastName && <small className="error">{errors.lastName}</small>}
                            </div>
                        </div>
                        <div className="input-groupsignup">
                            <input
                                type="text"
                                name="email"
                                className='input-email'
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <small className="error">{errors.email}</small>}
                            <small style={{ color:'#777'}}>You can use letters, numbers & periods</small>
                        </div>
                        <div className="name-container">
                            <div className="input-groupsignup">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {errors.password && <small className="error">{errors.password}</small>}
                            </div>
                            <div className="input-groupsignup">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && <small className="error">{errors.confirmPassword}</small>}
                            </div>
                        </div>
                        <small style={{ color:'#777'}}>Use 8 or more characters with a mix of letters, numbers & symbols</small>
                        <div className="show-password">
                            <input type="checkbox" name="showPassword" onChange={toggleShowPassword} />
                            <label style={{ fontSize: 15, color: '#28282B' }}>Show Password</label>
                        </div>

                        <div className="linkssignup">
                       
                        <a href="/">Sign in instead</a>
                        {errors.apiError && <small className="error">{errors.apiError}</small>}
                        <button className='' type="submit">Next</button>
            </div>

                
                    </form>
                </div>
                <div className="image-container">
                    <img src={register} alt="Google Account Illustration" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
