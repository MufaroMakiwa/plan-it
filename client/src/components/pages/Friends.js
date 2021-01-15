import React, { Component } from "react";
import "./Friends.css"

import CurrentFriends from "../modules/CurrentFriends.js";
import FriendRequests from "../modules/FriendRequests.js";
import SideBar from "../modules/SideBar.js";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";



class Friends extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      isOpenAddTaskDialog: false,
    };
  }

  render() {
    return (
      <div className="page-container">
        <SideBar 
          link="/friends"
          handleLogout={this.props.handleLogout}/>
        <div className="page_main">
          <CurrentFriends> </CurrentFriends>
          <FriendRequests> </FriendRequests>
        </div>

        <AddTaskButton onClick={() => this.setOpenAddTaskDialog(true)}/>

        <AddTaskDialog 
          isOpenAddTaskDialog = {this.state.isOpenAddTaskDialog}
          closeAddTaskDialog = {() => this.setOpenAddTaskDialog(false)} >

        </AddTaskDialog>

      </div>
    );
  }
}

export default Friends;
