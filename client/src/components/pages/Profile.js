
import React, { Component } from "react";
import SideBar from "../modules/SideBar.js";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import {post, get} from "../../utilities.js";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import Constellation_0_Image from "../../public/Constellation_0_Points.png";
import Constellation_1000_Image from "../../public/Constellation_1000_Points.png";
import Constellation_2000_Image from "../../public/Constellation_2000_Points.png";
import Constellation_3000_Image from "../../public/Constellation_3000_Points.png";
import Constellation_4000_Image from "../../public/Constellation_4000_Points.png";
import Constellation_5000_Image from "../../public/Constellation_5000_Points.png";

import Icon_1 from "../../public/Profile_Icon_1.png";
import Icon_2 from "../../public/Profile_Icon_2.png";

import { navigate } from "@reach/router";
import CustomBackground from '../modules/CustomBackground.js';
import NavBar from "../modules/NavBar.js";

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
    // if (pts === 0) { this.setState ({currImage: Constellation_0_Image}) }
    // else if (pts < 1000) { this.setState ({currImage: Constellation_1000_Image}) }
    // else if (pts < 2000) { this.setState ({currImage: Constellation_2000_Image}) }
    // else if (pts < 3000) { this.setState ({currImage: Constellation_3000_Image}) }
    // else if (pts < 4000) { this.setState ({currImage: Constellation_4000_Image}) }
    // else { this.setState ({currImage: Constellation_5000_Image}) }
    this.setState ({currImage: Constellation_5000_Image})
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

  changeIcon = (iconNum) => {
    console.log(iconNum);
  }

  render() { 
    return ( 
      <div className="page-container">

        <NavBar
          link="/profile" 
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}/>

        <SideBar 
          link="/profile"
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}/>

        <div className="dummy_div_left"></div>

        <CustomBackground />
        
        {this.state.loading ? (<div></div>) : (
          <div className="page_main">
            <div className="tile_box_centered">
              <div className="Profile-Header">
                <div className="Profile-Header-Part-1">
                  <img src={Icon_1} className="Profile-Header-Image" alt="User Icon"/>
                  <h1 className="Profile-Header-Name"> {this.props.userName} </h1>
                </div>
                <h1 className="Profile-Header-Stats"> {this.state.currPoints} Coins </h1>
                <h1 className="Profile-Header-Stats"> {this.state.currPoints} Points </h1>
              </div>

              <div className="Profile-Constellation-Container" onClick={this.playRocketTag}>
                <img className="Profile-Constellation" src={this.state.currImage} alt="Constellation" />
              </div>

              <div className="Profile-Bottom-Container">
                <h1 className="Profile-Bottom-Text"> Select your profile icon below: </h1>
                <div className="Profile-Icon-Container">
                  <img src={Icon_1} className="Profile-Bottom-Image" alt="Icon Option 1" onClick={() => this.changeIcon(1)}/>
                  <img src={Icon_2} className="Profile-Bottom-Image" alt="Icon Option 2" onClick={() => this.changeIcon(2)}/>
                  <img src={Icon_1} className="Profile-Bottom-Image" alt="Icon Option 3" onClick={() => this.changeIcon(3)}/>
                  <img src={Icon_2} className="Profile-Bottom-Image" alt="Icon Option 4" onClick={() => this.changeIcon(4)}/>
                  <img src={Icon_1} className="Profile-Bottom-Image" alt="Icon Option 5" onClick={() => this.changeIcon(5)}/>
                </div>
              </div>
            </div> 
          </div>
        )}

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