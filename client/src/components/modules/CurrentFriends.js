import React, { Component } from 'react';
import "./FriendMod.css"
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
    }
  }

  getFriends = () => {
    get("/api/friend/current", {userName: this.props.userName}).then((friends) => {
      this.setState({friends})
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
    console.log('friends step3')
    console.log(friendId)
    const friends = this.state.friends.filter((friend) => {
      return !(friend.userId_1 === friendId && friend.userId_2 === this.props.userId ||
              friend.userId_1 === this.props.userId && friend.userId_2 === friendId)
    });
    console.log(friends)
    this.setState({friends});
  }

  render() { 
 
    let friendsList = null;
    const hasFriends = this.state.friends.length !== 0;

    if (hasFriends) {
      friendsList = this.state.friends.map((friendObj) => (
        <CFCard
          key={`listItem-${friendObj._id}`}
          userName={this.props.userName}
          friendName={friendObj.userName_1 === this.props.userName ? friendObj.userName_2: friendObj.userName_1}
          friendId={friendObj.userName_1 === this.props.userName ? friendObj.userId_2: friendObj.userId_1}
          onUnfriend={() => this.unFriend(friendObj.userName_1 === this.props.userName ? friendObj.userId_2: friendObj.userId_1)}/>
      ));
      
    } else {
      friendsList = <div>No Friends!</div>;
    }

    return ( 
        <div>
          <h1> Current Friends </h1>
          {friendsList}
        </div>
    );
  }
}
 
export default CurrentFriends;