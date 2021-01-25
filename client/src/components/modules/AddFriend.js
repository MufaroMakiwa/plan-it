import React, { Component } from 'react';
import "./AddFriend.css"
import SearchIcon from '@material-ui/icons/Search';

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
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const displaySearchSuggestions = (value.length !== 0);

    if (displaySearchSuggestions) {
      get("/api/friend/suggestions", {name: value}).then(users => {
        console.log("Users found:")
        console.log(users)
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


  handleSubmit = (event) => {
    // todo: add validation later
    event.preventDefault();
    console.log("friend added");
    this.addNewFriend();
    this.setState({
      value: '',
    });
  }

  addNewFriend = () => {
    get("/api/friend/id", {friendName: this.state.value}).then((user) => {
      post('/api/friend/make', {
        // userId_1: this.props.userId,
        // userName_1: this.props.userName,
        // userEmail_1: this.props.userEmail,
        userId_2: user._id,
        userName_2: user.name,
        userEmail_2: user.email,
        // is_friend: false
      }).then((friendObj) => {console.log("AddFriend.js post req")})
    })
  };

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
    })
  }

  suggestionSelected = (userObj) => {
    this.setState({
      suggestions: [],
      value: userObj.name,
      displaySearchSuggestions: false,
      isSearchBarFocused: true,
      selectedUser: userObj
    })
    this.props.setDisplaySearchSuggestions(false);
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

        {this.state.selectedUser !== null && (
          <FriendDetailsDialog 
            closeDialog={this.closeSearch}
            name={this.state.selectedUser.name}
            email={this.state.selectedUser.email}/>
        )}

      </div>
    )
  }
}

export default AddFriend;