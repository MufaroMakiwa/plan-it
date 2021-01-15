import React, { Component } from 'react';
import "./ChallengeTask.css";

class ChallengeTask extends Component {
  constructor(props){
    super(props);
  }


  getFrequencyLabel = (freq) => {
    const labels = {
      Daily : "days",
      Weekly : "weeks",
      Monthly : "months"
    }
    return labels[freq]
  }


  render() { 
    return (
      <div className="ChallengeTask-container">
        <p className="ChallengeTask-taskTitle">{this.props.name}</p>

        <div className="ChallengeTask-subContainer">
    
          <div className="ChallengeTask-details">
            <div>
              <p className="ChallengeTask-description">Challenged by</p>
              <p>{this.props.challengedBy}</p>
            </div>

            <div>
              <p className="ChallengeTask-description">Points</p>
              <p>{this.props.points}</p>
            </div>
          </div>

          <div className="ChallengeTask-details">
            <div>
              <p className="ChallengeTask-description">Duration</p>
              <p>{`${this.props.duration} ${this.getFrequencyLabel(this.props.frequency)}` }</p>
            </div>

            <div>
              <p className="ChallengeTask-description">Frequency</p>
              <p>{this.props.frequency}</p>
            </div>

          </div>

          <div className="ChallengeTask-buttonContainer">
            <button className="ChallengeTask-acceptButton ChallengeTask-button">
              ACCEPT
            </button>

            <button className="ChallengeTask-declineButton ChallengeTask-button">
              DECLINE
            </button>
          </div>
        </div>
      </div>
    );
  }
}
 
export default ChallengeTask;