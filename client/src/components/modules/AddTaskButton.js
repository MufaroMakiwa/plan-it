import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import "./AddTaskButton.css"


class AddTaskButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    }
  }


  displaAddTaskDialogBox = () => {
    // update state
    this.setState({ isOpen: true })

    // display the AddTaskButton dialog box
    console.log("To handle logic for opening the FAB");

  }
  
  render() { 
    return (  
      <div className="AddTaskButton-addButton" onClick={this.displaAddTaskDialogBox}>
        <AddIcon />
      </div>
    );
  }
}
 
export default AddTaskButton;