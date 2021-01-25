import React, { Component } from 'react'
import { Dialog, DialogContent } from '@material-ui/core';
import "./FriendDetailsDialog.css"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class FriendDetailsDialog extends Component {

  constructor(props) {
    super(props);
    this.state = {
      action: "",
      negative: "",
      isLoading: true,
    }
  }

  isFriend = () => {

    // email is friend email, userEmail is current user email
    for (let friend of this.props.currentFriends) {
      if (friend.userEmail_1 === this.props.email && friend.userEmail_2 === this.props.userEmail ||
          friend.userEmail_1 === this.props.userEmail && friend.userEmail_2 === this.props.email) {
            return true;
          }
    }
    return false;
  }


  isRequest = () => {
    for (let friend of this.props.friendRequests) {
      if (friend.userEmail_2 === this.props.userEmail && friend.userEmail_1 === this.props.email) {
        return true;
      }
    }
    return false;
  }


  isRequestSent = () => {
    for (let friend of this.props.friendRequestsSent) {
      if (friend.userEmail_1 === this.props.userEmail && friend.userEmail_2 === this.props.email) {
        return true;
      }
    }
    return false;
  }

  resetDialog = () => {
    this.setState({
      action: "",
      negative: "",
      isLoading: true,
    })
  }


  getAction = () => {
    if (this.isFriend()) {
      this.setState({
        action: "Challenge",
        negative: "Unfriend",
        isLoading: false
      })

    } else if (this.isRequest()) {
      this.setState({
        action: "Accept",
        negative: "Decline",
        isLoading: false
      })

    } else if (this.isRequestSent()) {
      this.setState({
        action: "Pending",
        negative: "Delete",
        isLoading: false
      })

    } else {
      this.setState({
        action: "Send request",
        negative: "Close",
        isLoading: false
      })
    }
  }


  onNegative = () => {
    switch (this.state.negative) {
      case "Unfriend":
        this.props.unFriend();
        break;

      case "Decline":
        this.props.declineRequest();
        break;

      case "Delete":
        this.props.cancelRequest();
        break;

      case "Close":
        this.props.closeDialog();
        break;
    }
  }


  onAction = () => {
    switch (this.state.action) {
      case "Accept":
        console.log("Accepted");
        this.props.acceptRequest()
        break;

      case "Challenge":
        this.props.challenge()
        break;

      case "Send request":
        this.props.sendRequest()
        break;
    }
  }
  

  componentDidMount() {
    this.getAction()
    document.addEventListener("click", this.handleClickOutSide, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutSide, true);
  }

  handleClickOutSide = (event) => {
    const domNode = document.getElementById("FriendDetailsDialog-dialogId");
    if (!domNode || !domNode.contains(event.target)) {
        console.log("Clicked outside");
        this.props.closeDialogOnOutsideClick()

    } else {
      console.log("Clicked inside");
    }
  }

  render() { 
    return ( 
      <Dialog open>
        {!this.state.isLoading && (
          <DialogContent id="FriendDetailsDialog-dialogId">
            <div method="dialog" className="FriendDetailsDialog-container" autoComplete="off">

              <div className="FriendDetailsDialog-detailsContainer">
                <div className="FriendDetailsDialog-iconBigger"> 
                  <AccountCircleIcon style={{fontSize: 50}}/>
                </div>

                <div className="FriendDetailsDialog-iconSmaller"> 
                  <AccountCircleIcon style={{fontSize: 40}}/>
                </div>

                <div className="FriendDetailsDialog-details">
                  <span className="FriendDetailsDialog-name">{this.props.name}</span>
                  <span className="FriendDetailsDialog-email">{this.props.email}</span>
                </div>
              </div>   

              <div 
                className="FriendDetailsDialog-buttonsContainer">

                <button 
                  className="FriendDetailsDialog-button FriendDetailsDialog-buttonCancel"
                  onClick={this.onNegative}>
                  {this.state.negative}
                </button>
              
                <button 
                  className={`FriendDetailsDialog-button ${this.state.action === "Pending" ? "FriendDetailsDialog-buttonPending" : "FriendDetailsDialog-buttonAction"}`}
                  onClick={this.onAction}>
                  {this.state.action}
                </button>
              </div>   
            </div>

          </DialogContent>
        )}
      </Dialog>
     );
  }
}
 
export default FriendDetailsDialog;