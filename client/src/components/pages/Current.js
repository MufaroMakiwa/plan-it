import React, { Component } from 'react';
import EmptyState from "../modules/EmptyState.js";
import CurrentTask from "../modules/CurrentTask.js";
import SideBar from "../modules/SideBar.js";


import "./Current.css"
import "../../utilities.css";


import {get , post} from "../../utilities.js";
import { socket } from "../../client-socket.js";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import UpdateTasksProgress from "../modules/UpdateTasksProgress.js";
import Toast from "../modules/Toast.js";
import { DateMethods } from "../modules/DateMethods.js";
import CustomBackground from '../modules/CustomBackground.js';
import NavBar from "../modules/NavBar.js";

import { navigate } from "@reach/router";


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
      lastUpdated: null,
      updatingTasks: false,
    }
  }

  getCurrentTasks = () => {
    get("/api/tasks/current", { userId: this.props.userId }).then((tasks) => {
      this.updateTasks(tasks);    
    })
  }


  getTaskUpdatePromises = (tasks) => {
    let promises = []

    for (let task of tasks) {
      // get the new log date
      const currentLog = DateMethods.resetToStart(task.frequency, new Date());
      const newLog = DateMethods.getPreviousLog(task.frequency, new Date(currentLog));

      // determine the missed logs
      const missedLogs = DateMethods.getMissedLogs(task.frequency, task.previous_progress_log);

      // get the new progress array
      const to_add = Math.min(missedLogs, task.duration - task.progress.length);


      const query = null;

      if (to_add > 0) {
        
        // push the missed logs count to the progress array
        let new_progress = [ ...task.progress ] ;

        for (let i = 0; i < to_add; i++) {
          new_progress.push(0);
        }

        // create the promise post request
        if (new_progress.length < task.duration) {

          // task is not yet complete
          query = {
            _id: task._id,
            is_completed: false,
            progress: new_progress,
            previous_progress_log: newLog.toString(),
            date_completed: null,
            challengerId: task.challengerId,
          }

        } else  {

          // task is now completed
          query = {
            _id: task._id,
            is_completed: true,
            progress: new_progress,
            previous_progress_log: newLog.toString(),
            date_completed: new Date().toString(),
            challengerId: task.challengerId,
          }
        }

      } else {
        // task is up to date

        query = {
          _id: task._id,
          is_completed: task.is_completed,
          progress: task.progress,
          previous_progress_log: task.previous_progress_log,
          date_completed: task.date_completed,
          challengerId: task.challengerId,
        }
      }
      const promise = post("/api/tasks/update", query);

      // add the task to the promises array
      promises.push(promise);
    }
    return promises;
  }


  updateTasks = (tasks) => {
    Promise.all(this.getTaskUpdatePromises(tasks)).then((tasks) => {
      const filtered_tasks = tasks.filter(task => {
        return !task.is_completed;
      })

      this.setState({ 
        tasks: filtered_tasks.reverse(),
        lastUpdated: DateMethods.resetToStartOfDay(new Date()).toString(),
        loading: false
      })
    }).catch ((err) => {
      // ignore the error
    })
  }


  updateTasksBeforeLog = () => {
    this.setState({ updatingTasks: true });
    
    const timer = setTimeout(() => {
      this.setState({ updatingTasks: false });
    }, 4000);

    Promise.all(this.getTaskUpdatePromises(this.state.tasks)).then((tasks) => {
      const filtered_tasks = tasks.filter(task => {
        return !task.is_completed;
      })
      this.setState({ 
        tasks: filtered_tasks,
        lastUpdated: DateMethods.resetToStartOfDa(new Date()).toString(),
      })
    })
    return () => clearTimeout(timer);
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


  completeTask = (_id, duration, progress) => {
    const tasks = this.state.tasks.filter(task => task._id !== _id);
    this.setState({ tasks })
    this.taskStatusNotification(true);

    let total = 0;
    for (let i = 0; i < progress.length; i += 1){
      total += progress[i]
    }
    let completion_percentage = total/duration;
    let completion_factor = Math.pow(completion_percentage, 2);

    post("/api/profile/points", {
      userId: this.props.userId,
      pts: Math.floor(completion_factor * duration * 100),
      coins: Math.floor(completion_factor * duration * 20),
    })
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
          lastUpdated={this.state.lastUpdated}
          updateTasksBeforeLog={this.updateTasksBeforeLog}
          previous_progress_log={taskObj.previous_progress_log}
          isPeriodTaskCompleted={this.isPeriodTaskCompleted(taskObj.frequency, taskObj.previous_progress_log)}
          onIncrement={() => this.incrementProgress(taskObj._id)}
          onDecrement={() => this.decrementProgress(taskObj._id)}
          onDelete = {() => this.deleteTask(taskObj._id)}
          onCompleted={(progress) => this.completeTask(taskObj._id, taskObj.duration, progress)}
        />
      ));
    } else {
      tasksList = <EmptyState />;
    }

    return ( 
      <div className="page-container">

        {/* <AlertDialog /> */}

        <NavBar 
          link="/current"
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}/>

        <SideBar 
          link="/current"
          userName={this.props.userName}
          userIcon={this.props.userIcon}
          handleLogout={this.props.handleLogout}/>
          
        <div className="dummy_div_left"></div>

        <CustomBackground />

        {this.state.loading ? <div></div> : (
          <div className="page_main">
            <div className="tile_box_centered">
              <span className="nav_page_title">
                Current
              </span>

              {tasksList}
            </div>
          </div>
        )}

        <AddTaskButton onClick={() => this.setOpenAddTaskDialog(true)}/>

        <AddTaskDialog 
          isOpenAddTaskDialog = {this.state.isOpenAddTaskDialog}
          userId={this.props.userId}
          userName={this.props.userName}
          closeAddTaskDialog = {() => this.setOpenAddTaskDialog(false)}
          onSubmit={this.addTask} >
        </AddTaskDialog>

        {this.state.displayToastCompleted && (
          <div className="toast toastVisible">
            <Toast label="Task completed"/>
          </div>
        )}
        

        {this.state.displayToastDeleted && (
          <div className="toast toastVisible">
            <Toast label="Task deleted"/>
          </div>
        )}

        {this.state.updatingTasks && (<UpdateTasksProgress />)}
      </div>
    );
  }
}
 
export default Current;