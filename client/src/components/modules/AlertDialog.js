import React, { Component } from 'react'
import { Dialog, DialogContent } from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import "./AlertDialog.css"


class AlertDialog extends Component {
  
  render() { 
    return (
      <Dialog open>
        <DialogContent>
          <div method="dialog" className="AlertDialog-container">

            <div>
              <WarningIcon />
            </div>
            
            <div className="AlertDialog-title">
              {this.props.title}
            </div>

            <div 
              className="AlertDialog-buttonsContainer">

              <button 
                className="AlertDialog-button AlertDialog-buttonCancel"
                onClick={this.props.onNegative}>
                Cancel
              </button>
            
              <button 
                className="AlertDialog-button AlertDialog-buttonAction"
                onClick={this.props.onPositive}>
                Delete
              </button>
              </div>   

          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
 
export default AlertDialog;