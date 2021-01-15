import React, { Component } from 'react';
import "./Current.css"
import CurrentTask from "../modules/CurrentTask.js";
import SideBar from "../modules/SideBar.js";
import "../../utilities.css";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";


class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddTaskDialog: false,

      tasks: [
        {
          id: 0,
          name: "Go for a swim",
          created: "20/01/2021",
          duration: 20,
          completed: 10
        },

        {
          id: 1,
          name: "Eat 20 Papa John's Hawaaian Pizza",
          created: "01/06/2021",
          duration: 14,
          completed: 2
        },

        {
          id: 2,
          name: "Run 20 miles on the treadmill",
          created: "16/01/2021",
          duration: 30,
          completed: 20
        },

        {
          id: 3,
          name: "Read a novel",
          created: "19/01/2021",
          duration: 21,
          completed: 12
        },

        {
          id: 4,
          name: "Practice soccer freestyle",
          created: "01/01/2021",
          duration: 31,
          completed: 12
        }
      ]
    }
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool })
  }

  incrementProgress = (id) => {
    const tasks = this.state.tasks.map(task => {
      task.completed = (task.id === id && task.completed < task.duration) ? task.completed + 1 : task.completed;
      return task;
    })
    this.setState({ tasks })
  }

  decrementProgress = (id) => {
    const tasks = this.state.tasks.map(task => {
      task.completed = (task.id === id && task.completed > 0) ? task.completed - 1 : task.completed;
      return task;
    })
    this.setState({ tasks })
  }

  render() { 
    let tasksList = null;
    const hasTasks = this.state.tasks.length !== 0;

    if (hasTasks) {
      tasksList = this.state.tasks.map((taskObj) => (
        <CurrentTask
          key={`Task_${taskObj.id}`}
          _id={taskObj.id}
          name={taskObj.name}
          created={taskObj.created}
          duration={taskObj.duration}
          completed={taskObj.completed}
          onIncrement={() => this.incrementProgress(taskObj.id)}
          onDecrement={() => this.decrementProgress(taskObj.id)}
        />
      ));
    } else {
      tasksList = <div>No Tasks!</div>;
    }

    return ( 
        <div className="page-container">
          <SideBar link="/current"/>
          <div className="page_main">
            {tasksList}
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
 
export default Current;