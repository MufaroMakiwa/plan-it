import React, { Component } from 'react'
import IncompleteTask from "./IncompleteTask.js";
import "./IncompleteTasksDialog.css";


class IncompleteTasksDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      incompleteTasks : [
        "Eat McDonalds",
        "Go to the gym",
        "Go for a swim",
        "Eat Papa John's",
        "Get a haircut",
        "Eat shrimp every hour",
        "Eat ice cream everyday",
        "Exercise everyday",
        "Go for a run every day",
        "More items to do",
        "Do this again",
        "I am tired of you",
        "Overflow test",
        "Still adding more items",
        "Trying to get results",
      ]
    }
  }

  componentDidMount() {
    console.log("I re-rendered. To check when the user is on the screen close to timeout and see what happens")
  }
  
  render() { 
    const incompleteTasks = this.state.incompleteTasks.map((incompleteTask) => (
      <IncompleteTask 
      key={`Task_${this.state.incompleteTasks.indexOf(incompleteTask)}`}
        taskName = {incompleteTask}/>
    ))

    return (   
      <div className="IncompleteTasksDialog-container">
        <div className="IncompleteTasksDialog-title">
          <span>Incomplete Tasks</span>
        </div>
        
        {incompleteTasks}
      </div>     
     );
  }
}
 
export default IncompleteTasksDialog;