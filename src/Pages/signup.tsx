import React, { ChangeEvent, FormEvent, useState } from 'react';
import './../Styles/signup.scss';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import base_url from "../API/baseUrl";

interface RegisterState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    service: string;
    confirmPassword: string;
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
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const { firstName, lastName, email, password, confirmPassword } = formData;

        try {
            if (firstName.trim() === '') {
                toast.error('Please enter your first name.', { position: 'top-center' });
                return;
            }
            if (lastName.trim() === '') {
                toast.error('Please enter your last name.', { position: 'top-center' });
                return;
            }
            if (!validateEmail(email)) {
                toast.error('Please enter a valid email address.', { position: 'top-center'});
                return;
            }
            if (!validatePassword(password)) {
                toast.error('Please enter a valid password (Minimum 8 characters with a mix of letters, numbers & symbols).', { position: 'top-center' });
                return;
            }
            if (password !== confirmPassword) {
                toast.error('Confirm password does not match. Please enter the same password in both fields.', { position: 'top-center' });
                return;
            }
            console.log("formData", formData);
            const response = await axios.post(`${base_url}/user/userSignUp`, formData);
            console.log("token", response);
            toast.success("User registered!", { position: "top-center" });
        } catch (error: any) {
            console.error("Error:", error.message);
            toast.error(error.message, { position: 'top-center' });
        }
    };

    return (
        <div className="signup-container">
            <ToastContainer />
            <form className="signupform-box" onSubmit={handleSubmit}>

                <h1 className="header-text">Sign Up</h1>

                <div className="fullname">
                    <input type="text" id="firstName" className='inputSignup firstname'
                        name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange}
                        required />
                    <input type="text" id="lastName" className='inputSignup firstname'
                        name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange}
                        required />
                </div>

                <div className="email">
                    <input type="text" id="email" className='inputSignup'
                        name="email" placeholder="Email" value={formData.email} onChange={handleChange}
                        required />
                </div>
                <div className="password">
                    <input type={showPassword ? "text" : "password"} id="password" className='inputSignup'
                        name="password" placeholder="Password" value={formData.password} onChange={handleChange}
                        required />
                </div>
                <div className="cnfpassword">
                    <input type={showPassword ? "text" : "password"} id="confirmPassword" className='inputSignup'
                        name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange}
                        required />
                </div>

                <div>
                    <a className="alreadyAcc" href="/login">Already have an account? Login</a>
                </div>
                <button className="signupbutton" type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
