import FundooLogo from "../Assets/FundooLogo.png";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import { ViewStreamOutlined as ViewStreamOutlinedIcon } from "@mui/icons-material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import "./../Styles/header.scss";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
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
        <h1 className="logo-text">Fundoo Notes</h1>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>

      <RefreshOutlinedIcon
        className="refresh"
        fontSize="medium"
        style={{ cursor: "pointer", color: "#555" }}
      />
      <div className="layout-toggle">
        <ViewStreamOutlinedIcon fontSize="medium" />
      </div>
      <SettingsOutlinedIcon
        className="setting"
        style={{ cursor: "pointer", color: "#555" }}
        fontSize="medium"
      />

      <div className="user-circle"></div>

   
    </header>
  );
};

export default Header;
