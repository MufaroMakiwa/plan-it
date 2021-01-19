import React, { Component } from 'react';
import "./Current.css"
import CurrentTask from "../modules/CurrentTask.js";
import SideBar from "../modules/SideBar.js";

import "../../utilities.css";
import {get , post} from "../../utilities.js";

import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import Toast from "../modules/Toast.js";



class Current extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddTaskDialog: false,
      tasks: [],
      displayToastDeleted: false,
      displayToastCompleted: false
    }
  }

  getCurrentTasks = () => {
    get("/api/tasks/current", { userId: this.props.userId }).then((tasks) => {
      this.setState({ tasks: tasks.reverse() })
    })
  }

  componentDidMount() {
    this.getCurrentTasks();
  }

  componentDidUpdate(prevProps) {
    console.log(`The previous props: ${prevProps.userId}`)

    if (!prevProps.userId && this.props.userId) {
      this.getCurrentTasks();
    }
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool })
  }

  incrementProgress = (_id) => {
    const tasks = this.state.tasks.map(task => {
      task.progress = (task._id === _id && task.progress < task.duration) ? task.progress + 1 : task.progress;
      return task;
    })
    this.setState({ tasks })
  }

  decrementProgress = (_id) => {
    const tasks = this.state.tasks.map(task => {
      task.progress = (task._id === _id && task.progress > 0) ? task.progress - 1 : task.progress;
      return task;
    })
    this.setState({ tasks })
  }

  deleteTask = (_id) => {
    const tasks = this.state.tasks.filter(task => task._id !== _id);
    this.setState({ tasks })
    this.taskStatusNotification(false);
  }

  taskStatusNotification = (isCompleted) => {
    // if bool is true, task is completed else task is deleled
    if (isCompleted) {
      this.setState({ 
        displayToastCompleted: true,
      })
    } else {
      this.setState({ 
        displayToastDeleted: true,
      })
    }
    
    const timer = setTimeout(() => {
      console.log(this.state)
      this.setState({
        displayToastCompleted: false,
        displayToastDeleted: false,
      })
    }, 2000);
    return () => clearTimeout(timer);
  }


  addTask = (taskObj) => {
    this.setState({
      tasks: [taskObj].concat(this.state.tasks),
    })
  }

  getToastLabel = () => {
    let label;

  }

  completeTask = (_id) => {
    const tasks = this.state.tasks.filter(task => task._id !== _id);
    this.setState({ tasks })
    this.taskStatusNotification(true);
  }

  render() { 
    let tasksList = null;
    const hasTasks = this.state.tasks.length !== 0;

    if (hasTasks) {
      tasksList = this.state.tasks.map((taskObj) => (
        <CurrentTask
          key={`Task_${taskObj._id}`}
          _id={taskObj._id}
          task_name={taskObj.task_name}
          created={taskObj.created}
          duration={taskObj.duration}
          frequency={taskObj.frequency}
          progress={taskObj.progress}
          challenger={taskObj.challenger}
          onIncrement={() => this.incrementProgress(taskObj._id)}
          onDecrement={() => this.decrementProgress(taskObj._id)}
          onDelete = {() => this.deleteTask(taskObj._id)}
          onCompleted={() => this.completeTask(taskObj._id)}
        />
      ));
    } else {
      tasksList = <div>No Tasks!</div>;
    }

    return ( 
      <div className="page-container">
        <SideBar 
          link="/current"
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}/>

        <div className="page_main">
          {tasksList}

        </div>

        <AddTaskButton onClick={() => this.setOpenAddTaskDialog(true)}/>

        <AddTaskDialog 
          isOpenAddTaskDialog = {this.state.isOpenAddTaskDialog}
          userId={this.props.userId}
          userName={this.props.userName}
          closeAddTaskDialog = {() => this.setOpenAddTaskDialog(false)}
          onSubmit={this.addTask} >
        </AddTaskDialog>

        <div className={this.state.displayToastCompleted ? "toast toastVisible" : "toast"}>
          <Toast label="Task completed"/>
        </div>

        <div className={this.state.displayToastDeleted ? "toast toastVisible" : "toast"}>
          <Toast label="Task deleted"/>
        </div>

      </div>
    );
  }
}
 
export default Current;