import React, { Component } from 'react';
import "./ChallengeTask.css";
import {get , post} from "../../utilities.js";
import { DateMethods } from "./DateMethods.js";

class ChallengeTask extends Component {
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

  acceptChallenge = () => {
    const reset = DateMethods.resetToStart(this.props.frequency, new Date())
    const prev_log = DateMethods.getPreviousLog(this.props.frequency, reset)

    const query = {
      _id: this.props._id,
      challengerId: this.props.challengerId,
      previous_progress_log: prev_log.toString(),
    }
    post("/api/tasks/challenges/accept", query).then((challenge) => {
      this.props.accept();
    })
  }

  declineChallenge = () => {
    const query = {
      _id: this.props._id,
      challengerId: this.props.challengerId,
    }

    post("/api/tasks/challenges/decline", query).then((challenge) => {
      this.props.decline();
    })
  }

  render() { 
    return (
      <div className="ChallengeTask-container">
        <p className="ChallengeTask-taskTitle">{this.props.task_name}</p>
        <p className="ChallengeTask-challengedBy">{`(Challenged by ${this.props.challenger})`}</p>
        <hr className="ChallengeTask-divider"></hr>

        <div className="ChallengeTask-subContainer">
          <div className="ChallengeTask-details">
            <div>
              <p className="ChallengeTask-description">Duration</p>
              <p>{`${this.props.duration} ${this.getFrequencyLabel(this.props.duration)}` }</p>
            </div>

            <div>
              <p className="ChallengeTask-description">Frequency</p>
              <p>{this.props.frequency}</p>
            </div>

          </div>

          <div className="ChallengeTask-buttonContainer">
            <button 
              className="ChallengeTask-acceptButton ChallengeTask-button"
              onClick={this.acceptChallenge}>
              ACCEPT
            </button>

            <button 
              className="ChallengeTask-declineButton ChallengeTask-button"
              onClick={this.declineChallenge}>
              DECLINE
            </button>
          </div>
        </div>
      </div>
    );
  }
}
 
export default ChallengeTask;