import React, { Component } from 'react';
import "./CFCard.css";
import Toast from "../modules/Toast.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import "./CurrentFriends.css";
import {get, post} from '../../utilities.js';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FriendDetailsDialog from "./FriendDetailsDialog.js";




class CFCard extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      isOpenAddTaskDialog: false,
      displayToast: false,
      isOpenFriendDialog: false,
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


  openFriendDialog = () => {
    this.setState( {
      isOpenFriendDialog: true
    })
  }



  closeDialogOnOutsideClick = () => {
    this.setState({
      isOpenFriendDialog: false,
    })
  }


  challenge = () => {
    this.setState({
      isOpenAddTaskDialog: true,
      isOpenFriendDialog: false
    })
  }


  render() { 
    return ( 
      <>
        <div className="CFCard-container" onClick={this.openFriendDialog}>
          <AccountCircleIcon style={{fontSize: 100}} />
          <div className="CFCard-content">
            <span className="CFCard-title">{this.props.friendName}</span>
            <span className="CFCard-message">{this.props.friendEmail}</span>
          </div>         
        </div>
        
        {this.state.isOpenAddTaskDialog  && (
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
        )}

        {this.state.isOpenFriendDialog && (
          <FriendDetailsDialog 
            closeDialogOnOutsideClick={this.closeDialogOnOutsideClick}
            challenge={this.challenge}
            unFriend={this.unFriend}
            name={this.props.friendName}
            email={this.props.friendEmail}
            userEmail={this.props.userEmail}          
            currentFriends={this.props.currentFriends}
            friendRequests={[]}
            friendRequestsSent={[]}/>
        )}

        <div className={this.state.displayToast ? "toast toastVisible" : "toast"}>
          <Toast label="Challenge sent"/>
        </div>

      </>
     );
  }
}
 
export default CFCard;