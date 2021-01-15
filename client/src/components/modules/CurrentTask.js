import React, { Component } from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import "./CurrentTask.css";


class CurrentTask extends Component {
  constructor(props) {
    super(props);  
  }

  getProgress = (completed, duration) => {
    const percentage = Math.round((completed / duration) * 100)
    return percentage + "%";
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
    const frequencyLabel = this.getFrequencyLabel(this.props.frequency);
    return ( 
      <div className="CurrentTask-container">
        <p className="CurrentTask-taskTitle">{this.props.name}</p>

        {(this.props.points !== 0) && (
        <p className="CurrentTask-challengedBy">{`(Challenged by ${this.props.challengedBy})`}</p>)}
        <hr className="CurrentTask-divider"></hr>

        <div className="CurrentTask-subContainer">
          <div className="CurrentTask-details">
            <div>
              <p className="CurrentTask-description">Created</p>
              <p>{this.props.created}</p>
            </div>

            <div>
              <p className="CurrentTask-description">Duration</p>
              <p>{`${this.props.duration} ${frequencyLabel}` }</p>
            </div>
          </div>

          <div className="CurrentTask-details">
            <div>
              <p className="CurrentTask-description">Frequency</p>
              <p>{this.props.frequency}</p>
            </div>

            <div>
              <p className="CurrentTask-description">Points</p>
              <p>{this.props.points}</p>
            </div>
          </div>

          <div className="CurrentTask-updateProgress">
            <div>
              <div className="CurrentTask-progressButton" onClick={this.props.onIncrement}>
                <AddIcon/>
              </div>

              <div className="CurrentTask-progressButton" onClick={this.props.onDecrement}>
                <RemoveIcon />
              </div>
            </div>

            <div className="CurrentTask-completedLabel">
              <p>{`${this.props.completed} ${frequencyLabel} completed`}</p>
            </div>            
          </div>
        </div>

        <div className="CurrentTask-progress">
          <div className="CurrentTask-progressFill" 
               style={{width: this.getProgress(this.props.completed, this.props.duration)}}></div>
        </div>
      </div>
     );
  }
}
 
export default CurrentTask;