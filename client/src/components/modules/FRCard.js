import React, { Component } from 'react';
import {get, post} from '../../utilities.js';
import "./FRCard.css";
import Icon_1 from "../../public/Profile_Icon_1.png";
import Icon_2 from "../../public/Profile_Icon_2.png";
import Icon_3 from "../../public/Profile_Icon_3.png";
import Icon_4 from "../../public/Profile_Icon_4.png";
import Icon_5 from "../../public/Profile_Icon_5.png";
import Icon_6 from "../../public/Profile_Icon_6.png";


class FRCard extends Component {
  constructor(props) {
    super(props);  
    this.state = {
      icon: null,
    }
  }

  componentDidMount() {
    this.getInfo();
  }

  accept = () => {
    post("/api/friend/accept", {friendId: this.props.friendId}).then(friend => {
      this.props.onAccept();
    })
  }

  decline = () => {
    post("/api/friend/request/decline", {friendId: this.props.friendId}).then((friend) => {
      this.props.onDecline();
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
      <div className="FRCard-container">
        <div className="FRCard-detailsContainer">
          <div className="FRCard-iconBigger">
            {!this.state.icon ? (<div></div>) : (
              <img src={this.state.icon} className="FRCard-bigIcon" alt="Search Result Icon"/>
            )}
          </div>

          <div className="FRCard-iconSmaller"> 
            {!this.state.icon ? (<div></div>) : (
              <img src={this.state.icon} className="FRCard-smallIcon" alt="Search Result Icon"/>
            )}
          </div>

          <div className="FRCard-details">
            <span className="FRCard-name">{this.props.friendName}</span>
            <span className="FRCard-email">{this.props.friendEmail}</span>
          </div>
        </div>   

        <div className="FRCard-buttonsContainer">

          <button 
            className="FRCard-button FRCard-buttonCancel"
            onClick={this.decline}>
            Decline
          </button>
        
          <button 
            className="FRCard-button FRCard-buttonAction"
            onClick={this.accept}>
            Accept
          </button>
        </div>   
      </div>
     );
  }
}
 
export default FRCard;
