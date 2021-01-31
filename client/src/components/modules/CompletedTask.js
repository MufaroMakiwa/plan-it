import React, { Component } from 'react';
import "./CompletedTask.css";
import { DateMethods } from "./DateMethods.js";
import DeleteIcon from '@material-ui/icons/Delete';
import {get , post} from "../../utilities.js";
import AlertDialog from "../modules/AlertDialog.js";



class CompletedTask extends Component {
  constructor(props){
    super(props);
    this.state = {
      displayAlertDialog: false
    } 
  }


  getFrequencyLabel = (value) => {
    const labels = {
      Daily : "day",
      Weekly : "week",
      Monthly : "month"
    }
    if (value === 1) {
      return labels[this.props.frequency]
    } else {
      return labels[this.props.frequency] + "s";
    }
  }


  getCompletedDays = () => {
    let count = 0;
    for (let log of this.props.progress) {
      if (log === 1) count += 1;
    }
    return count;
  }

  getTaskDetails = () => {
    if (this.props.challenger !== null) {
      //challenger summary
      return (
        <p className="CompletedTask-challengedBy">
          {`(Challenged by ${this.props.challenger} on ${DateMethods.getPrettyDateFormat(this.props.created)})`}
        </p>
        )

    } else {
      // default summary
      return (
        <p className="CompletedTask-challengedBy">
          {`(Created on ${DateMethods.getPrettyDateFormat(this.props.created)})`}
        </p>
        )
    }
  }

  toggleAlertDialog = (bool) => {
    this.setState({
      displayAlertDialog: bool
    })
  }

  deleteTask = () => {
    this.toggleAlertDialog(false);

    const query = {
      _id: this.props._id, 
      is_challenge: this.props.is_challenge,
    }
    post("/api/tasks/completed/delete", query).then(this.props.deleteTask)
  }

  calculatePoints = () => {
    let total = 0;
    for (let i = 0; i < this.props.duration; i += 1){
      total += this.props.progress[i];
    }
    let ratio = total / this.props.duration;
    let factor = Math.pow(ratio, 2);
    return Math.floor(factor * this.props.duration * 100);
  }
  
  render() { 
    let gridCells = [];

    for (let i = 0; i < this.props.duration; i++) {
      switch (this.props.progress[i]) {
        case 1:
          gridCells.push((
            <div 
              className="CompletedTask-progressCell CompletedTask-progressCellDone"
              key={`ProgressCell_${i}`}>
            </div>));
          break;

        case 0:
          gridCells.push((
            <div 
              className="CompletedTask-progressCell CompletedTask-progressCellSkipped"
              key={`ProgressCell_${i}`}>
            </div>))
          break;
      }
    }

    return (
      <div className="CompletedTask-container">
        <p className="CompletedTask-taskTitle">{this.props.task_name}</p>
        
        {this.getTaskDetails()}

        <hr className="CompletedTask-divider"></hr>

        <div className="CompletedTask-subContainer">
          <div className="CompletedTask-details">

            <div>
              <p className="CompletedTask-description">Completed</p>
              <p className="task_summary">{DateMethods.getDateFormat(this.props.date_completed)}</p>
            </div>

            <div>
              <p className="CompletedTask-description">Duration</p>
              <p className="task_summary">{`${this.props.duration} ${this.getFrequencyLabel(this.props.duration)}` }</p>
            </div>

          </div>

          <div className="CompletedTask-details">

            <div>
              <p className="CompletedTask-description">Frequency</p>
              <p className="task_summary">{this.props.frequency}</p>
            </div>

            <div>
              <p className="CompletedTask-description">Points</p>
              <p className="task_summary">{this.calculatePoints()}</p>
            </div>
            
          </div>

          <div className="CompletedTask-buttonContainer">
            <button 
              className="CompletedTask-sendTaskButton CompletedTask-button"
              onClick={() => {this.toggleAlertDialog(true)}}>
              DELETE
            </button>

            <div className="CompletedTask-delete">
              <DeleteIcon />
            </div>
            

          </div>
        </div>

        <hr className="CompletedTask-divider"></hr>

        <div className="CompletedTask-progressDetails">
          <div className="CompletedTask-progressLabels">
            <span>Progress summary</span>
            <span>{`${this.getCompletedDays()}/${this.props.duration}`}</span>
          </div>

          <div className="CompletedTask-progress">
            {gridCells}
          </div>
        </div>

        {this.state.displayAlertDialog && (
          <AlertDialog 
            title="Are you sure you want to delete this task?"
            onNegative={() => this.toggleAlertDialog(false)}
            onPositive={this.deleteTask}/>
        )}

      </div>
    );
  }
}
 
export default CompletedTask;