import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React, { Component } from 'react';
import "./AddTaskDialog.css";
import "../../utilities.css";
import { ViewDaySharp } from '@material-ui/icons';


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
    
    const form = document.getElementById("AddTaskDialog-formID");

    if (this.state.name.trim().length < 3) {
      form.elements["taskName"].classList.add("AddTaskDialog-inputError");
      invalid = true;
    }

    if (this.state.duration.trim().length === 0) {
      form.elements["taskDuration"].classList.add("AddTaskDialog-inputError");
      invalid = true;
    }
    (!invalid && this.props.closeAddTaskDialog());
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
    return labels[this.state.frequency]
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
          <form method="dialog" className="AddTaskDialog-container" autoComplete="off" id="AddTaskDialog-formID">
            <div className="AddTaskDialog-inputContainer">           
              <label htmlFor="taskName" className="AddTaskDialog-formLabel u-AddTaskDialog-formLabel">Task</label>
              <input
                type="text"
                placeholder="Enter task name"
                onChange={this.handleNameChange}
                className="AddTaskDialog-nameInput AddTaskDialog-input"
                name="taskName"
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
              <button className="AddTaskDialog-createTaskButton AddTaskDialog-button" onClick={this.handleSubmit}>
                Create task
              </button>

              <button className="AddTaskDialog-cancelButton AddTaskDialog-button" onClick={this.props.closeAddTaskDialog}>
                Cancel
              </button>
            </div> 
          </form>
        
        </DialogContent>

      </Dialog>
    );
  }
}
 
export default AddTaskDialog;