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
      isSearchBarFocused: false,
      displaySearchSuggestions: false,
      isDisplayingUserDetails: true,
      value: '',
      suggestions : [
        {
          _id: 1,
          name: "Mufaro Makiwa",
          email: "mufaroemakiwa@gmail.com",
        },
        {
          _id: 2,
          name: "Rutendo Makiwa",
          email: "rutendomakiwa@gmail.com",
        },
        {
          _id: 3,
          name: "Mirainashe Makiwa",
          email: "miraimakiwa@gmail.com",
        },
        {
          _id: 4,
          name: "Shreya Gupta",
          email: "shreyagupta@gmail.com",
        },
        {
          _id: 5,
          name: "Niarg Dharia",
          email: "nisargdharia@gmail.com",
        }
      ]
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const displaySearchSuggestions = (value.length !== 0);
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
        userId_1: this.props.userId,
        userName_1: this.props.userName,
        userEmail_1: this.props.userEmail,
        userId_2: user._id,
        userName_2: user.name,
        userEmail_2: user.email,
        is_friend: false
      }).then((friendObj) => {console.log("AddFriend.js post req")})
    })
  };

  setFocus = (isFocused) => {
    this.setState({
      isSearchBarFocused: isFocused,
    })
  }

  closeSearch = () => {
  
    //todo: clear suggestions in state
    this.props.setDisplaySearchSuggestions(false);
    this.setState({
      displaySearchSuggestions: false,
      value: '',
      isSearchBarFocused: false,
    })
  }

  suggestionSelected = (user) => {

    //todo: clear suggestions in state
    this.setState({
      // suggestions: [],
      value: user.name,
      displaySearchSuggestions: false,
      isSearchBarFocused: true,
    })
  }


  displayUser = (userObj) => {
    // close search
    this.suggestionSelected(userObj);

    // display user
    console.log("Displaying user");
  }



  render(){
    let suggestionList = this.state.suggestions.map((userObj) => (
      <SearchSuggestion
        key={`SearchSuggestion_${userObj._id}`}
        name={userObj.name}
        email={userObj.email}
        onClick={() => this.displayUser(userObj)}/>
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

        {this.state.isDisplayingUserDetails &&(
          <FriendDetailsDialog />
        )}

      </div>
    )
  }
}

export default AddFriend;