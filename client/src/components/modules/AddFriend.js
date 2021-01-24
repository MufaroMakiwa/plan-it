import React, { Component } from 'react';
import "./AddFriend.css"
import SearchIcon from '@material-ui/icons/Search';

import "../../utilities.css";
import {get, post} from '../../utilities.js';

class AddFriend extends Component{

  constructor(props){
    super(props);
    this.state = {
      isSearchBarFocused: false,
      value: '',
      suggestions: []
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ value })
  }

  renderSuggestions = () => {
    if (this.state.suggestions.length === 0 ) {
      return null;
    }
    return (
      <ul className="AddFriend-suggestions">
        {this.state.suggestions.map((user) => (
          <li 
            key={Math.random()} 
            onClick={() => this.suggestionSelected(user)}
            style={{ padding: 8}}>
            {`Name: ${user.name} id: ${user._id}`}
          </li>
        ))}
      </ul>
    )
  }

  suggestionSelected = (user) => {
    this.setState({
      suggestions: [],
      value: user.name,
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

  render(){
    return (
      <div className="AddFriend-container"> 

        <div className="AddFriend-search_layout">
          <div className="AddFriend-searchBar">
            <div className="AddFriend-searchIcon">
              <SearchIcon />
            </div>
          
            <input 
              type="text" 
              value={this.state.value} 
              onChange={this.handleChange}
              onFocus={() => this.setFocus(true)}
              onBlur={() => this.setFocus(false)}
              className="AddFriend-searchInput"/>
            </div>

            <span className={`AddFriend-cancel ${!this.state.isSearchBarFocused ? "AddFriend-cancel_hidden" : ""}`}>
              Cancel
            </span>

        </div>
        

        {/* <button type = "submit" value = "Add Friend" onClick = {this.handleSubmit}> Add Friend </button> */}
      </div>
    )
  }

}

export default AddFriend;