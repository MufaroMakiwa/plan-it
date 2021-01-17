import React, { Component } from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import "./CurrentTask.css";
import DeleteIcon from '@material-ui/icons/Delete';
import { post } from '../../utilities';


class CurrentTask extends Component {
  constructor(props) {
    super(props);  
  }

  getProgress = (completed, duration) => {
    const percentage = Math.round((completed / duration) * 100)
    return percentage + "%";
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


  getCurrentDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;
    return today;
  }


  deleteTask = () => {
    post("/api/tasks/delete", {_id: this.props._id}).then(this.props.onDelete)
  }

  incrementProgress = () => {
    const new_progress = this.props.progress + 1;

    if (new_progress === this.props.duration) {
      const query = {
        _id: this.props._id,
        progress: new_progress,
        is_completed: true,
        date_completed: this.getCurrentDate(),
      }
      post("/api/tasks/update", query).then((taskOj) => {
        this.props.onCompleted()
      })

    } else {
      const query = {
        _id: this.props._id,
        progress: new_progress,
        is_completed: false,
        date_completed: null,
      }
      post("/api/tasks/update", query).then((taskOj) => {
        this.props.onIncrement()
      })
    }
  }

  decrementProgress = () => {
    const new_progress = this.props.progress - 1;
    if (new_progress >= 0) {
      const query = {
        _id: this.props._id,
        progress: new_progress,
      }
      post("/api/tasks/update", query).then((taskOj) => {
        this.props.onDecrement()
      })
    }
  }


  render() { 
    return ( 
      <div className="CurrentTask-container">
        <p className="CurrentTask-taskTitle">{this.props.task_name}</p>

        {(this.props.challenger !== null) && (
        <p className="CurrentTask-challengedBy">{`(Challenged by ${this.props.challenger})`}</p>)}
        <hr className="CurrentTask-divider"></hr>

        <div className="CurrentTask-subContainer">
          <div className="CurrentTask-details">
            <div>
              <p className="CurrentTask-description">Created</p>
              <p>{this.props.created}</p>
            </div>

            <div>
              <p className="CurrentTask-description">Duration</p>
              <p>{`${this.props.duration} ${this.getFrequencyLabel(this.props.duration)}` }</p>
            </div>

            <div>
              <p className="CurrentTask-description">Frequency</p>
              <p>{this.props.frequency}</p>
            </div>
          </div>


          <div className="CurrentTask-updateProgress">
            <div>
              <div className="CurrentTask-progressButton" onClick={this.incrementProgress}>
                <AddIcon/>
              </div>

              <div className="CurrentTask-progressButton" onClick={this.decrementProgress}>
                <RemoveIcon />
              </div>
            </div>

            <div className="CurrentTask-completedLabel">
              <p>{`${this.props.progress} ${this.getFrequencyLabel(this.props.progress)} completed`}</p>
            </div>            
          </div>

          <div className="CurrentTask-delete" onClick={this.deleteTask}> 
            <DeleteIcon fontSize="default" />
          </div>
        </div>

        <div className="CurrentTask-progress">
          <div className="CurrentTask-progressFill" 
               style={{width: this.getProgress(this.props.progress, this.props.duration)}}></div>
        </div>
      </div>
     );
  }
}
 
export default CurrentTask;