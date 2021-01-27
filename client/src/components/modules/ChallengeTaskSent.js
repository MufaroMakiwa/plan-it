import React, { Component } from 'react';
import ChallengeStatus from "./ChallengeStatus.js";
import "./ChallengeTaskSent.css";
import { DateMethods } from "./DateMethods.js";

class ChallengeTaskSent extends Component {
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


  getStatus = () => {
    if (this.props.is_completed) {
      // render completed status
      return "Completed";

    } else if (this.props.is_accepted) {
      // render in progress
      return "In progress";

    } else if (this.props.is_challenge) {
      // render pending
      return "Pending";

    } else {
      // render it is declined
      return "Declined";
    }
  }

  displayProgressBar = () => {
    return this.getStatus() === "Completed" || this.getStatus() === "In progress";
  }

  // if a task is in progress, display the days past else display days logged
  getProgressStatusCount = () => {
    if (this.getStatus() === "Completed") {
      let count = 0;
      for (let log of this.props.progress) {
        if (log === 1) count += 1;
      }
      return count;

    } else {
      return this.props.progress.length;
    }

    
    

  }

  render() { 
    let gridCells = [];

    for (let i = 0; i < this.props.duration; i++) {
      switch (this.props.progress[i]) {
        case 1:
          gridCells.push((
            <div 
              className="ChallengeTaskSent-progressCell ChallengeTaskSent-progressCellDone"
              key={`ProgressCell_${i}`}>
            </div>));
          break;

        case 0:
          gridCells.push((
            <div 
              className="ChallengeTaskSent-progressCell ChallengeTaskSent-progressCellSkipped"
              key={`ProgressCell_${i}`}>
            </div>))
          break;

        default:
          gridCells.push((
            <div 
              className="ChallengeTaskSent-progressCell ChallengeTaskSent-progressNotDone"
              key={`ProgressCell_${i}`}>
            </div>))
          break;
      }
    }

    return (
      <div className="ChallengeTaskSent-container">
        <p className="ChallengeTaskSent-taskTitle">{this.props.task_name}</p>
        <p className="ChallengeTaskSent-sentTo">
          {`(Sent to ${this.props.userName} on ${DateMethods.getPrettyDateFormat(this.props.created)})`}
        </p>
        <hr className="ChallengeTaskSent-divider"></hr>

        <div className="ChallengeTask-subContainer">
          <div className="ChallengeTaskSent-details">
            <div>
              <p className="ChallengeTaskSent-description">Duration</p>
              <p className="task_summary">{`${this.props.duration} ${this.getFrequencyLabel(this.props.duration)}` }</p>
            </div>

            <div>
              <p className="ChallengeTaskSent-description">Frequency</p>
              <p className="task_summary">{this.props.frequency}</p>
            </div>

          </div>

          <div className="ChallengeTaskSent-statusContainer">
            <span className="ChallengeTaskSent-statusLabel">
              STATUS
            </span>

            <div className="ChallengeTaskSent-statusElement">
              <ChallengeStatus status={this.getStatus()} />
            </div>
          </div>
        </div>

        {this.displayProgressBar() && (<hr className="CurrentTask-divider"></hr>)}

        {this.displayProgressBar() && (
          <div className="ChallengeTaskSent-progressDetails">
            <div className="ChallengeTaskSent-progressLabels">
              <span>{this.getStatus() === "Completed" ? "Progress summary" : "Progress"}</span>
              <span>{`${this.getProgressStatusCount()}/${this.props.duration}`}</span>
            </div>

            <div className="ChallengeTaskSent-progress">
              {gridCells}
            </div>
          </div>
        )}

      </div>
    );
  }
}
 
export default ChallengeTaskSent;