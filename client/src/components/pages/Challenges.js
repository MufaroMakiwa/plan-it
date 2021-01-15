import React, { Component } from 'react';
import SideBar from "../modules/SideBar.js";
import "../../utilities.css";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";

class Challenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddTaskDialog: false,
    }
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool })
  }

  render() { 
    return ( 
      <div className="page-container">
        <SideBar link="/challenges"/>
        <div className="page_main">
          Challenges page
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
 
export default Challenges;