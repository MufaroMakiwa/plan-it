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
import { socket } from "../../client-socket.js";


class Friends extends Component {
  isMounted = false;

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
    this.isMounted = true;
    this.getFriends();
    this.getRequests();
    this.getSentRequests();

    // listen for events when the user gets a new friend
    socket.on("friend_request_accepted", (friend) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        currentFriends: [friend].concat(prevState.currentFriends),
      }))

      // if the current user sent the request, filter their sent request array
      if (friend.userId_1 === this.props.userId) {
        console.log("I sent the request");
        this.updateRequestsSent(friend.userId_2);
      }
    })

    // listen for events when a friend is removed
    socket.on("friend_deleted", (friendId) => {
      if (!this.isMounted) return;
        this.filterFriends(friendId);
    })

    // listen for events when a friend request is sent
    socket.on("friend_request_sent", (friend) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        friendRequestsSent: [friend].concat(prevState.friendRequestsSent),
      }))
    })

    // listen for events when a friend request is received
    socket.on("friend_request_received", (friend) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        friendRequests: [friend].concat(prevState.friendRequests),
      }))
    })

    // listen for events when a friend request is declined
    socket.on("friend_request_declined", (friendId) => {
      if (!this.isMounted) return;
        this.updateRequestsSent(friendId)
    })

    // listen for events when a friend request is cancelled
    socket.on("friend_request_cancelled", (friendId) => {
      if (!this.isMounted) return;
        this.updateRequests(friendId)
    })
  }


  componentWillUnmount() {
    this.isMounted = false;
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


  updateRequests = (friendId) => {
    const friendRequests = this.state.friendRequests.filter((friend) => {
      return !(friend.userId_1 === friendId && friend.userId_2 === this.props.userId ||
               friend.userId_1 === this.props.userId && friend.userId_2 === friendId)
    });
    this.setState({ friendRequests });
  }

  

  updateRequestsSent = (friendId) => {
    const friendRequestsSent = this.state.friendRequestsSent.filter((friend) => {
      return !(friend.userId_1 === this.props.userId && friend.userId_2 === friendId)
    });
    this.setState({ friendRequestsSent });
  }


  filterFriends = (friendId) => {
    console.log("FIlter friends called");
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
              updateRequests={this.updateRequests}
              updateRequestsSent={this.updateRequestsSent}
              filterFriends={this.filterFriends}> 
            </AddFriend>

            {!this.state.displaySearchSuggestions && (
              <>
                <FriendRequests
                  userId={this.props.userId}
                  userName={this.props.userName}
                  userEmail={this.props.userEmail}
                  friendRequests={this.state.friendRequests}
                  updateRequests={this.updateRequests}> 
                </FriendRequests>

                <CurrentFriends 
                  onChallengeButtonClicked={() => this.setOpenAddTaskDialog(true)}
                  userId={this.props.userId}
                  userName={this.props.userName}
                  userEmail={this.props.userEmail}
                  currentFriends={this.state.currentFriends}
                  filterFriends={this.filterFriends}> 
                </CurrentFriends>  
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
