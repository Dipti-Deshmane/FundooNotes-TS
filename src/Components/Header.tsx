import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from 'react';
import { GridView as GridViewIcon, ViewStreamOutlined as ViewStreamOutlinedIcon } from "@mui/icons-material";
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsRoundedIcon from '@mui/icons-material/AppsRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import base_url from '../API/baseUrl';
import './../Styles/header.scss';
import FundooLogo from '../Assets/FundooLogo.png';

interface HeaderProps {
  toggleSidebar: () => void;
  pageTitle: string;
  toggleLayoutMode: () => void;
  layoutMode: 'vertical' | 'horizontal';
  onSearch: (searchText: string) => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, pageTitle, toggleLayoutMode, layoutMode, onSearch }) => {
  const [showUserCard, setShowUserCard] = useState(false);
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const firstName = localStorage.getItem('firstName');
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(`${email}`);
  }, [email]);

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

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  const handleRefresh = () => {
    window.location.reload();
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
      <div className={`search-container ${showSearchInput ? 'active' : ''}`}>
        <SearchIcon className="search-icon" onClick={() => setShowSearchInput(true)} />
        <input type="text" placeholder="Search..." onChange={handleSearchInputChange} className={`search-input ${showSearchInput ? 'active' : ''}`} />
      </div>
      <div className='spacer'></div>
      <div className='icons'>
        <div onClick={handleRefresh}>
          <RefreshOutlinedIcon
            className="refresh"
            fontSize="medium"
            style={{ cursor: 'pointer', color: '#555' }}
          />
        </div>
        <div className="layout-toggle" onClick={toggleLayoutMode}>
          {layoutMode === "vertical" ? (
            <ViewStreamOutlinedIcon fontSize="medium" style={{ cursor: 'pointer', color: '#555' }} />
          ) : (
            <GridViewIcon fontSize="medium" style={{ cursor: 'pointer', color: '#555' }} />
          )}
        </div>
        <SettingsOutlinedIcon
          className="setting"
          style={{ cursor: 'pointer', color: '#555' }}
          fontSize="medium"
        />
      </div>
      <div className='lastpartOfheader'>
        <AppsRoundedIcon className='squareIcon' style={{ cursor: 'pointer', color: '#555' }}
          fontSize="medium" />
        <div className="user-circle" onClick={toggleUserCard}>
          {profilePicture ? (
            <img src={profilePicture} alt="Profile" className="profile-picture" />
          ) : (
            <span>{firstInitial}</span>
          )}
        </div>
        {showUserCard && (
          <div className="user-card">
            <div className="user-info">
              <p className='username'>{username}</p>
            </div>
            <div className="profile-button-container">
              <label htmlFor="profile-picture-input" className="profile-picture-label">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="profile-picture" />
                ) : (
                  <span className='usernameInitial'> {firstInitial} </span>
                )}
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
            <p className='accName'>Hi, {firstName}!</p>
            <div className="account-actions">
              <button className="add-account-button">Add Account</button>
              <button className="sign-out-button" onClick={handleLogout}>
                <LogoutIcon style={{ marginRight: 5 }} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
