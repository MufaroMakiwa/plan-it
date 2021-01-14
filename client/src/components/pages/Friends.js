import React, { Component } from "react";
import "./Friends.css"

import CurrentFriends from "../modules/CurrentFriends.js";
import FriendRequests from "../modules/FriendRequests.js";
import SideBar from "../modules/SideBar.js";
import AddTaskButton from "../modules/AddTaskButton.js";



class Friends extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {};
  }


  render() {
    return (
      <div>
        <SideBar/>
        <CurrentFriends> </CurrentFriends>
        <FriendRequests> </FriendRequests>
        <AddTaskButton/>
      </div>
    );
  }
}

export default Friends;
