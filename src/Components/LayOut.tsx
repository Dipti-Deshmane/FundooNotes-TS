// Layout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import './../Styles/dashboard.scss';
const Layout: React.FC = () => {
  const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState('');
  const [layoutMode, setLayoutMode] = useState<'vertical' | 'horizontal'>('vertical');
  const [searchText, setSearchText] = useState('');
  
  
  const toggleMenubar = () => {
    setSidebarMenu(!isMenuSidebar);
  };

  const toggleLayoutMode = () => {
    console.log("layout changed")
    setLayoutMode(layoutMode === 'vertical' ? 'horizontal' : 'vertical');
  };




  return (
    <div className="note-dashboard">
    <div className="App">
      <div className="main">
    <div className='layout'>
      <Header
        toggleSidebar={toggleMenubar}
        pageTitle={pageTitle}
        toggleLayoutMode={toggleLayoutMode}
        layoutMode={layoutMode}
        onSearch={setSearchText}
      />
 <div className="containerr">
        <Sidebar isClosed={isMenuSidebar} setPageTitle={setPageTitle} />
        <div className={`notes-container ${isMenuSidebar ? 'shifted' : ''}`} >
          <Outlet context={{ layoutMode, toggleLayoutMode, searchText }}  />
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
  );
};

export default Layout;
