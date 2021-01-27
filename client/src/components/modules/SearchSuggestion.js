import React, { Component } from 'react'
import "./SearchSuggestion.css";
import Icon_1 from "../../public/Profile_Icon_1.png";
import Icon_2 from "../../public/Profile_Icon_2.png";
import Icon_3 from "../../public/Profile_Icon_3.png";
import Icon_4 from "../../public/Profile_Icon_4.png";
import Icon_5 from "../../public/Profile_Icon_5.png";
import Icon_6 from "../../public/Profile_Icon_6.png";


class SearchSuggestion extends Component {
  constructor (props) {
    super(props)
  }

  getIcon = () => {
    if ( this.props.icon === 1 ) { return Icon_1 }
    else if ( this.props.icon === 2 ) {return Icon_2 }
    else if ( this.props.icon === 3 ) {return Icon_3 }
    else if ( this.props.icon === 4 ) {return Icon_4 }
    else if ( this.props.icon === 5 ) {return Icon_5 }
    else if ( this.props.icon === 6 ) {return Icon_6 }
    else { return Icon_1 }
  }
  
  render() { 
    return ( 
      <div className="SearchSuggestion-container" onClick={this.props.onClick}>

        <div className="SearchSuggestion-iconBigger">
          <img src={this.getIcon()} className="SearchSuggestion-bigIcon" alt="Search Result Icon"/>
        </div>

        <div className="SearchSuggestion-iconSmaller"> 
          <img src={this.getIcon()} className="SearchSuggestion-smallIcon" alt="Search Result Icon"/>
        </div>

        <div className="SearchSuggestion-details">
          <span className="SearchSuggestion-name">{this.props.name}</span>
          <span className="SearchSuggestion-email">{this.props.email}</span>
        </div>
        
      </div>
     );
  }
}
 
export default SearchSuggestion;