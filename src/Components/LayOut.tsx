// Layout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar';
import './../Styles/dashboard.scss';
const Layout: React.FC = () => {
  const [isMenuSidebar, setSidebarMenu] = useState<boolean>(false);
  const [pageTitle, setPageTitle] = useState('');
  const [layoutMode, setLayoutMode] = useState<'horizontal' | 'vertical'>('horizontal');
  const [searchText, setSearchText] = useState('');
  const toggleMenubar = () => {
    setSidebarMenu(!isMenuSidebar);
  };

  const toggleLayoutMode = () => {
    setLayoutMode(layoutMode === 'horizontal' ? 'vertical' : 'horizontal');
  };




  return (
    <div className='layout'>
      <Header
        toggleSidebar={toggleMenubar}
        pageTitle={pageTitle}
        toggleLayoutMode={toggleLayoutMode}
        layoutMode={layoutMode}
        onSearch={setSearchText}
      />

      <div className='main'>
        <Sidebar isClosed={isMenuSidebar} setPageTitle={setPageTitle} />
        <div className={`content ${isMenuSidebar ? 'shifted' : ''} ${layoutMode}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
