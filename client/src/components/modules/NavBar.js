import React, { Component } from 'react'
import "./NavBar.css";
import '../../utilities.css';
import MenuIcon from '@material-ui/icons/Menu';
import { navigate } from "@reach/router";
import SideBar from "./SideBar.js";

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isDisplayingSideBar : false
    }
  }

  handleLogoClick = () => {
    if (window.location.pathname !== "/current") {
      navigate("/current");
    }
  }

  openSideBar = () => {
    this.setState({
      isDisplayingSideBar : true
    })
  }
  
  render() { 
    return (  
      <div className="NavBar-container top_bar">
        
        {this.state.isDisplayingSideBar && <SideBar displayAsDrawer={true} />};

        <div className="NavBar-nameContainer" onClick={this.handleLogoClick}></div>
        <div className="NavBar-navIconContainer">
          <MenuIcon fontSize="large" className="NavBar-icon" onClick={this.openSideBar}/>
        </div>

      </div>
    );
  }
}
 
export default NavBar;