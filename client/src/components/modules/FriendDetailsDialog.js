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
            <div className="FriendDetailsDialog-iconBigger"> 
              <AccountCircleIcon style={{fontSize: 50}}/>
            </div>

            <div className="FriendDetailsDialog-iconSmaller"> 
              <AccountCircleIcon style={{fontSize: 40}}/>
            </div>

            <div className="FriendDetailsDialog-details">
              <span className="FriendDetailsDialog-name">Mufaro Makiwa</span>
              <span className="FriendDetailsDialog-email">mufaroemakiwa@gmail.com</span>
            </div>

            <button>
              Click me
            </button>

            <button>
              Click next
            </button>
          </div>

        </DialogContent>
      </Dialog>
     );
  }
}
 
export default FriendDetailsDialog;