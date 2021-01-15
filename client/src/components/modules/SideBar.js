import React, { Component } from 'react';
import { navigate } from "@reach/router";
import "./SideBar.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


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
          <button className="SideBar-button" onClick={() => alert("Handle me")}>
            Sign out
          </button>
        </div>
      
      </div>
    );
  }
}
 
export default SideBar;