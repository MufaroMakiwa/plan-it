import React, { Component } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import "./SearchSuggestion.css";


class SearchSuggestion extends Component {
  
  render() { 
    return ( 
      <div className="SearchSuggestion-container">

        <div className="SearchSuggestion-iconBigger"> 
          <AccountCircleIcon style={{fontSize: 50}}/>
        </div>

        <div className="SearchSuggestion-iconSmaller"> 
          <AccountCircleIcon style={{fontSize: 40}}/>
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