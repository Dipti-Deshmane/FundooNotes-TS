import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import note_icon from '../Assets/note_icon.png';
import reminder_icon from '../Assets/reminder_icon.png';
import archive_icon from '../Assets/archive_icon.png';
import trash_icon from '../Assets/trash_icon.png';
import edit_icon from '../Assets/edit_icon.png';
import './../Styles/sidebar.scss';

interface SidebarProps {
  isClosed: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isClosed }) => {
  const location = useLocation();

  return (
    <div className={`mediasidebar ${isClosed ? 'collapsed' : ''}`}>
      <div className="sidebar">
        <div className="sidebar-options">
          <div className={location.pathname === '/dashboard' ? 'active' : ''}>
            <Link to="/dashboard">
              <img src={note_icon} alt="Note Icon" className="option-icon" />
              {!isClosed && <span>Notes</span>}
            </Link>
          </div>
          <div className={location.pathname === '/Reminder' ? 'active' : ''}>
            <Link to="/Reminder">
              <img src={reminder_icon} alt="Reminder Icon" className="option-icon" />
              {!isClosed && <span>Reminder</span>}
            </Link>
          </div>
          <div className={location.pathname === '/EditLabel' ? 'active' : ''}>
            <Link to="#">
              <img src={edit_icon} alt="Edit Icon" className="option-icon" />
              {!isClosed && <span>Edit Label</span>}
            </Link>
          </div>
          <div className={location.pathname === '/Archive' ? 'active' : ''}>
            <Link to="/Archive">
              <img src={archive_icon} alt="Archive Icon" className="option-icon" />
              {!isClosed && <span>Archive</span>}
            </Link>
          </div>
          <div className={location.pathname === '/Trash' ? 'active' : ''}>
            <Link to="/Trash">
              <img src={trash_icon} alt="Trash Icon" className="option-icon" />
              {!isClosed && <span>Trash</span>}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
