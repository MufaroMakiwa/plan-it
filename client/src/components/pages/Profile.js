
import React, { Component } from "react";
import GoogleLogin, { GoogleLogout } from "react-google-login";
import SideBar from "../modules/SideBar.js";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import {post, get} from "../../utilities.js";
import DemoConstellation from "../../public/DemoConstellation.png";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpenAddTaskDialog: false,
      // currName: "Name",
      currPoints: 0,
      currNumFriends: 0,
    }
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool })
  }

  addTask = (taskObj) => {
    navigate("/current");
  }

  componentDidMount() {
    get('/api/profile/fill', {
      userId: this.props.userId,
    }).then((profile) => {
      this.setState({
        // currName: profile.name,
        currPoints: profile.points,
        currNumFriends: profile.num_friends,
      });
    });
  }

  render() { 
    return ( 
      <div className="Profile-Container" >
        <SideBar 
          link="/profile"
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}
        />
        
        <div className="Profile-Main">
            <div className="Profile-Header">
              <h1 className="Profile-Header-Name"> {this.props.userName} </h1>
              <h1 className="Profile-Header-Stats"> {this.state.currNumFriends} Friends </h1>
              <h1 className="Profile-Header-Stats"> {this.state.currPoints} Points </h1>
            </div>
            <img className="Profile-Picture" src={DemoConstellation} alt="Constellation"/>
            <div className="Profile-Bottom">
              <div className="Profile-Bottom-Container"> 
                <h1 className="Profile-Header-Stats"> Stats </h1>
              </div>
              <div className="Profile-Bottom-Container">
                <h1 className="Profile-Header-Stats"> Accomplishments </h1>
              </div>
            </div>
        </div>

        <AddTaskButton onClick={() => this.setOpenAddTaskDialog(true)}/>

        <AddTaskDialog 
          isOpenAddTaskDialog = {this.state.isOpenAddTaskDialog}
          userId={this.props.userId}
          userName={this.props.userName}
          closeAddTaskDialog = {() => this.setOpenAddTaskDialog(false)}
          onSubmit={this.addTask} >

        </AddTaskDialog>
      </div>
    );
  }
}
 
export default Profile;
