import React, { Component } from 'react'
import "./NavBar.css";
import '../../utilities.css';
import MenuIcon from '@material-ui/icons/Menu';

class NavBar extends Component {
  
  render() { 
    return (  
      <div className="NavBar-container top_bar">
        <div className="NavBar-nameContainer"></div>
        <div className="NavBar-navIconContainer">
          <MenuIcon fontSize="large" className="NavBar-icon"/>
        </div>

      </div>
    );
  }
}
 
export default NavBar;