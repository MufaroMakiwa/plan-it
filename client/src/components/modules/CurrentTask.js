import React, { Component } from 'react';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import "./CurrentTask.css";
import DeleteIcon from '@material-ui/icons/Delete';
import { post } from '../../utilities';
import { DateMethods } from "./DateMethods.js";

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


  deleteTask = () => {
    post("/api/tasks/delete", {_id: this.props._id}).then(this.props.onDelete)
  }


  incrementProgress = () => {
    const newLog = DateMethods.resetToStart(this.props.frequency, new Date());
    
    if (newLog.toString() === this.props.previous_progress_log) {
      console.log("You have logged today's progress already")
      return;
    }
    

    const new_progress = this.props.progress.concat([1]);
    if (new_progress.length >= this.props.duration) {
      const query = {
        _id: this.props._id,
        progress: new_progress,
        is_completed: true,
        date_completed: new Date().toString(),
        previous_progress_log: newLog.toString(),
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
        previous_progress_log: newLog.toString(),
      }
      post("/api/tasks/update", query).then((taskOj) => {
        this.props.onIncrement()
      })
    }
  }

  decrementProgress = () => {
    const currentPeriod = DateMethods.resetToStart(this.props.frequency, new Date());

    if (currentPeriod.toString() !== this.props.previous_progress_log) {
      console.log("You cannot decrement progress now")
      return;
    }

    const prevLog = DateMethods.getPreviousLog(this.props.frequency, currentPeriod);
    const new_progress = this.props.progress.slice(0, -1);
    
    if (this.props.progress.length > 0) {
      const query = {
        _id: this.props._id,
        progress: new_progress,
        is_completed: false,
        date_completed: null,
        previous_progress_log: prevLog.toString(),
      }
      post("/api/tasks/update", query).then((taskOj) => {
        this.props.onDecrement()
      })
    }
  }

  getProgressSummary = (frequency, isPeriodTaskCompleted) => {
    const labels = {
      Daily : "today's",
      Weekly : "this week's",
      Monthly : "this month's"
    }
    if (isPeriodTaskCompleted) {
      return `You have completed ${labels[frequency]} task`;

    } else {
      return `You have not completed ${labels[frequency]} task`;
    }
    
  }


  render() { 
    let gridCells = [];

    for (let i = 0; i < this.props.duration; i++) {
      switch (this.props.progress[i]) {
        case 1:
          gridCells.push((
            <div 
              className="CurrentTask-progressCell CurrentTask-progressCellDone"
              key={`ProgressCell_${i}`}>
            </div>));
          break;

        case 0:
          gridCells.push((
            <div 
              className="CurrentTask-progressCell CurrentTask-progressCellSkipped"
              key={`ProgressCell_${i}`}>
            </div>))
          break;

        default:
          gridCells.push((
            <div 
              className="CurrentTask-progressCell CurrentTask-progressNotDone"
              key={`ProgressCell_${i}`}>
            </div>))
          break;
      }
    }

    return (
      <div className="CurrentTask-container">
        <p className="CurrentTask-taskTitle">{this.props.task_name}</p>

        {(this.props.challenger !== null) && (
        <p className="CurrentTask-challengedBy">{`(Challenged by ${this.props.challenger})`}</p>)}
        <hr className="CurrentTask-divider"></hr>

        <div className="CurrentTask-subContainer">
          <div className="CurrentTask-details">
            <div>
              <p className="CurrentTask-description">{this.props.challenger !== null ? "Challenged" : "Created"}</p>
              <p>{DateMethods.getDateFormat(this.props.created)}</p>
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
              <p>{`${this.props.progress.length} ${this.getFrequencyLabel(this.props.progress.length)} completed`}</p>
            </div>            
          </div>

          <div className="CurrentTask-delete" onClick={this.deleteTask}> 
            <DeleteIcon fontSize="default" />
          </div>
        </div>

        <div className="CurrentTask-progress">
          {gridCells}
          {/* <div className="CurrentTask-progressFill" 
            style={{width: this.getProgress(this.props.progress.length, this.props.duration)}}></div> */}
        </div>

        <div className={this.props.isPeriodTaskCompleted ? "CurrentTask-progressSummaryDone" : "CurrentTask-progressSummaryNotDone"}>
          <span>{this.getProgressSummary(this.props.frequency, this.props.isPeriodTaskCompleted)}</span>
        </div>
      </div>
     );
  }
}
 
export default CurrentTask;