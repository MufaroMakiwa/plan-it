import React, { Component } from 'react';
import "./AddFriend.css"

import "../../utilities.css";
import {get, post} from '../../utilities.js';

class AddFriend extends Component{
  constructor(props){
    super(props);

    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
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
      post('/api/friend/add', {
        userId_1: this.props.userId,
        userName_1: this.props.userName,
        userId_2: user._id,
        userName_2: user.name
      }).then((friendObj) => {console.log("AddFriend.js post req")})
    })
  };

  render(){
    return (
      <div> 
        <input type="text" value={this.state.value} onChange ={this.handleChange}/>
        <button type = "submit" value = "Add Friend" onClick = {this.handleSubmit}> Add Friend </button>
      </div>
    )
  }

}

export default AddFriend;