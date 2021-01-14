import React, { Component } from "react";
import "./Friends.css"

import CurrentFriends from "../modules/CurrentFriends.js";
import FriendRequests from "../modules/FriendRequests.js";



class Friends extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }


  render() {
    return (
      <div>
        <h1> HELLO WORLD </h1>
        <CurrentFriends> </CurrentFriends>
        <FriendRequests> </FriendRequests>
      </div>
    );
  }
}

export default Friends;
