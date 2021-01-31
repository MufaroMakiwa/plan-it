import React, { Component } from 'react';
import { navigate } from "@reach/router";
import "./SideBar.css";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { GoogleLogout } from 'react-google-login';
import {get, post} from '../../utilities.js';
import { socket } from "../../client-socket.js";
import Profile_Icon_1 from "../../public/Profile_Icon_1.png";
import Profile_Icon_2 from "../../public/Profile_Icon_2.png";
import Profile_Icon_3 from "../../public/Profile_Icon_3.png";
import Profile_Icon_4 from "../../public/Profile_Icon_4.png";
import Profile_Icon_5 from "../../public/Profile_Icon_5.png";
import Profile_Icon_6 from "../../public/Profile_Icon_6.png";

const GOOGLE_CLIENT_ID = "428252784086-go863k9aj8g435320oq90m85ma6odcul.apps.googleusercontent.com";


class SideBar extends Component {
  isMounted = false;

  constructor(props) {
      super(props);
      this.state = {
        challengesCount: 0,
        friendRequestsCount: 0,
        animateChallengesNotificationIcon: false,
        animateFriendsNotificationIcon: false,
        iconNum: this.props.userIcon,
        loading: true,
      }
  }

  getChallengesCount = () => {
    get("/api/tasks/challenges/received").then((challenges) => {
      if (!this.isMounted) return;
      this.setState({ 
        challengesCount: challenges.length
      })
    })

    // listen for events when the user gets a new challenge
    socket.on("new_challenge", (newChallenge) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        challengesCount: prevState.challengesCount + 1,
        animateChallengesNotificationIcon: true
      }))
      this.animateChallengesNotificationIcon()
    })

    // listen for events when user declines a challenge
    socket.on("challenge_declined", (newChallenge) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        challengesCount: prevState.challengesCount - 1,
      }))
    })

    // listen for events when user accepts a challenge
    socket.on("challenge_accepted", (newChallenge) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        challengesCount: prevState.challengesCount - 1,
      }))
    })
  }


  getFriendRequestsCount = () => {
    get("/api/friend/requests").then((friendRequests) => {
      if (!this.isMounted) return;
      this.setState({ 
        friendRequestsCount: friendRequests.length
      })
    })

    // listen for events when a friend request is received
    socket.on("friend_request_received", (friend) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        animateFriendsNotificationIcon: true,
        friendRequestsCount: prevState.friendRequestsCount + 1,
      }))
      this.animateFriendsNotificationIcon()
    })

    // listen for events when a friend request is cancelled
    socket.on("friend_request_cancelled", (friendId) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        friendRequestsCount: prevState.friendRequestsCount - 1,
      }))
    })

    // listen for events when a friend request is cancelled
    socket.on("request_declined", (friendId) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        friendRequestsCount: prevState.friendRequestsCount - 1,
      }))
    })

    // listen for events when the user gets a new friend
    socket.on("friend_request_accepted", (friendId) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        friendRequestsCount: prevState.friendRequestsCount - 1,
      }))
    })

  }


  animateChallengesNotificationIcon = () => {
    const timer = setTimeout(() => {
      this.setState({
        animateChallengesNotificationIcon: false,
      })
    }, 1000);
    return () => clearTimeout(timer);
  }


  animateFriendsNotificationIcon = () => {
    const timer = setTimeout(() => {
      this.setState({
        animateFriendsNotificationIcon: false,
      })
    }, 1000);
    return () => clearTimeout(timer);
  }

  componentWillUnmount() {
    this.isMounted = false;
  }

  openRocketTag = () => {
    navigate("/rocketTag");
  }

  componentDidMount() {
    this.isMounted = true;
    this.getChallengesCount();
    this.getFriendRequestsCount();
    this.getIconNum();
  }


  handleSubmit = (link) => {
    if (link === this.props.link) {
      return;
    }
    navigate(link);
  }

  getIconNum = () => {
    get('/api/profile/fill', {
      userId: this.props.userId,
    }).then((profile) => {
      this.setState({ 
        iconNum: profile.icon, 
        loading: false,
      })
    });
  }

  getIcon = (num) => {
    if ( num === 1 ) { return Profile_Icon_1 }
    else if ( num == 2 ) { return Profile_Icon_2 }
    else if ( num == 3 ) { return Profile_Icon_3 }
    else if ( num == 4 ) { return Profile_Icon_4 }
    else if ( num == 5 ) { return Profile_Icon_5 }
    else if ( num == 6 ) { return Profile_Icon_6 }
    else { return Profile_Icon_1 }
  }

  render() {
    return (
      <div className={`SideBar-container ${!this.props.displayAsDrawer ? "SideBar-containerResponsive" : "SideBar-containerDrawer"}`}>
        {!this.props.displayAsDrawer && 
          <div className="SideBar-nameContainer" onClick={() => this.handleSubmit("/current")}>
          </div>
        } 

        <div to="/profile" 
          onClick={() =>this.handleSubmit("/profile")}  
          className={`SideBar-profile ${"/profile" === this.props.link ? "SideBar-profileSelected" : ""}`}> 
          {this.state.loading ? <div className="SideBar-usericon"></div> : (      
            <img src={"/profile" === this.props.link ? this.getIcon(this.props.userIcon) : this.getIcon(this.state.iconNum)} className="SideBar-usericon" alt="User Icon"/>
          )}
          <p className={this.props.userName ? "SideBar-username" : "SideBar-username SideBar-usernameHidden"}>
            {this.props.userName ? this.props.userName: "Placeholder"}
          </p>   
        </div>
        
        <hr className="SideBar-divider"></hr>

        <ul className="SideBar-menus">
          <li key="current" onClick={() =>this.handleSubmit("/current")}>
            <div className={"/current" === this.props.link ? "SideBar-rowSelected" : "SideBar-row"}>
              <div>Current</div>
            </div>          
          </li>

          <li key="challenges" onClick={() =>this.handleSubmit("/challenges")}>
            <div className={"/challenges" === this.props.link ? "SideBar-rowSelected" : "SideBar-row"} >
              <div>Challenges</div>       
                <span className={`SideBar-notifications ${this.state.animateChallengesNotificationIcon ? "SideBar-notificationsUpdate" : ""} 
                                  ${this.state.challengesCount > 0 ? "" : "SideBar-notificationsHidden"}`}>
                  {this.state.challengesCount}
                </span>          
            </div>
          </li>

          

          <li key="friends" onClick={() =>this.handleSubmit("/friends")}>
            <div to="/Friends" className={"/friends" === this.props.link ? "SideBar-rowSelected" : "SideBar-row"} >
              <div>Friends</div> 
                <span className={`SideBar-notifications ${this.state.animateFriendsNotificationIcon ? "SideBar-notificationsUpdate" : ""} 
                                  ${this.state.friendRequestsCount > 0 ? "" : "SideBar-notificationsHidden"}`}>
                  {this.state.friendRequestsCount}
                </span>
            </div>
          </li>
          

          <li key="completed" onClick={() =>this.handleSubmit("/completed")}>
            <div to="/completed" className={"/completed" === this.props.link ? "SideBar-rowSelected" : "SideBar-row"} >
              <div>Completed</div> 
            </div>
          </li>
        </ul> 

        <hr className="SideBar-divider"></hr>
        
        <div className="SideBar-rocketTag">
          <div className="SideBar-tagBall" onClick={this.openRocketTag}></div>
        </div>


        <div className="SideBar-signOutContainer">
          <hr className="SideBar-horizontalLine" />
            <GoogleLogout 
              className="SideBar-buttongoogle" 
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={this.props.handleLogout}
              onFailure={(err) => console.log(err)}/>
        </div>
      
      </div>
    );
  }
}
 
export default SideBar;