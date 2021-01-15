import React, { Component } from 'react';
import "./CompletedTask.css";

class CompletedTask extends Component {
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
      <div className="CompletedTask-container">
        <p className="CompletedTask-taskTitle">{this.props.name}</p>

        <div className="CompletedTask-subContainer">
    
          <div className="CompletedTask-details">
            <div>
              <p className="CompletedTask-description">Created</p>
              <p>{this.props.created}</p>
            </div>

            <div>
              <p className="CompletedTask-description">Duration</p>
              <p>{`${this.props.duration} ${this.getFrequencyLabel(this.props.frequency)}` }</p>
            </div>

            <div>
              <p className="CompletedTask-description">Challenged by</p>
              <p>{this.props.challengedBy}</p>
            </div>

          </div>

          <div className="CompletedTask-details">
            <div>
              <p className="CompletedTask-description">Completed</p>
              <p>{this.props.completed}</p>
            </div>

            <div>
              <p className="CompletedTask-description">Frequency</p>
              <p>{this.props.frequency}</p>
            </div>

            <div>
              <p className="CompletedTask-description">Points</p>
              <p>{this.props.points}</p>
            </div>
          </div>

          <div className="CompletedTask-buttonContainer">
            <button className="CompletedTask-acceptButton CompletedTask-button">
              CHALLENGE FRIENDS
            </button>

          </div>
        </div>
      </div>
    );
  }
}
 
export default CompletedTask;