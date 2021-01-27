import React, { Component } from 'react';
import "./CFCard.css";
import Toast from "../modules/Toast.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import "./CurrentFriends.css";
import {get, post} from '../../utilities.js';
import FriendDetailsDialog from "./FriendDetailsDialog.js";

import Icon_1 from "../../public/Profile_Icon_1.png";
import Icon_2 from "../../public/Profile_Icon_2.png";
import Icon_3 from "../../public/Profile_Icon_3.png";
import Icon_4 from "../../public/Profile_Icon_4.png";
import Icon_5 from "../../public/Profile_Icon_5.png";
import Icon_6 from "../../public/Profile_Icon_6.png";

class CFCard extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      isOpenAddTaskDialog: false,
      displayToast: false,
      isOpenFriendDialog: false,
      icon: null,
    }
  }

  componentDidMount() {
    this.getInfo();
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

  getInfo = () => {
    get("/api/friend/fill", {
      _id: this.props.friendId,
    }).then((profile) => {
      this.setIcon(profile.icon);
    })
  }

  setIcon = (num) => {
    if ( num === 1 ) { this.setState({ icon: Icon_1 }); }
    else if ( num === 2 ) { this.setState({ icon: Icon_2 }); }
    else if ( num === 3 ) { this.setState({ icon: Icon_3 }); }
    else if ( num === 4 ) { this.setState({ icon: Icon_4 }); }
    else if ( num === 5 ) { this.setState({ icon: Icon_5 }); }
    else if ( num === 6 ) { this.setState({ icon: Icon_6 }); }
    else { this.setState({ icon: Icon_1 }); }
  }

  render() { 
    return ( 
      <>
        <div className="CFCard-container" onClick={this.openFriendDialog}>
          {!this.state.icon ? (<div className="CFCard-icon"></div>) : (
            <img src={this.state.icon} className="CFCard-icon" alt="Search Result Icon"/>
          )}
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