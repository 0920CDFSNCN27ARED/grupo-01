import React from "react";
import SideMenuLink from "./side-menu-links/Side-Menu-Links";
import SideMenuHeader from "./Side-Menu-Header";



function SideMenu() {
  return (
    <div id="wrapper">
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <SideMenuHeader />
        <hr className="sidebar-divider my-0" />
        <li className="nav-item active">
          <a className="nav-link" href="/">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Actions</div>
        <SideMenuLink action="Charts" />
        <SideMenuLink action="Charts" />
        <SideMenuLink action="Tables" />
        <hr className="sidebar-divider d-none d-md-block" />
      </ul>
    </div>
  );
}


export default SideMenu;
