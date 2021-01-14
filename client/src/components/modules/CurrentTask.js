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

  render() { 
    return ( 
      <div className="CurrentTask-container">
        <p className="CurrentTask-taskTitle">{this.props.name}</p>

        <div className="CurrentTask-subContainer">
    
          <section className="CurrentTask-details">
            <div>
              <p className="CurrentTask-description">Created</p>
              <p>{this.props.created}</p>
            </div>

            <div>
              <p className="CurrentTask-description">Duration</p>
              <p>{`${this.props.duration} days`}</p>
            </div>
          </section>

          <section className="CurrentTask-updateProgress">
            <div>
              <div className="CurrentTask-progressButton" onClick={this.props.onIncrement}>
                <AddIcon/>
              </div>

              <div className="CurrentTask-progressButton" onClick={this.props.onDecrement}>
                <RemoveIcon />
              </div>
            </div>

            <div className="CurrentTask-completedLabel">
              <p>{`${this.props.completed} days completed`}</p>
            </div>            
          </section>
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