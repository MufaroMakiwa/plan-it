import React, { Component } from 'react';

import CurrentTask from "../modules/CurrentTask.js";
import SideBar from "../modules/SideBar.js";

import "./Current.css"
import "../modules/background.css"
import "../../utilities.css";

import {get , post} from "../../utilities.js";
import { socket } from "../../client-socket.js";

import IncompleteTasksDialog from "../modules/IncompleteTasksDialog.js";
import RocketTagRoll from "../modules/RocketTagRoll.js";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import Toast from "../modules/Toast.js";
import { DateMethods } from "../modules/DateMethods.js";



class Current extends Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isOpenAddTaskDialog: false,
      tasks: [],
      displayToastDeleted: false,
      displayToastCompleted: false,
      loading: true, 
      hasIncompleteTasks: false,
    }
  }

  getCurrentTasks = () => {
    get("/api/tasks/current", { userId: this.props.userId }).then((tasks) => {
      this.setState({ 
        tasks: tasks.reverse(),
        loading: false
       })
    })
  }
  
  componentDidMount() {
    this.isMounted = true;
    this.getCurrentTasks();

    // listen to update the page at 12 midnight
    socket.on("update_current_tasks", (val) => {
      if (!this.isMounted) return;
      this.getCurrentTasks();
    })
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.userId && this.props.userId) {
      this.getCurrentTasks();
    }
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool })
  }

  incrementProgress = (_id) => {
    const tasks = this.state.tasks.map(task => {
      if (task._id === _id && task.progress.length < task.duration) {
        const newLog = DateMethods.resetToStart(task.frequency, new Date());
        task.progress = task.progress.concat([1]);
        task.previous_progress_log = newLog.toString();
      }
      return task;
    })
    this.setState({ tasks })
  }

  isPeriodTaskCompleted = (frequency, previous_progress_log) => {
    const currentPeriod = DateMethods.resetToStart(frequency, new Date())
    return currentPeriod.toString() === previous_progress_log;
  }

  decrementProgress = (_id) => {
    const tasks = this.state.tasks.map(task => {
      if (task._id === _id && task.progress.length > 0) {
        const newLog = DateMethods.getPreviousLog(task.frequency, new Date(task.previous_progress_log));
        task.progress = task.progress.slice(0, -1);
        task.previous_progress_log = newLog.toString();
      }
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
      this.setState({
        displayToastCompleted: false,
        displayToastDeleted: false,
      })
    }, 1000);
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

  completeTask = (_id, duration) => {
    const tasks = this.state.tasks.filter(task => task._id !== _id);
    this.setState({ tasks })
    this.taskStatusNotification(true);

    post("/api/profile/points", {
      userId: this.props.userId,
      pts: duration * 10,
    })
  }

  renderBackground = () => {
    return (
      <div className="page">
        <div className="stars stars_main"></div>
        <div className="stars2 stars_main"></div>
        <div className="stars3 stars_main"></div>    
      </div>
    )
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
          is_challenge={taskObj.is_challenge}
          challengerId={taskObj.challengerId}
          previous_progress_log={taskObj.previous_progress_log}
          isPeriodTaskCompleted={this.isPeriodTaskCompleted(taskObj.frequency, taskObj.previous_progress_log)}
          onIncrement={() => this.incrementProgress(taskObj._id)}
          onDecrement={() => this.decrementProgress(taskObj._id)}
          onDelete = {() => this.deleteTask(taskObj._id)}
          onCompleted={() => this.completeTask(taskObj._id, taskObj.duration)}
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

        {this.renderBackground()}
        {this.state.loading ? <div></div> : (
          <div className="page_main">
            <div>
              {tasksList}
            </div>

            {this.state.hasIncompleteTasks && (
              <div className="Current-incompleteTaskLayout">
                <div className="Current-dimTransparent"></div>

                <div className="Current-incompleteTasksDialog">
                  <IncompleteTasksDialog/>
                </div>
              </div>
            )}
          </div>
        )}

        <RocketTagRoll /> 

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