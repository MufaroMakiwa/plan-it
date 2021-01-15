import React, { Component } from 'react';
import SideBar from "../modules/SideBar.js";
import "../../utilities.css";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";

class Profile extends Component {
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
        <SideBar link="/profile"/>
        <div className="page_main">
          This is the profile page. We need to change the link to include the user id. This would have to updated on the sideBar link and in App.js under profile element
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
 
export default Profile;