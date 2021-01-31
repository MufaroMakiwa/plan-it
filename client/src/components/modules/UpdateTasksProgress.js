import React, { Component } from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import "./UpdateTasksProgress.css";
import { BounceLoader } from "react-spinners";



class UpdateTasksProgress extends Component {

  render() { 
    return (
      <Dialog open>
        <DialogContent >
          <div method="dialog" className="UpdateTasksProgress-container">
            <BounceLoader size={50}/>
            <div className="UpdateTasksProgress-details">
              <span className="UpdateTasksProgress-heading">Updating tasks...</span>
              <span className="UpdateTasksProgress-text">
                You can update your progress or delete a task after your tasks finish updating.
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
 
export default UpdateTasksProgress;