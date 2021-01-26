import React, { Component } from 'react';
import "./Card.css";
import "./CFCard.css";
import Toast from "../modules/Toast.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import "./CurrentFriends.css";
import {get, post} from '../../utilities.js';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';




class CFCard extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      isOpenAddTaskDialog: false,
      displayToast: false,
    }
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool });
  }

  unFriend = () => {
    post("/api/friend/delete", {friendId: this.props.friendId}).then((friend) => {
      this.props.onUnfriend();
    })
  }

  challengeFriendNotification = () => {
    this.setState({displayToast: true})
    const timer = setTimeout(() => {
      this.setState({
        displayToast: false
      })
    }, 1000);
    return () => clearTimeout(timer);
  }

  render() { 
    return ( 
      <>
        <div className="CFCard-container" onClick = {}>
          <AccountCircleIcon style={{fontSize: 100}} />
          <p className="card-title">{this.props.friendName}</p>

          <button onClick={() => this.setOpenAddTaskDialog(true)} className ="challenge-button" type="button"> Challenge </button>
          <button onClick={this.unFriend} className ="unfriend-button" type="button"> Unfriend </button>    
        </div>
        

        <AddTaskDialog 
          isOpenAddTaskDialog = {this.state.isOpenAddTaskDialog}
          friendId={this.props.friendId}
          friendName={this.props.friendName}
          userName={this.props.userName}
          userId={this.props.userId}
          closeAddTaskDialog = {() => this.setOpenAddTaskDialog(false)} 
          onSubmit={this.challengeFriendNotification}
          isChallenge={true}
          buttonText="Challenge friend">
        </AddTaskDialog>

        <div className={this.state.displayToast ? "toast toastVisible" : "toast"}>
          <Toast label="Challenge sent"/>
        </div>

      </>
     );
  }
}
 
export default CFCard;