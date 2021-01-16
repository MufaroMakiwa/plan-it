import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React, { Component } from 'react';
import "./AddTaskDialog.css";
import "../../utilities.css";
import { ViewDaySharp } from '@material-ui/icons';
import {get, post} from '../../utilities.js';

class AddTaskDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      duration: "",
      frequency: "Daily",
    }
    
  }


  handleSubmit = (event) => {
    
    // validate user input
    let invalid = null;
    console.log(`Name: ${this.state.name}`);
    console.log(`Duration: ${this.state.duration}`);
    
    const taskName = document.getElementById("AddTaskDialog-taskName");
    const taskDuration = document.getElementById("AddTaskDialog-taskDuration");

    if (this.state.name.trim().length < 3) {
      taskName.classList.add("AddTaskDialog-inputError");
      invalid = true;
    }

    if (this.state.duration.trim().length === 0) {
      taskDuration.classList.add("AddTaskDialog-inputError");
      invalid = true;
    }
    console.log(`Found errors: ${invalid}`);

    if (!invalid) {
      this.props.closeAddTaskDialog();
      this.resetState();
      console.log(this.props.userId);
      this.createNewTask();
    }
  }

  createNewTask = () => {
    post('/api/tasks/create', {
      task_name: this.state.name,
      userId: this.props.userId,
      userName: this.props.userName,
      created: "Jan 1st 2021",
      duration: this.state.duration,
      frequency: "Daily",
      is_completed: false,
      date_completed: null,
      progess: 0,
      is_challenge: false,
      challenger: null
    })
  };

  // clear all the entries when the dilog is closed
  resetState = () => {
    this.setState({
      name: "",
      duration: "",
      frequency: "Daily",
    })
  }

  handleNameChange = (event) => {
    const target = event.target;
    const value =  target.value.trim();

    // remove error when user starts typing
    if (target.classList.contains("AddTaskDialog-inputError") && value.length >= 3) {
      target.classList.remove("AddTaskDialog-inputError")
    }

    this.setState({
      name: value,
    });
  };


  handleDurationChange = (event) => {
    const target = event.target;
    const value =  target.value.trim();

    // remove error when user starts typing
    if (target.classList.contains("AddTaskDialog-inputError") && value.length) {
      target.classList.remove("AddTaskDialog-inputError")
    }
    
    this.setState({
      duration: value,
    });
  }

  getFrequencyLabel = () => {
    
    const labels = {
      Daily : "days",
      Weekly : "weeks",
      Monthly : "months"
    }
    return this.state !== null ? labels[this.state.frequency]: "days";
     
  }


  handleFrequencyChange = (event) => {
    this.setState({
      frequency: event.target.value,
    });
  }


  render() { 
    return ( 
      <Dialog open={this.props.isOpenAddTaskDialog}>
        <DialogContent>
          <div method="dialog" className="AddTaskDialog-container" autoComplete="off" id="AddTaskDialog-formID">
            <div className="AddTaskDialog-inputContainer">           
              <label htmlFor="taskName" className="AddTaskDialog-formLabel u-AddTaskDialog-formLabel">Task</label>
              <input
                type="text"
                placeholder="Enter task name"
                onChange={this.handleNameChange}
                className="AddTaskDialog-nameInput AddTaskDialog-input"
                name="taskName"
                autoComplete="off"
                id="AddTaskDialog-taskName">
              </input>
              <span className="AddTaskDialog-errorMessage">Please enter task name with at least 3 characters</span>
            </div>
            
            <div className="AddTaskDialog-inputContainer">           
              <label htmlFor="taskFrequency" className="AddTaskDialog-formLabel">Frequency</label>
              <div className="AddTaskDialog-radioContainer" name="taskFrequency" >
                <label htmlFor="daily" className="AddTaskDialog-label"> 
                  <input 
                    type="radio" 
                    name = "frequency" 
                    id="daily" 
                    className="AddTaskDialog-radioName" 
                    onClick={this.handleFrequencyChange} 
                    value="Daily"
                    defaultChecked/> 
                  <div className="AddTaskDialog-radioButton"></div>
                  Daily
                </label>
                          
                <label htmlFor="weekly" className="AddTaskDialog-label"> 
                  <input 
                    type="radio" 
                    name = "frequency" 
                    id="weekly" 
                    className="AddTaskDialog-radioName"
                    onClick={this.handleFrequencyChange} 
                    value="Weekly"/> 
                  <div className="AddTaskDialog-radioButton"></div>
                  Weekly
                </label>
                      
                <label htmlFor="monthly" className="AddTaskDialog-label"> 
                  <input 
                    type="radio" 
                    name = "frequency" 
                    id="monthly" 
                    className="AddTaskDialog-radioName"
                    onClick={this.handleFrequencyChange} 
                    value="Monthly"/> 
                  <div className="AddTaskDialog-radioButton"></div>
                  Monthly
                </label>
              </div>
              <span style={{visibility: "hidden"}}>No error</span>
            </div>
          
            <div className="AddTaskDialog-inputContainer">
              <label htmlFor="taskDurationLayout" className="AddTaskDialog-formLabel">Duration</label>
              <div name="taskDurationLayout" className="AddTaskDialog-durationContent">
                <div className="AddTaskDialog-durationInputLayout">
                  <input
                    type="number"
                    placeholder="Enter duration"
                    onChange={this.handleDurationChange}
                    className="AddTaskDialog-input"
                    autoComplete="off"
                    min="1"
                    id="AddTaskDialog-taskDuration"
                    name="taskDuration">
                  </input>
                  <span className="AddTaskDialog-errorMessage">Please enter the duration</span>
                </div>  
                <span className="AddTaskDialog-durationLabel">{this.getFrequencyLabel()}</span>
              </div>            
            </div>

           
            <div className="AddTaskDialog-buttonContainer">
            <button className="AddTaskDialog-cancelButton AddTaskDialog-button" onClick={this.props.closeAddTaskDialog}>
                Cancel
              </button>
              
              <button className="AddTaskDialog-createTaskButton AddTaskDialog-button" onClick={this.handleSubmit}>
                Create task
              </button>
            </div> 
          </div>
        
        </DialogContent>

      </Dialog>
    );
  }
}
 
export default AddTaskDialog;