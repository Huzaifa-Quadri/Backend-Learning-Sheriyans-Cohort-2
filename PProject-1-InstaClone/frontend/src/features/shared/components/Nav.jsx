import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import "./Nav.scss";

//This Navbar is made with AI
const Nav = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--sidebar-width",
      isExpanded ? "250px" : "80px",
    );
  }, [isExpanded]);

  return (
    <nav className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="top-section">
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {isExpanded && (
          <NavLink to="/" className="logo">
            InstaClone
          </NavLink>
        )}
      </div>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          end
        >
          <div className="icon-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20Z"></path>
            </svg>
          </div>
          {isExpanded && <span>Home</span>}
        </NavLink>

        <NavLink
          to="/create-post"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <div className="icon-container">
            <svg viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 2v20m10-10H2"
              />
            </svg>
          </div>
          {isExpanded && <span>Create Post</span>}
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
        >
          <div className="icon-container">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            </svg>
          </div>
          {isExpanded && <span>Profile</span>}
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
