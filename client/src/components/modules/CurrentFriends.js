import React, { Component } from 'react';
import CFCard from "../modules/CFCard.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import "../../utilities.css";
import "./CurrentFriends.css";
import {get, post} from '../../utilities.js';


class CurrentFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      loading: true
    }
  }

  getFriends = () => {
    get("/api/friend/current", {userName: this.props.userName}).then((friends) => {
      this.setState({
        friends: friends,
        loading: false
      })
    })
  }


  componentDidMount() {
    this.getFriends();
  }


  componentDidUpdate(prevProps) {
    if (!prevProps.userName && this.props.userName ) {
      this.getFriends();
    }
  }


  unFriend = (friendId) => {
    const friends = this.state.friends.filter((friend) => {
      return !(friend.userId_1 === friendId && friend.userId_2 === this.props.userId ||
              friend.userId_1 === this.props.userId && friend.userId_2 === friendId)
    });
    this.setState({friends});
  }

  render() { 
    if (this.state.loading){
      return <div></div>
    }
 
    let friendsList = null;
    const hasFriends = this.state.friends.length !== 0;

    if (hasFriends) {
      friendsList = this.state.friends.map((friendObj) => (
        <CFCard
          key={`listItem-${friendObj._id}`}
          userName={this.props.userName}
          userId={this.props.userId}
          friendName={friendObj.userName_1 === this.props.userName ? friendObj.userName_2: friendObj.userName_1}
          friendId={friendObj.userName_1 === this.props.userName ? friendObj.userId_2: friendObj.userId_1}
          onUnfriend={() => this.unFriend(friendObj.userName_1 === this.props.userName ? friendObj.userId_2: friendObj.userId_1)}/>
      ));
    } else {
      friendsList = <div>No Friends!</div>;
    }

    return ( 
        <div className="CurrentFriends-container">
          <h1> Current Friends </h1>
          {friendsList}
        </div>
    );
  }
}
 
export default CurrentFriends;