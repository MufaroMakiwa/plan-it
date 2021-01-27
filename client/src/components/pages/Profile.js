
import React, { Component } from "react";
import SideBar from "../modules/SideBar.js";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import {post, get} from "../../utilities.js";

import Constellation_0_Image from "../../public/Constellation_0_Points.png";
import Constellation_1000_Image from "../../public/Constellation_1000_Points.png";
import Constellation_2000_Image from "../../public/Constellation_2000_Points.png";
import Constellation_3000_Image from "../../public/Constellation_3000_Points.png";
import Constellation_4000_Image from "../../public/Constellation_4000_Points.png";
import Constellation_5000_Image from "../../public/Constellation_5000_Points.png";

import Icon_1 from "../../public/Profile_Icon_1.png";
import Icon_2 from "../../public/Profile_Icon_2.png";
import Icon_3 from "../../public/Profile_Icon_3.png";
import Icon_4 from "../../public/Profile_Icon_4.png";
import Icon_5 from "../../public/Profile_Icon_5.png";
import Icon_6 from "../../public/Profile_Icon_6.png";

import Rocket_1 from "../../public/Player_Rocket_1.png";
import Rocket_2 from "../../public/Player_Rocket_2.png";
import Rocket_3 from "../../public/Player_Rocket_3.png";
import Rocket_4 from "../../public/Player_Rocket_4.png";
import Rocket_5 from "../../public/Player_Rocket_5.png";
import Rocket_6 from "../../public/Player_Rocket_6.png";

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
      currPoints: 0,
      currNumFriends: 0,
      currCoins: 0,
      currSkin: 1,
      currIcon: this.props.userIcon,
      available_skins: [true, false, false, false, false, false],
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
        currCoins: profile.coins,
        currIcon: profile.icon,
        currSkin: profile.skin,
        available_skins: profile.available_skins,
        loading: false
      });
      this.selectImage(profile.points);
    });
  }

  getIcon = () => {
    if (this.state.currIcon === 1) { return Icon_1 }
    else if (this.state.currIcon === 2) { return Icon_2 }
    else if (this.state.currIcon === 3) { return Icon_3 }
    else if (this.state.currIcon === 4) { return Icon_4 }
    else if (this.state.currIcon === 5) { return Icon_5 }
    else if (this.state.currIcon === 6) { return Icon_6 }
    else { return Icon_1 }
  }

  changeIcon = (iconNum) => {
    post("/api/profile/icon", {
      userId: this.props.userId,
      icon: iconNum,
    }).then(() => {
      this.setState({
        currIcon: iconNum,
      });
    });
  }

  buySkin = (num) => {
    console.log(this.state.available_skins);
    if (this.state.currCoins >= 20) {
      let available_now = this.state.available_skins;
      available_now[num - 1] = true;

      post("/api/profile/buyskin", {
        userId: this.props.userId,
        coins: 20,
        skin: num,
        available_skins: available_now,
      })
      this.setState({
        available_skins: available_now,
        currCoins: this.state.currCoins - 20,
      })
    }
  }

  changeSkin = (skinNum) => {
    post("/api/profile/skin", {
      userId: this.props.userId,
      skin: skinNum,
    }).then(() => {
      this.setState({
        currSkin: skinNum,
      });
    });
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
          userIcon={this.state.currIcon}
          handleLogout={this.props.handleLogout}/>

        <div className="dummy_div_left"></div>

        <CustomBackground />
        
        {this.state.loading ? (<div></div>) : (
          <div className="page_main">
            <div className="tile_box_centered Profile-container">

              <div className="Profile-Header">
                <div className="Profile-Header-Part-1">
                  <img src={this.getIcon()} className="Profile-Header-Image" alt="User Icon"/>
                  <div className="Profile-details">
                    <span className="Profile-Header-Name"> {this.props.userName} </span>
                    <span className="Profile-Header-Email">{this.props.userEmail}</span>
                  </div>
                </div>

                <div className="Profile-statsContainer">
                  <span className="Profile-Header-Stats"> {this.state.currCoins} Coins </span>
                  <span className="Profile-Header-Stats"> {this.state.currPoints} Points </span>
                </div>
                
              </div>

              <div className="Profile-Constellation-Container" onClick={this.playRocketTag}>
                <img className="Profile-Constellation" src={this.state.currImage} alt="Constellation" />
              </div>

              <div className="Profile-Bottom-Container">
                <span className="Profile-Bottom-Text"> Select your profile icon below: </span>
                <div className="Profile-Icon-Container">
                  <img src={Icon_1} className="Profile-Bottom-Image" alt="Icon Option 1" onClick={() => this.changeIcon(1)}/>
                  <img src={Icon_2} className="Profile-Bottom-Image" alt="Icon Option 2" onClick={() => this.changeIcon(2)}/>
                  <img src={Icon_3} className="Profile-Bottom-Image" alt="Icon Option 3" onClick={() => this.changeIcon(3)}/>
                  <img src={Icon_4} className="Profile-Bottom-Image" alt="Icon Option 4" onClick={() => this.changeIcon(4)}/>
                  <img src={Icon_5} className="Profile-Bottom-Image" alt="Icon Option 5" onClick={() => this.changeIcon(5)}/>
                  <img src={Icon_6} className="Profile-Bottom-Image" alt="Icon Option 5" onClick={() => this.changeIcon(6)}/>
                </div>
              </div>

              <div className="Profile-Bottom-Container">
                <span className="Profile-Bottom-Text"> Select your rocket tag skin below: </span>
                <div className="Profile-Icon-Container">
                  {this.state.available_skins[0] ?
                    (<div>
                      <img src={Rocket_1} className="Profile-Bottom-Image-Uncaptioned" alt="Rocket Option 1" onClick={() => this.changeSkin(1)}/> 
                    </div>):
                    (<div>
                      <img src={Rocket_1} className="Profile-Bottom-Image" alt="Rocket Option 1" onClick={() => this.buySkin(1)}/>
                      <figcaption className="Profile-Caption"> 20 Coins </figcaption>
                    </div>)}

                  {this.state.available_skins[1] ?
                    (<div>
                      <img src={Rocket_2} className="Profile-Bottom-Image-Uncaptioned" alt="Rocket Option 2" onClick={() => this.changeSkin(2)}/> 
                    </div>):
                    (<div>
                      <img src={Rocket_2} className="Profile-Bottom-Image" alt="Rocket Option 2" onClick={() => this.buySkin(2)}/>
                      <figcaption className="Profile-Caption"> 20 Coins </figcaption>
                    </div>)}

                    {this.state.available_skins[2] ?
                    (<div>
                      <img src={Rocket_3} className="Profile-Bottom-Image-Uncaptioned" alt="Rocket Option 3" onClick={() => this.changeSkin(3)}/> 
                    </div>):
                    (<div>
                      <img src={Rocket_3} className="Profile-Bottom-Image" alt="Rocket Option 3" onClick={() => this.buySkin(3)}/>
                      <figcaption className="Profile-Caption"> 20 Coins </figcaption>
                    </div>)}

                    {this.state.available_skins[3] ?
                    (<div>
                      <img src={Rocket_4} className="Profile-Bottom-Image-Uncaptioned" alt="Rocket Option 4" onClick={() => this.changeSkin(4)}/> 
                    </div>):
                    (<div>
                      <img src={Rocket_4} className="Profile-Bottom-Image" alt="Rocket Option 4" onClick={() => this.buySkin(4)}/>
                      <figcaption className="Profile-Caption"> 20 Coins </figcaption>
                    </div>)}

                    {this.state.available_skins[4] ?
                    (<div>
                      <img src={Rocket_5} className="Profile-Bottom-Image-Uncaptioned" alt="Rocket Option 5" onClick={() => this.changeSkin(5)}/> 
                    </div>):
                    (<div>
                      <img src={Rocket_5} className="Profile-Bottom-Image" alt="Rocket Option 5" onClick={() => this.buySkin(5)}/>
                      <figcaption className="Profile-Caption"> 20 Coins </figcaption>
                    </div>)}

                    {this.state.available_skins[5] ?
                    (<div>
                      <img src={Rocket_6} className="Profile-Bottom-Image-Uncaptioned" alt="Rocket Option 6" onClick={() => this.changeSkin(6)}/> 
                    </div>):
                    (<div>
                      <img src={Rocket_6} className="Profile-Bottom-Image" alt="Rocket Option 6" onClick={() => this.buySkin(6)}/>
                      <figcaption className="Profile-Caption"> 20 Coins </figcaption>
                    </div>)}
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