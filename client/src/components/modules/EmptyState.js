import React, { Component } from 'react'
import "./EmptyState.css"
import '../../utilities.css';
import AddIcon from '@material-ui/icons/Add';


class AddButton extends Component {
  render() {
    return (
      <div className="EmptyState-addButton">
        <AddIcon style={{fontSize : 20}}/>
      </div>      
    )
  }
}

class EmptyState extends Component {
  
  render() { 
    return ( 
      <div className="EmptyState-container">
        <span className="EmptyState-heading">
          {this.props.heading ? this.props.heading : "No tasks!"}
        </span>
        {!this.props.message ? (
          <div className="EmptyState-content">
            <span className="EmptyState-message">Click the</span>
            <AddButton />
            <span className="EmptyState-message">icon at the bottom right corner to add tasks and complete them to earn points.</span>
          </div>         
          ) : (
          <div className="EmptyState-content">
            <span className="EmptyState-message">{this.props.message}</span>
          </div>
        )}
        
      </div>
     );
  }
}
 
export default EmptyState;