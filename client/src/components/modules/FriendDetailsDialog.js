import React, { Component } from 'react'
import { Dialog, DialogContent } from '@material-ui/core';
import "./FriendDetailsDialog.css"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

class FriendDetailsDialog extends Component {

  
  render() { 
    return ( 
      <Dialog open>
        <DialogContent>
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

            <div className="FriendDetailsDialog-buttonsContainer">
              <button 
                className="FriendDetailsDialog-button FriendDetailsDialog-buttonCancel"
                onClick={this.props.closeDialog}>
                Cancel
              </button>

              <button className="FriendDetailsDialog-button FriendDetailsDialog-buttonAction">
                Send request
              </button>
            </div>   
          </div>

        </DialogContent>
      </Dialog>
     );
  }
}
 
export default FriendDetailsDialog;