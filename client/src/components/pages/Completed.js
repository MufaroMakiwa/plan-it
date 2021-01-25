import React, { Component } from 'react';
import SideBar from "../modules/SideBar.js";
import "../../utilities.css";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import CompletedTask from "../modules/CompletedTask.js";
import Toast from "../modules/Toast.js";
import { navigate } from "@reach/router";
import {get , post} from "../../utilities.js";
import CustomBackground from '../modules/CustomBackground.js';
import NavBar from "../modules/NavBar.js";

import "./Completed.css";


class Completed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddTaskDialog: false,
      completed: [],
      displayToast: false,
      loading: true
    }
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool })
  }

  getCompleted = () => {
    const query = {
      userId: this.props.userId,
      is_completed: true
    }
    get("/api/tasks/completed", query).then((completed) => {
      this.setState({ 
        completed: completed.reverse(),
        loading: false })
    })
  }

  componentDidMount() {
    this.getCompleted();
  }


  componentDidUpdate(prevProps) {
    if (!prevProps.userId && this.props.userId) {
      this.getCompleted();
    }
  }


  addTask = (taskObj) => {
    navigate("/current");
  }

  deleteTask = (_id) => {
    const completed = this.state.completed.filter(task => task._id !== _id);
    this.setState({ completed })
    this.deleteNotification();
  }


  deleteNotification = () => {
    this.setState({displayToast: true})
    const timer = setTimeout(() => {
      console.log(this.state)
      this.setState({
        displayToast: false
      })
    }, 1000);
    return () => clearTimeout(timer);
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
          progress={completedObj.progress}
          is_challenge={completedObj.is_challenge}
          challengerId={completedObj.challengerId}
          created={completedObj.created}
          date_completed={completedObj.date_completed}
          deleteTask={() => this.deleteTask(completedObj._id)}
          sendChallengeNotification={this.sendChallengeNotification}/>
      ));
    } else {
      {completedList = <div></div>;}
    }

    return ( 
      <div className="page-container">

        <NavBar 
          link="/completed"
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}/>

        <SideBar 
          link="/completed"
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}/>

        <div className="dummy_div_left"></div>

        <CustomBackground />

        {this.state.loading ? <div></div> : (
          <div className="page_main">
            <div className="tile_box_centered">
              <span className="nav_page_title">
                Completed
              </span>
              {completedList} 
            </div>              
          </div>
        )}

        {this.state.displayToast && (
          <div className="toast toastVisible">
            <Toast label="Deleted"/>
          </div>
        )}
        
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