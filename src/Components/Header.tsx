import React from 'react';
import FundooLogo from '../Assets/FundooLogo.png';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { ViewStreamOutlined as ViewStreamOutlinedIcon } from '@mui/icons-material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import {useEffect, useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import base_url from '../API/baseUrl';

import './../Styles/header.scss';
import { Card } from 'reactstrap';

interface HeaderProps {
  toggleSidebar: () => void;
  pageTitle: string;
  toggleLayoutMode: () => void;
  layoutMode: 'vertical' | 'horizontal';
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, pageTitle , toggleLayoutMode, layoutMode}) => {
  const [showUserCard, setShowUserCard] = useState(false);
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();


  const toggleUserCard = () => {
    setShowUserCard(!showUserCard);
  };    

  const firstInitial = username ? username.charAt(0).toUpperCase() : '';
const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files && event.target.files[0]) {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    try {
      const response = await axios.post(`${base_url}/user/uploadProfileImage?access_token=${token}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setProfilePicture(URL.createObjectURL(event.target.files[0]));
        console.log('Profile picture uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  }
};

const removeProfilePicture = () => {
    setProfilePicture(null);
  };


  const handleLogout = async () => {
    try {
        const response = await axios.post(`${base_url}/user/logout?access_token=${token}`, {}, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        if (response.status === 204) {
            localStorage.removeItem('token');
            navigate('/'); 
            console.log('Logout successful');
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
};  


 
  return (
    <header className="header">
      <div className="mainMenu">
        <button title="Main Menu" onClick={toggleSidebar}>
          <i className="menu">
            <MenuIcon fontSize="medium" />
          </i>
        </button>
      </div>
      <div className="logo-container">
        <img src={FundooLogo} alt="Fundoo Logo" className="logo" />
        <h1 className="logo-text">{pageTitle}</h1>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
      <RefreshOutlinedIcon
        className="refresh"
        fontSize="medium"
        style={{ cursor: 'pointer', color: '#555' }}
      />
      <div className="layout-toggle">
        <ViewStreamOutlinedIcon fontSize="medium" />
      </div>
      <SettingsOutlinedIcon
        className="setting"
        style={{ cursor: 'pointer', color: '#555' }}
        fontSize="medium"
      />
     
      <div className="user-circle" onClick={toggleUserCard}>
        {profilePicture ? (
          <img src={profilePicture} alt="Profile" className="profile-picture" />
        ) : (
          firstInitial
        )}
      </div>

      {showUserCard && (
        <div className="user-card">
          <div className="user-info">
            <p>diptiborke@gmail.com</p>
          </div>
          <div className="profile-button-container">
            <label htmlFor="profile-picture-input" className="profile-picture-label">
              Add Profile Picture
            </label>
            <input
              className="pic"
              type="file"
              accept="image/*"
              id="profile-picture-input"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
          </div>
          <div className="account-sign-out">
            <Link className="account-button" to="/account" style={{ color: "#494949", textDecoration: "none", display: "flex", alignContent: "center" }}>
              Add Account
            </Link>
            <Link className="logout-button" to="/" style={{ color: "#494949", textDecoration: "none", display: "flex", alignContent: "center" }}>
              <LogoutIcon style={{ marginRight: 10 }} />
              Sign Out
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
