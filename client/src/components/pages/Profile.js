import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import SideBar from "../modules/SideBar.js";
import AddTaskButton from "../modules/AddTaskButton.js";

import "../../utilities.css";
import "./Profile.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "428252784086-go863k9aj8g435320oq90m85ma6odcul.apps.googleusercontent.com";

class Profile extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <div className="Profile-Container">
        <SideBar />
        <div className="Profile-Main">
            <div className="Profile-Header">
              <h1 className="Profile-Header-Name"> Mufaro Makiwa </h1>
              <h1 className="Profile-Header-Stats"> 9 Friends </h1>
              <h1 className="Profile-Header-Stats"> 210 Points </h1>
            </div>
            <img height="150px" src="../../public/DemoConstellation.png" alt="Constellation"/>
            <div className="Profile-Header">
              <h1 className="Profile-Header-Stats"> Stats </h1>
              <h1 className="Profile-Header-Stats"> Recent Accomplishments </h1>
            </div>
        </div>
        <AddTaskButton />
      </div>
    );
  }
}

export default Profile;
