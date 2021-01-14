import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import Current from "./Current.js";
import SideBar from "../modules/SideBar.js";
import AddTaskButton from "../modules/AddTaskButton.js";

import "../../utilities.css";
import "./CurrentChallenges.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "428252784086-go863k9aj8g435320oq90m85ma6odcul.apps.googleusercontent.com";

class CurrentChallenges extends Component {
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
      <div className="CurrentChallenges-container">
        <SideBar />
        <div className="CurrentChallenges-main">
            <Current/>
        </div>
           
        <AddTaskButton />
      </div>
    );
  }
}

export default CurrentChallenges;

/*
{this.props.userId ? (
          <GoogleLogout
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
*/