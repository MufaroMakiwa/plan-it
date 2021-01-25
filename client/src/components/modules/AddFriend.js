import React, { Component } from 'react';
import "./AddFriend.css"
import SearchIcon from '@material-ui/icons/Search';
import AddTaskDialog from "../modules/AddTaskDialog.js";
import "../../utilities.css";
import {get, post} from '../../utilities.js';
import SearchSuggestion from "./SearchSuggestion.js";
import FriendDetailsDialog from "./FriendDetailsDialog.js";

class AddFriend extends Component{

  constructor(props){
    super(props);
    this.state = {
      selectedUser: null,
      isSearchBarFocused: false,
      displaySearchSuggestions: false,
      isDisplayingUserDetails: true,
      value: '',
      suggestions: [],
      isOpenAddTaskDialog: false,
      isOpenFriendDialog: false,
    };
  }


  handleChange = (event) => {
    const value = event.target.value;
    const displaySearchSuggestions = (value.length !== 0);

    if (displaySearchSuggestions) {
      get("/api/friend/suggestions", {name: value}).then(users => {
        this.setState({
          suggestions: users.sort((a, b) => (a.name > b.name) ? 1: -1),
        })
      })
    }

    this.props.setDisplaySearchSuggestions(displaySearchSuggestions);
    this.setState({ 
      value: value,
      displaySearchSuggestions: displaySearchSuggestions
    })
  }

  setFocus = (isFocused) => {
    this.setState({
      isSearchBarFocused: isFocused,
    })
  }

  closeSearch = () => {
    this.props.setDisplaySearchSuggestions(false);
    this.setState({
      suggestions: [],
      displaySearchSuggestions: false,
      value: '',
      isSearchBarFocused: false,
      selectedUser: null,
      isOpenFriendDialog: false,
      isOpenAddTaskDialog: false,
    })
  }


  suggestionSelected = (userObj) => {
    this.setState({
      suggestions: [],
      value: userObj.name,
      displaySearchSuggestions: false,
      isSearchBarFocused: true,
      selectedUser: userObj,
      isOpenFriendDialog: true,
    })
    this.props.setDisplaySearchSuggestions(false);
  }


  acceptRequest = () => {
    post("/api/friend/accept", {friendId: this.state.selectedUser._id}).then(friend => {
      this.props.updateRequests(friend.userId_1);
    })
    this.closeSearch()
  }


  unFriend = (friendId) => {
    post("/api/friend/delete", {friendId: this.state.selectedUser._id}).then((friend) => {
      this.props.filterFriends(friendId);
    })
    this.closeSearch()
  }


  declineRequest = (friendId) => {
    post("/api/friend/request/decline", {friendId: friendId}).then((friend) => {
      console.log("Declining request");
      this.props.updateRequests(friendId);
    })
    this.closeSearch()
  }


  cancelRequest = (friendId) => {
    post("/api/friend/request/cancel", {friendId: friendId}).then((friend) => {
      this.props.updateRequestsSent(friendId);
    })
    this.closeSearch()
  }


  sendRequest = () => {
    const query = {
      userId_2: this.state.selectedUser._id,
      userName_2: this.state.selectedUser.name,
      userEmail_2: this.state.selectedUser.email
    }
    post("/api/friend/add", query).then(friendObj => {
      console.log(friendObj);
    })
    this.closeSearch()
  }


  challenge = () => {
    this.setState({
      isOpenAddTaskDialog: true,
      isOpenFriendDialog: false
    })
  }

  closeDialogOnOutsideClick = () => {
    this.setState({
      suggestions: [],
      displaySearchSuggestions: false,
      value: '',
      isSearchBarFocused: false,
      selectedUser: null,
      isOpenFriendDialog: false,
      isOpenAddTaskDialog: false,
    })
  }


  render(){
    let suggestionList = this.state.suggestions.map((userObj) => (
      <SearchSuggestion
        key={`SearchSuggestion_${userObj._id}`}
        name={userObj.name}
        email={userObj.email}
        onClick={() => this.suggestionSelected(userObj)}/>
    ))

    return (
      <div className="AddFriend-container"> 
        <div className="AddFriend-search_layout">
          <div 
            id="AddFriend-searchBar" 
            className={`AddFriend-searchBar ${this.state.isSearchBarFocused ? "AddFriend-searchBar_active" : ""}`}>
            <div className="AddFriend-searchIcon">
              <SearchIcon/>
            </div>
          
            <input 
              type="text" 
              value={this.state.value} 
              onChange={this.handleChange}
              onFocus={() => this.setFocus(true)}
              className="AddFriend-searchInput"/>
          </div>

          <span 
            className={`AddFriend-cancel ${!this.state.isSearchBarFocused ? "AddFriend-cancel_hidden" : ""}`}
            onClick={this.closeSearch}>
            Cancel
          </span>
        </div>    


        {this.state.displaySearchSuggestions && (
          <div className="AddFriend-suggestions">
            {suggestionList}
          </div>  
        )}  

        {this.state.isOpenFriendDialog && (
          <FriendDetailsDialog 
            closeDialog={this.closeSearch}
            closeDialogOnOutsideClick={this.closeDialogOnOutsideClick}
            sendRequest={this.sendRequest}
            acceptRequest={this.acceptRequest}
            declineRequest={() => this.declineRequest(this.state.selectedUser._id)}
            challenge={this.challenge}
            cancelRequest={() => this.cancelRequest(this.state.selectedUser._id)}
            unFriend={() => this.unFriend(this.state.selectedUser._id)}
            name={this.state.selectedUser.name}
            email={this.state.selectedUser.email}
            userEmail={this.props.userEmail}
            currentFriends={this.props.currentFriends}
            friendRequests={this.props.friendRequests}
            friendRequestsSent={this.props.friendRequestsSent}/>
        )}

        {this.state.isOpenAddTaskDialog  && (
          <AddTaskDialog 
            isOpenAddTaskDialog = {this.state.isOpenAddTaskDialog}
            friendId={this.state.selectedUser._id}
            friendName={this.state.selectedUser.name}
            userName={this.props.userName}
            userId={this.props.userId}
            closeAddTaskDialog = {this.closeSearch} 
            onSubmit={this.challengeFriendNotification}
            isChallenge={true}
            buttonText="Challenge friend">
          </AddTaskDialog>
        )}

      </div>
    )
  }
}

export default AddFriend;