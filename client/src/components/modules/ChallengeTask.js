import React, { Component } from 'react';
import "./ChallengeTask.css";
import {get , post} from "../../utilities.js";
import AlertDialog from "../modules/AlertDialog.js";
import { DateMethods } from "./DateMethods.js";

class ChallengeTask extends Component {
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

  toggleAlertDialog = (bool) => {
    this.setState({
      displayAlertDialog: bool
    })
  }

  declineChallenge = () => {
    this.toggleAlertDialog(false);

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
        <p className="ChallengeTask-challengedBy">
          {`(Challenged by ${this.props.challenger} on ${DateMethods.getPrettyDateFormat(this.props.created)})`}
        </p>
        <hr className="ChallengeTask-divider"></hr>

        <div className="ChallengeTask-subContainer">
          <div className="ChallengeTask-details">
            <div>
              <p className="ChallengeTask-description">Duration</p>
              <p className="ChallengeTask-summary">{`${this.props.duration} ${this.getFrequencyLabel(this.props.duration)}` }</p>
            </div>

            <div>
              <p className="ChallengeTask-description">Frequency</p>
              <p className="ChallengeTask-summary">{this.props.frequency}</p>
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
              onClick={() => {this.toggleAlertDialog(true)}}>
              DECLINE
            </button>
          </div>
        </div>

        {this.state.displayAlertDialog && (
          <AlertDialog 
            title="Are you sure you don't want this challenge?"
            onNegative={() => this.toggleAlertDialog(false)}
            onPositive={this.declineChallenge}/>
        )}

      </div>
    );
  }
}
 
export default ChallengeTask;