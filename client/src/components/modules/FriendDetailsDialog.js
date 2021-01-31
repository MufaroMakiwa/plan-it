import React, { Component } from 'react'
import { Dialog, DialogContent } from '@material-ui/core';
import "./FriendDetailsDialog.css";
import Icon_1 from "../../public/Profile_Icon_1.png";
import Icon_2 from "../../public/Profile_Icon_2.png";
import Icon_3 from "../../public/Profile_Icon_3.png";
import Icon_4 from "../../public/Profile_Icon_4.png";
import Icon_5 from "../../public/Profile_Icon_5.png";
import Icon_6 from "../../public/Profile_Icon_6.png";

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

  getIcon = () => {
    if ( this.props.icon === 1 ) { return Icon_1 }
    else if ( this.props.icon === 2 ) {return Icon_2 }
    else if ( this.props.icon === 3 ) {return Icon_3 }
    else if ( this.props.icon === 4 ) {return Icon_4 }
    else if ( this.props.icon === 5 ) {return Icon_5 }
    else if ( this.props.icon === 6 ) {return Icon_6 }
    else { return Icon_1 }
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
        this.props.closeDialogOnOutsideClick()
    } 
  }

  render() { 
    return ( 
      <Dialog open>
        {!this.state.isLoading && (
          <DialogContent id="FriendDetailsDialog-dialogId">
            <div method="dialog" className="FriendDetailsDialog-container">

              <div className="FriendDetailsDialog-detailsContainer">
                <div className="FriendDetailsDialog-iconBigger"> 
                  <img src={this.getIcon()} className="FriendDetailsDialog-bigIcon" alt="Search Result Icon"/>
                </div>

                <div className="FriendDetailsDialog-iconSmaller"> 
                  <img src={this.getIcon()} className="FriendDetailsDialog-smallIcon" alt="Search Result Icon"/>
                </div>

                <div className="FriendDetailsDialog-details">
                  <span className="FriendDetailsDialog-name">{this.props.name}</span>
                  <span className="FriendDetailsDialog-email">{this.props.email}</span>
                </div>
              </div>   

              <div className="FriendDetailsDialog-buttonsContainer">

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