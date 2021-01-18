import React, { Component } from 'react';
import "./AddFriend.css"

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
    event.preventDefault();
    console.log("friend added");
    this.setState({
      value: '',
    })
  }

  render(){
    return (
      <div> 
        <input type="text" value={this.state.value} onChange ={this.handleChange}/>
        <button type = "submit" value = "Add Friend" onClick = {this.handleSubmit}> Make Friend Request </button>
      </div>
    )
  }

}

export default AddFriend;