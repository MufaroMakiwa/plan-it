import React, { Component } from 'react'
import "./CustomBackground.css"

class CustomBackground extends Component {
  
  render() { 
    return (
      <div className="Background_main">
        <div className="stars stars_main"></div>
        <div className="stars2 stars_main"></div>
        <div className="stars3 stars_main"></div>    
      </div>
    )
  }
}
 
export default CustomBackground;