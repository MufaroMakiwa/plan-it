import React, { Component } from 'react';
import "./CompletedTask.css";
import { DateMethods } from "./DateMethods.js";

class CompletedTask extends Component {
  constructor(props){
    super(props);
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


  sendChallenge = () => {
    this.props.sendChallengeNotification();
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
        {(this.props.challenger !== null) && (
        <p className="CurrentTask-challengedBy">{`(Challenged by ${this.props.challenger})`}</p>)}

        <hr className="CompletedTask-divider"></hr>

        <div className="CompletedTask-subContainer">
          <div className="CompletedTask-details">
            <div>
              <p className="CompletedTask-description">Created</p>
              <p>{DateMethods.getDateFormat(this.props.created)}</p>
            </div>

            <div>
              <p className="CompletedTask-description">Duration</p>
              <p>{`${this.props.duration} ${this.getFrequencyLabel(this.props.duration)}` }</p>
            </div>

          </div>

          <div className="CompletedTask-details">
            <div>
              <p className="CompletedTask-description">Completed</p>
              <p>{DateMethods.getDateFormat(this.props.date_completed)}</p>
            </div>

            <div>
              <p className="CompletedTask-description">Frequency</p>
              <p>{this.props.frequency}</p>
            </div>
            
          </div>

          <div className="CompletedTask-buttonContainer">
            <button 
              className="CompletedTask-sendTaskButton CompletedTask-button"
              onClick={this.sendChallenge}>
              CHALLENGE FRIENDS
            </button>
          </div>
        </div>

        <div className="CurrentTask-progressDetails">
          <div className="CurrentTask-progressLabels">
            <span>Progress summary</span>
          </div>

          <div className="CurrentTask-progress">
            {gridCells}
          </div>
        </div>
      </div>
    );
  }
}
 
export default CompletedTask;