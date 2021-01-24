import React, { Component } from "react";
import "./Friends.css"
import "../../utilities.css";
import CurrentFriends from "../modules/CurrentFriends.js";
import FriendRequests from "../modules/FriendRequests.js";
import SideBar from "../modules/SideBar.js";
import AddFriend from "../modules/AddFriend.js";

import RocketTagRoll from "../modules/RocketTagRoll.js";
import "../modules/background.css"

import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import { navigate } from "@reach/router";
import CustomBackground from '../modules/CustomBackground.js';
import NavBar from "../modules/NavBar.js";


class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddTaskDialog: false,
    };
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool });
  }

  addTask = (taskObj) => {
    navigate("/current");
  }

  render() {
    return (
      <div className="page-container">

        <NavBar />

        <SideBar 
          link="/friends"
          handleLogout={this.props.handleLogout}
          userName={this.props.userName}/>

        <div className="dummy_div_left"></div>

        <CustomBackground />

        <div className="page_main">
          <AddFriend
            userId={this.props.userId}
            userName={this.props.userName}
            userEmail={this.props.userEmail}> 
          </AddFriend>

          <CurrentFriends 
            onChallengeButtonClicked={() => this.setOpenAddTaskDialog(true)}
            userId={this.props.userId}
            userName={this.props.userName}
            userEmail={this.props.userEmail}> 
          </CurrentFriends>

          <FriendRequests
            userId={this.props.userId}
            userName={this.props.userName}
            userEmail={this.props.userEmail}> 
          </FriendRequests>

          <AddTaskButton onClick={() => this.setOpenAddTaskDialog(true)}/>

          <AddTaskDialog 
            isOpenAddTaskDialog = {this.state.isOpenAddTaskDialog}
            userId={this.props.userId}
            userName={this.props.userName}
            closeAddTaskDialog = {() => this.setOpenAddTaskDialog(false)} 
            onSubmit={this.addTask}>
          </AddTaskDialog>
        </div>

        <div className="dummy_div_right"></div>

        <RocketTagRoll /> 
      </div>
    );
  }
}

export default Friends;
