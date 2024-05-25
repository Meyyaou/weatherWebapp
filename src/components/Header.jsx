import React, { useState } from "react";
import logo from "../assets/bluetooth_avec_noir-removebg.png";
import { useDate } from "./UseDate.jsx";
import "./Header.css";
import user from "../assets/User Menu.json";
import Lottie from "react-lottie";

function Header({ navigateTo }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: user,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { date, time } = useDate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAccountClick = () => {
    navigateTo("account");
  };

  const handleLogout = () => {
    navigateTo("login");
    setMenuOpen(false);
  };

  const handleAbout = () => {
    navigateTo("about");
    setMenuOpen(false);
  };

  const handleHome = () => {
    navigateTo("mainpage");
    setMenuOpen(false);
  };

  const handleContact = () => {
    navigateTo("contact");
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <header className="nav">
        <div className="nav-logo">
          <img title="Taksentina" src={logo} alt="Logo" />
          <a href="#" title="Taksentina" className="nav-name">
            Taksantina
          </a>
        </div>
        <div className="nav-time-date">
          <div className="nav-time">{time}</div>
          <div className="nav-date">{date}</div>
        </div>
        <div className={`nav-link ${menuOpen ? "open" : ""}`}>
          <a className="nav-link1" onClick={handleHome}>
            Home
          </a>
          <a title="About" className="nav-link2" onClick={handleAbout}>
            About
          </a>
          <a className="nav-link3" href="#" onClick={handleContact}>
            Contact
          </a>
          <div className="nav-menu">
            <a
              title="Account"
              className="nav-account"
              onClick={handleAccountClick}
            >
              {menuOpen ? (
                "Account"
              ) : (
                <Lottie
                  style={{
                    height: "43px",
                    width: "43px",
                    marginTop: "0px",
                    marginRight: "13px",
                    cursor: "pointer"
                  }}
                  options={defaultOptions}
                />
              )}
            </a>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
      </header>
    </div>
  );
}

export default Header;
