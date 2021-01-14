import { Link } from '@reach/router';
import React, { Component } from 'react';
import { sideBarMenus } from "./SideBarMenus.js";
import "./SideBar.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


class SideBar extends Component {
  constructor(props) {
      super(props);
  }


  componentDidMount() {
    this.setState ({
      selected: window.location.pathname
    })
  }


  componentDidUpdate() {
    window.onpopstate = (e) => {
      this.updateSelected(window.location.pathname)
    }
  }


  updateSelected = (link) => {
    if (link === this.state.selected) {
      console.log("Clicked the same tab");
      return;
    }
    this.setState({
      selected: link
    })
    console.log(link);
  }


  render() { 
    return ( 
      <div className="SideBar-container">

        <Link to="/" className="SideBar-nameContainer" onClick={() =>this.updateSelected("/")} >
          <div className="SideBar-nameContainer">
            <p className="SideBar-name">PLAN_IT</p>
          </div>
        </Link>

        <Link to="/profile" onClick={() =>this.updateSelected("/profile")}  className="SideBar-profile">
          <div>          
            <AccountCircleIcon style={{fontSize: 100}} />
            <p className="SideBar-username">Mufaro Makiwa</p>   
          </div>
        </Link>

        {/* <div className="SideBar-profile">
          <div className="SideBar-icons">
            <AccountCircleIcon style={{fontSize: 100}} />
            <span className="SideBar-notifications">2</span>     
            <p className="SideBar-username">Mufaro Makiwa</p>   
          </div>
    
        </div> */}
        
        <hr className="SideBar-divider"></hr>

        <ul className="SideBar-menus">
          {/* {sideBarMenus.map((val, key) => {
            return (
              <li key={key} onClick={() =>this.updateSelected(val.link)}>
                <Link to={ val.link } className={val.link === window.location.pathname ? "SideBar-row selected" : "SideBar-row"} >
                  <div>{val.title}</div>
                  <span className="SideBar-notifications">2</span> 
                </Link>
              </li>
            )
          })} */}

          <li key="Current" onClick={() =>this.updateSelected("/CurrentGoals")}>
            <Link to="/CurrentGoals" className={"/CurrentGoals" === window.location.pathname ? "SideBar-row selected" : "SideBar-row"} >
              <div>Current</div> 
            </Link>
          </li>

          <li key="Challenges" onClick={() =>this.updateSelected("/Challenges")}>
            <Link to="/Challenges" className={"/Challenges" === window.location.pathname ? "SideBar-row selected" : "SideBar-row"} >
              <div className="SideBar-buttonLabel">Challenges</div> 
              <span className="SideBar-notifications">2</span>
            </Link>
          </li>

          <li key="Friends" onClick={() =>this.updateSelected("/Friends")}>
            <Link to="/Friends" className={"/Friends" === window.location.pathname ? "SideBar-row selected" : "SideBar-row"} >
              <div>Friends</div> 
              <span className="SideBar-notifications">2</span>
            </Link>
          </li>
          

          <li key="Completed" onClick={() =>this.updateSelected("/Completed")}>
            <Link to="/Completed" className={"/Completed" === window.location.pathname ? "SideBar-row selected" : "SideBar-row"} >
              <div>Completed</div> 
            </Link>
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