import React, { Component } from "react";
import "./Friends.css"
import "../../utilities.css";
import CurrentFriends from "../modules/CurrentFriends.js";
import FriendRequests from "../modules/FriendRequests.js";
import SideBar from "../modules/SideBar.js";
import AddFriend from "../modules/AddFriend.js";
import {get, post} from '../../utilities.js';
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
      displaySearchSuggestions: false,
      friendRequests: [],
      currentFriends: [],
      friendRequestsSent: [],
    };
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool });
  }

  getRequests = () => {
    get("/api/friend/requests", {}).then((friendRequests) => {
      this.setState({ friendRequests })
    })
  }

  getFriends = () => {
    get("/api/friend/current", {userName: this.props.userName}).then((currentFriends) => {
      this.setState({ currentFriends })
    })
  }


  getSentRequests = () => {
    get("/api/friend/requests/sent", {}).then((friendRequestsSent) => {
      this.setState({ friendRequestsSent })
    })
  }


  componentDidMount() {
    this.getFriends();
    this.getRequests();
    this.getSentRequests();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.userName && this.props.userName ) {
      this.getRequests();
      this.getFriends();
      this.getSentRequests();

    }
  }

  addTask = (taskObj) => {
    navigate("/current");
  }

  setDisplaySearchSuggestions = (isDisplaying) => {
    this.setState({ 
      displaySearchSuggestions: isDisplaying
    })
  }

  unFriend = (friendId) => {
    const currentFriends = this.state.currentFriends.filter((friend) => {
      return !(friend.userId_1 === friendId && friend.userId_2 === this.props.userId ||
              friend.userId_1 === this.props.userId && friend.userId_2 === friendId)
    });
    this.setState({ currentFriends });
  }

  updateRequests = (friendId) => {
    console.log("DECLINE OR ACCEPT");
    const friendRequests = this.state.friendRequests.filter((friend) => {
      console.log(`FriendID: ${friendId}`);
      console.log(`UserId_1: ${friend.userId_1}`);
      console.log(`UserId_2: ${friend.userId_2}`);
      return !(friend.userId_1 === friendId && friend.userId_2 === this.props.userId ||
               friend.userId_1 === this.props.userId && friend.userId_2 === friendId)
    });
    this.setState({ friendRequests });
  }

  filterFriends = (friendId) => {
    const currentFriends = this.state.currentFriends.filter((friend) => {

      return !(friend.userId_1 === friendId && friend.userId_2 === this.props.userId ||
               friend.userId_1 === this.props.userId && friend.userId_2 === friendId)
    });
    this.setState({ currentFriends });
  }


  render() {
    return (
      <div className="page-container">

        <NavBar 
          link="/friends"
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}/>

        <SideBar 
          link="/friends"
          handleLogout={this.props.handleLogout}
          userName={this.props.userName}/>

        <div className="dummy_div_left"></div>

        <CustomBackground />

        <div className="page_main">
          <div className="tile_box_centered">
            <AddFriend
              userId={this.props.userId}
              userName={this.props.userName}
              userEmail={this.props.userEmail}
              currentFriends={this.state.currentFriends}
              friendRequests={this.state.friendRequests}
              friendRequestsSent={this.state.friendRequestsSent}
              setDisplaySearchSuggestions={this.setDisplaySearchSuggestions}
              unFriend={this.unfriend}
              updateRequests={this.updateRequests}
              filterFriends={this.filterFriends}> 
            </AddFriend>

            {!this.state.displaySearchSuggestions && (
              <>
                <CurrentFriends 
                  onChallengeButtonClicked={() => this.setOpenAddTaskDialog(true)}
                  userId={this.props.userId}
                  userName={this.props.userName}
                  userEmail={this.props.userEmail}
                  currentFriends={this.state.currentFriends}> 
                </CurrentFriends>

                <FriendRequests
                  userId={this.props.userId}
                  userName={this.props.userName}
                  userEmail={this.props.userEmail}
                  friendRequests={this.state.friendRequests}
                  updateRequests={this.updateRequests}> 
                </FriendRequests> 
              </>
            )}
          </div>   
        </div>

        <AddTaskButton onClick={() => this.setOpenAddTaskDialog(true)}/>

        <AddTaskDialog 
          isOpenAddTaskDialog = {this.state.isOpenAddTaskDialog}
          userId={this.props.userId}
          userName={this.props.userName}
          closeAddTaskDialog = {() => this.setOpenAddTaskDialog(false)} 
          onSubmit={this.addTask}>
        </AddTaskDialog>

      </div>
    );
  }
}

export default Friends;
