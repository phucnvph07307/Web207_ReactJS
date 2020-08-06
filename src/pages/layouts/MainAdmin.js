import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import Topbar from "../../components/Admin/TopBar";
import Footer from "../../components/Admin/Footer";
export default ({ children }) => {
  return (
    <div>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <Topbar />
            <div className="container-fluid">{children}</div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
