import React, { Component } from 'react';
import AddIcon from '@material-ui/icons/Add';
import "./AddTaskButton.css"


class AddTaskButton extends Component {

  constructor(props) {
    super(props);
  }

  
  render() { 
    return (  
      <div className="AddTaskButton-addButton" onClick={this.props.onClick}>
        <AddIcon />
      </div>
    );
  }
}
 
export default AddTaskButton;