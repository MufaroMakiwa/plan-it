import React, { Component } from 'react';
import { navigate } from "@reach/router";
import "./SideBar.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { GoogleLogout } from 'react-google-login';


const GOOGLE_CLIENT_ID = "428252784086-go863k9aj8g435320oq90m85ma6odcul.apps.googleusercontent.com";


class SideBar extends Component {
  constructor(props) {
      super(props);
  }


  handleSubmit = (link) => {
    if (link === this.props.link) {
      console.log("Clicked the same tab");
      return;
    }
    navigate(link);
  }


  render() { 
    return ( 
      <div className="SideBar-container">

        <div className="SideBar-nameContainer" onClick={() => this.handleSubmit("/current")}>
          <p className="SideBar-name">PLAN_IT</p>
        </div>      

        <div to="/profile" onClick={() =>this.handleSubmit("/profile")}  className="SideBar-profile">
          <div>          
            <AccountCircleIcon style={{fontSize: 100}} />
            <p className="SideBar-username">Mufaro Makiwa</p>   
          </div>
        </div>
        
        <hr className="SideBar-divider"></hr>

        <ul className="SideBar-menus">
          <li key="current" onClick={() =>this.handleSubmit("/current")}>
            <div className={"/current" === this.props.link ? "SideBar-row selected" : "SideBar-row"}>
              Current
            </div>          
          </li>

          <li key="challenges" onClick={() =>this.handleSubmit("/challenges")}>
            <div className={"/challenges" === this.props.link ? "SideBar-row selected" : "SideBar-row"} >
              <div className="SideBar-buttonLabel">Challenges</div> 
              <span className="SideBar-notifications">2</span>
            </div>
          </li>

          <li key="friends" onClick={() =>this.handleSubmit("/friends")}>
            <div to="/Friends" className={"/friends" === this.props.link ? "SideBar-row selected" : "SideBar-row"} >
              <div className="SideBar-buttonLabel">Friends</div> 
              <span className="SideBar-notifications">2</span>
            </div>
          </li>
          

          <li key="completed" onClick={() =>this.handleSubmit("/completed")}>
            <div to="/completed" className={"/completed" === this.props.link ? "SideBar-row selected" : "SideBar-row"} >
              <div>Completed</div> 
            </div>
          </li>

        </ul> 

        <div className="SideBar-signOutContainer">
          <hr className="SideBar-horizontalLine" />
          <GoogleLogout 
            className="SideBar-button" 
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}/>
        </div>
      
      </div>
    );
  }
}
 
export default SideBar;