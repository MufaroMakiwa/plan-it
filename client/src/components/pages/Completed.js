import React, { Component } from 'react';
import SideBar from "../modules/SideBar.js";
import "../../utilities.css";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import CompletedTask from "../modules/CompletedTask.js";

class Completed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddTaskDialog: false,

      completed: [
        {
          id: 0,
          name: "Go for a swim",
          challengedBy: "Shreya Gupta",
          duration: 20,
          frequency: "Daily",
          points: 10,
          created: "01/21/2021",
          completed: "01/02/2021"
        },

        {
          id: 1,
          name: "Eat 20 Papa John's Hawaaian Pizza",
          challengedBy: null,
          duration: 2,
          frequency: "Weekly",
          points: null,
          created: "01/21/2021",
          completed: "01/02/2021"
        },

        {
          id: 2,
          name: "Run 20 miles on the treadmill",
          challengedBy: "Mufaro Makiwa",
          duration: 12,
          frequency: "Monthly",
          points: 100,
          created: "01/21/2021",
          completed: "01/02/2021"
        },

      ]
    }
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool })
  }

  render() { 
    let completedList = null;
    const hasChallenges = this.state.completed.length !== 0;

    if (hasChallenges) {
      completedList = this.state.completed.map((completedObj) => (
        <CompletedTask
          key={`Challenge_${completedObj.id}`}
          _id={completedObj.id}
          name={completedObj.name}
          challengedBy={completedObj.challengedBy}
          duration={completedObj.duration}
          frequency={completedObj.frequency}
          points={completedObj.points}
          created={completedObj.created}
          completed={completedObj.completed}
        />
      ));
    } else {
      {completedList = <div>No Tasks!</div>;}
    }

    return ( 
      <div className="page-container">
        <SideBar 
          link="/completed"
          handleLogout={this.props.handleLogout}/>
        <div className="page_main">
          {completedList}
        </div>

        <AddTaskButton onClick={() => this.setOpenAddTaskDialog(true)}/>

        <AddTaskDialog 
          isOpenAddTaskDialog = {this.state.isOpenAddTaskDialog}
          closeAddTaskDialog = {() => this.setOpenAddTaskDialog(false)} >

        </AddTaskDialog>

      </div>
    );
  }
}
 
export default Completed;