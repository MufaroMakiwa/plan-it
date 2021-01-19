import React, { Component } from 'react'
import CheckIcon from '@material-ui/icons/Check';
import "./Toast.css";

class Toast extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    return ( 
      <div className="Toast-container">
        <div className="Toast-checkIcon">
          <CheckIcon style={{fontSize: 50}}/>
        </div>
        <p className="Toast-label">{this.props.label}</p>
      </div>
     );
  }
}
 
export default Toast;