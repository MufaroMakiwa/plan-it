import React, { Component } from "react";
import "./Friends.css"

import CurrentFriends from "../modules/CurrentFriends.js";
import FriendRequests from "../modules/FriendRequests.js";
import SideBar from "../modules/SideBar.js";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import { navigate } from "@reach/router";


class Friends extends Component {
  constructor(props) {
    super(props);
    // Initialize Default State
    this.state = {
      isOpenAddTaskDialog: false,
    };
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool })
  }

  addTask = (taskObj) => {
    navigate("/current");
  }



  render() {
    return (
      <div className="page-container">
        <SideBar 
          link="/friends"
          handleLogout={this.props.handleLogout}
          userName={this.props.userName}/>
        <div className="page_main">
          <CurrentFriends 
            onChallengeButtonClicked={() => this.setOpenAddTaskDialog(true)}> 
          </CurrentFriends>

          <FriendRequests> </FriendRequests>
        </div>

        <AddTaskDialog 
          isOpenAddTaskDialog = {this.state.isOpenAddTaskDialog}
          userId={this.props.userId}
          userName={this.props.userName}
          closeAddTaskDialog = {() => this.setOpenAddTaskDialog(false)} 
          onSubmit={this.addTask}
          buttonText="Challenge friend">
        </AddTaskDialog>
      </div>
    );
  }
}

export default Friends;
