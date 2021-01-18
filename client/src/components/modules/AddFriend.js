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
    post('/api/friend/add', {
      userId_1: this.props.userId,
      userName_1: this.props.userName,
      userId_2: null,
      userName_2: this.state.value
    }).then((friendObj) => {console.log("AddFriend.js post req")})
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