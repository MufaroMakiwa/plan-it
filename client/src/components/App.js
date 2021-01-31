import React, { Component } from "react";
import { Router, navigate, redirectTo } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import LandingPage from "./pages/LandingPage.js";
import Friends from "./pages/Friends.js";
import Current from "./pages/Current.js";
import Challenges from "./pages/Challenges.js";
import Completed from "./pages/Completed.js";
import Profile from "./pages/Profile.js";
import RocketTag from "./pages/RocketTag.js";

import "../utilities.css";
import { socket } from "../client-socket.js";
import { get, post } from "../utilities";
import MetaTags from "react-meta-tags";


/**
 * Define the "App" component as a class.
 */
class App extends Component {
  // makes props available in this component
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      userName: undefined,
      userEmail: undefined,
      userIcon: undefined,
      loading: true,
    };
  }

  componentDidMount() { 
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        this.setState({ 
          userId: user._id,
          userName: user.name,
          userEmail: user.email,
          userIcon: user.icon,
          loading: false
        });

      } else { 
        this.setState({
          loading: false
        })
        navigate("/");     
      }
    });

    // when another tab is opened, log the user out on this tab
    socket.on("disconnected", (val) => {
      this.handleLogout();
    })
  }

  componentDidUpdate() {
    window.onpopstate = e => {
      if (!this.state.userId) {
        navigate("/");
      }
    }
  }

  handleLogin = (res) => {
    console.log(`Logged in as ${res.profileObj.name}`);
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      this.setState({
         userId: user._id,
         userName: user.name,
         userEmail: user.email,
         userIcon: user.icon,
        });
      post("/api/initsocket", { socketid: socket.id });
      navigate('/current');
    });
  };

  handleLogout = () => {
    this.setState({ 
      userId: undefined,
      userName: undefined,
      userEmail: undefined,
      userIcon: undefined,
    });
    post("/api/logout");
    navigate('/');
  };

  render() {
    if (this.state.loading) {
      return (
        <div></div>
      )   
    }

    return (
      <>
        <MetaTags>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
        </MetaTags>
        
        <Router>
          <LandingPage
            path="/"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userName={this.state.userName}
            userIcon={this.state.userIcon}
            userId={this.state.userId}
            userEmail={this.state.userEmail}/>

          <Current
            path="/current"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userName={this.state.userName}
            userIcon={this.state.userIcon}
            userId={this.state.userId}
            userEmail={this.state.userEmail}/>

          <Friends
            path="/friends"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userName={this.state.userName}
            userIcon={this.state.userIcon}
            userId={this.state.userId}
            userEmail={this.state.userEmail}/>

          <Challenges
            path="/challenges"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userName={this.state.userName}
            userIcon={this.state.userIcon}
            userId={this.state.userId}
            userEmail={this.state.userEmail}/>

          <Completed
            path="/completed"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userName={this.state.userName}
            userIcon={this.state.userIcon}
            userId={this.state.userId}
            userEmail={this.state.userEmail}/>

          <Profile
            path="/profile"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userName={this.state.userName}
            userIcon={this.state.userIcon}
            userId={this.state.userId}
            userEmail={this.state.userEmail}/>

          <RocketTag
            path="/rocketTag"
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            userName={this.state.userName}
            userIcon={this.state.userIcon}
            userId={this.state.userId}
            userEmail={this.state.userEmail}/>

          <NotFound default />
        </Router>
      </>
    );
  }
}

export default App;
