import React, { Component } from 'react'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import ScheduleIcon from '@material-ui/icons/Schedule';
import TimelapseIcon from '@material-ui/icons/Timelapse';
import "./ChallengeStatus.css"

class ChallengeStatus extends Component {
  
  constructor(props) {
    super(props);
  }

  getIcon = () => {
    switch (this.props.status) {
      case "Declined":
        return (<CancelIcon className="ChallengeStatus-declined"/>);

      case "In progress":
        return (<TimelapseIcon className="ChallengeStatus-inProgress"/>);
      
      case "Completed":
        return (<CheckCircleIcon className="ChallengeStatus-completed"/>);

      case "Pending":
        return (<ScheduleIcon className="ChallengeStatus-pending"/>);
    }
  }


  render() { 
    return ( 
      <div className="ChallengeStatus-container">
        {this.getIcon()}
        <span className="ChallengeStatus-statusLabel">{this.props.status}</span>
      </div>
     );
  }
}
 
export default ChallengeStatus;