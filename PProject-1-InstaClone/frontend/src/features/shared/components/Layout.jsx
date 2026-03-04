import React from "react";
import { Outlet } from "react-router";
import Nav from "./Nav";
import "./Layout.scss";

const Layout = () => {
  return (
    <div className="main-layout">
      <Nav />
      <div className="content-container">
        {/*
        //* The <Outlet /> component from react-router is like a magical "placeholder" or a "window" inside your Layout component. It tells React Router exactly where to render the child pages when you navigate around your app.
        */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
