
import React, { Component } from "react";
import SideBar from "../modules/SideBar.js";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import {post, get} from "../../utilities.js";
import RocketTagRoll from "../modules/RocketTagRoll.js";
import Constellation_0_Image from "../../public/Constellation_0_Points.png";
import Constellation_1000_Image from "../../public/Constellation_1000_Points.png";
import Constellation_2000_Image from "../../public/Constellation_2000_Points.png";
import Constellation_3000_Image from "../../public/Constellation_3000_Points.png";
import Constellation_4000_Image from "../../public/Constellation_4000_Points.png";
import Constellation_5000_Image from "../../public/Constellation_5000_Points.png";
import { navigate } from "@reach/router";

import "../../utilities.css";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddTaskDialog: false,
      currPoints: "",
      currNumFriends: "",
      loading: true
    }
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool })
  }

  addTask = (taskObj) => {
    navigate("/current");
  }

  playRocketTag = () => {
    navigate("/rocketTag");
  }

  selectImage = (pts) => {
    if (pts === 0) { this.setState ({currImage: Constellation_0_Image}) }
    else if (pts < 1000) { this.setState ({currImage: Constellation_1000_Image}) }
    else if (pts < 2000) { this.setState ({currImage: Constellation_2000_Image}) }
    else if (pts < 3000) { this.setState ({currImage: Constellation_3000_Image}) }
    else if (pts < 4000) { this.setState ({currImage: Constellation_4000_Image}) }
    else { this.setState ({currImage: Constellation_5000_Image}) }
  }

  componentDidMount() {
    this.getProfile();
  }


  componentDidUpdate(prevProps) {
    if (!prevProps.userId && this.props.userId) {
      this.getProfile();
    }
  }


  getProfile = () => {
    get('/api/profile/fill', {
      userId: this.props.userId,
    }).then((profile) => {
      this.setState({
        currPoints: profile.points,
        currNumFriends: profile.num_friends,
        loading: false
      });
      this.selectImage(profile.points);
    });
  }

  renderBackground = () => {
    return (
      <div className="page">
        <div className="stars stars_main"></div>
        <div className="stars2 stars_main"></div>
        <div className="stars3 stars_main"></div>    
      </div>
    )
  }

  render() { 
    return ( 
      <div className="page-container">
        <SideBar 
          link="/profile"
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}/>

        {this.renderBackground()}
        
        {this.state.loading ? (<div></div>) : (
          <div className="page_main">
            <div className="Profile-Header">
              <h1 className="Profile-Header-Name"> {this.props.userName} </h1>
              <h1 className="Profile-Header-Stats"> {this.state.currNumFriends} Friends </h1>
              <h1 className="Profile-Header-Stats"> {this.state.currPoints} Points </h1>
            </div>

            <div className="Profile-PictureContainer">
              <img className="Profile-Picture" src={this.state.currImage} alt="Constellation" />
            </div>
        
          </div>
        )}

        <RocketTagRoll />

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