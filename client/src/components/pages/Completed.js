import React, { Component } from 'react';
import SideBar from "../modules/SideBar.js";
import "../../utilities.css";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import CompletedTask from "../modules/CompletedTask.js";
import { navigate } from "@reach/router";
import {get , post} from "../../utilities.js";


class Completed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddTaskDialog: false,
      completed: []
    }
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool })
  }

  componentDidMount() {
    console.log(this.props);
    const query = {
      userId: this.props.userId,
      is_completed: true
    }
    get("/api/tasks/completed", query).then((completed) => {
      this.setState({ completed: completed.reverse() })
    })
  }

  addTask = (taskObj) => {
    navigate("/current");
  }

  render() { 
    let completedList = null;
    const hasChallenges = this.state.completed.length !== 0;

    if (hasChallenges) {
      completedList = this.state.completed.map((completedObj) => (
        <CompletedTask
          key={`Challenge_${completedObj._id}`}
          _id={completedObj._id}
          task_name={completedObj.task_name}
          challenger={completedObj.challenger}
          duration={completedObj.duration}
          frequency={completedObj.frequency}
          points={completedObj.points}
          created={completedObj.created}
          date_completed={completedObj.date_completed}
        />
      ));
    } else {
      {completedList = <div></div>;}
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
          userId={this.props.userId}
          userName={this.props.userName}
          closeAddTaskDialog = {() => this.setOpenAddTaskDialog(false)} 
          onSubmit={this.addTask}>

        </AddTaskDialog>

      </div>
    );
  }
}
 
export default Completed;