import React from "react"
import PropTypes from "prop-types";
function SideMenuLink(props) {
    
return (
  <li className="nav-item">
    <a className="nav-link collapsed" href="/">
      <i className="/fas fa-fw fa-folder"></i>
      <span>{props.action}</span>
    </a>
  </li>
);

}
SideMenuLink.propTypes = {
  action: PropTypes.string,
};

export default SideMenuLink