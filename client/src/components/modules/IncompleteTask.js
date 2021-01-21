import React, { Component } from 'react';
import "./IncompleteTask.css";

class IncompleteTask extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    return ( 
      <div className="IncompleteTask-container">
        <span className="IncompleteTask-taskName">{this.props.taskName}</span>
        <button>Try Again</button>
        <button>Archive</button>
      </div>
     );
  }
}
 
export default IncompleteTask;