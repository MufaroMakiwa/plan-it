import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "../../utilities.css";
import "./LandingPage.css";

//TODO: REPLACE WITH YOUR OWN CLIENT_ID
const GOOGLE_CLIENT_ID = "428252784086-go863k9aj8g435320oq90m85ma6odcul.apps.googleusercontent.com";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
  }

  componentDidMount() {
    // remember -- api calls go here!
  }

  render() {
    return (
      <div className="LandingPage-background">
        <h1 className="LandingPage-title-text">PLAN-IT</h1>
        {this.props.userId ? (
          <GoogleLogout
            className="LandingPage-login-logout"
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={this.props.handleLogout}
            onFailure={(err) => console.log(err)}
          />
        ) : (
          <GoogleLogin
            className="LandingPage-login-logout"
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={this.props.handleLogin}
            onFailure={(err) => console.log(err)}
          />
        )}
      </div>
    );
  }
}

export default LandingPage;
