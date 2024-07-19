import React, { useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import './../Styles/sidebar.scss';

interface SidebarProps {
  isClosed: boolean;
  setPageTitle: (title: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isClosed, setPageTitle }) => {
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/dashboard':
        setPageTitle('Fundoo Notes');
        break;
      case '/Reminder':
        setPageTitle('Reminder');
        break;
      case '/EditLabel':
        setPageTitle('Edit Label');
        break;
      case '/Archive':
        setPageTitle('Archive');
        break;
      case '/Trash':
        setPageTitle('Trash');
        break;
      default:
        setPageTitle('Fundoo Notes');
    }
  }, [location.pathname, setPageTitle]);

  const handleOptionClick = (title: string) => {
    setPageTitle(title);
  };

  return (
    <div className={`mediasidebar ${isClosed ? 'collapsed' : ''}`}>
      <div className="sidebar">
        <div className="sidebar-options">
          <div className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard" onClick={() => handleOptionClick('Fundoo Notes')}>
              <LightbulbOutlinedIcon fontSize="medium" className="option-icon" />
              {!isClosed && <span>Notes</span>}
            </Link>
          </div>
          <div className={location.pathname === '/Reminder' ? 'active' : ''}>
            <Link to="/Reminder" onClick={() => handleOptionClick('Reminder')}>
              <NotificationsNoneOutlinedIcon fontSize="medium" className="option-icon" />
              {!isClosed && <span>Reminder</span>}
            </Link>
          </div>
          <div className={location.pathname === '/EditLabel' ? 'active' : ''}>
            <Link to="/EditLabel" onClick={() => handleOptionClick('Edit Label')}>
              <EditOutlinedIcon fontSize="medium" className="option-icon" />
              {!isClosed && <span>Edit Label</span>}
            </Link>
          </div>
          <div className={location.pathname === '/Archive' ? 'active' : ''}>
            <Link to="/Archive" onClick={() => handleOptionClick('Archive')}>
              <ArchiveOutlinedIcon fontSize="medium" className="option-icon" />
              {!isClosed && <span>Archive</span>}
            </Link>
          </div>
          <div className={location.pathname === '/Trash' ? 'active' : ''}>
            <Link to="/Trash" onClick={() => handleOptionClick('Trash')}>
              <DeleteOutlineOutlinedIcon fontSize="medium" className="option-icon" />
              {!isClosed && <span>Trash</span>}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
