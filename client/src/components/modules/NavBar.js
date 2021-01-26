import React, { Component } from 'react'
import "./NavBar.css";
import '../../utilities.css';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { navigate } from "@reach/router";
import SideBar from "./SideBar.js";
import Profile_Icon_1 from "../../public/Profile_Icon_1.png";
import Profile_Icon_2 from "../../public/Profile_Icon_2.png";

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

    } else if (this.state.isDisplayingSideBar) {
      this.setState({
        isDisplayingSideBar: false
      })
    }
  }

  toggleSideBar = () => {
    this.setState(prevState =>({
      isDisplayingSideBar: !prevState.isDisplayingSideBar
    }))
  }
  
  render() { 
    return (  
      <div className="NavBar-container top_bar">

        {this.state.isDisplayingSideBar && 
          <div className="NavBar-dim_background" onClick={this.toggleSideBar}></div>
        }
        
        {this.state.isDisplayingSideBar && 
          <div>
            <SideBar 
              link={this.props.link}
              displayAsDrawer={true} 
              userName={this.props.userName}
              handleLogout={this.props.handleLogout}/>
          </div>    
       }
       

        <div className="NavBar-nameContainer" onClick={this.handleLogoClick}></div>

        <div className="NavBar-navIconContainer">
          {!this.state.isDisplayingSideBar && (
            <MenuIcon style={{fontSize: 30}} className="NavBar-icon" onClick={this.toggleSideBar}/>
          )}

          {this.state.isDisplayingSideBar && (
            <CloseIcon style={{fontSize: 30}} className="NavBar-icon" onClick={this.toggleSideBar}/>
          )}

        </div>

      </div>
    );
  }
}
 
export default NavBar;