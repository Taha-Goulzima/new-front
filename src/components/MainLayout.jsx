import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./SideBar";

function MainLayout({ children }) {
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        <Sidebar />
        <div className="col-12 col-md-10">{children}</div>
      </div>
    </div>
  );
}

export default MainLayout;
