import React, { Component } from 'react';
import SideBar from "../modules/SideBar.js";

import "../../utilities.css";
import "./Challenges.css";

import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import ChallengeTask from "../modules/ChallengeTask.js";
import ChallengeTaskSent from "../modules/ChallengeTaskSent.js";
import { navigate } from '@reach/router';
import {get , post} from "../../utilities.js";
import { socket } from "../../client-socket.js";
import Toast from "../modules/Toast.js";


class Challenges extends Component {
  isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      isOpenAddTaskDialog: false,
      challenges: [],
      displayToastAccepted: false,
      displayToastDeclined: false,
      loading: true,
      displayChallengesSent: false,
      displayChallengesReceived: true,
    }
  }

  getChallenges = () => {
    get("/api/tasks/challenges").then((challenges) => {
      this.setState({ 
        challenges: challenges.reverse(),
        loading: false
       })
    })
  }


  getUpdatedChallenges = (challenges, updatedChallenge) => {
    const newChallenges = challenges.map(prevChallenge => {
      if (prevChallenge._id === updatedChallenge._id) {
        return updatedChallenge;

      } else {
        return prevChallenge;
      }
    })
    return newChallenges;
  }


  componentDidMount() {
    console.log("componentDidMount");
    this.isMounted = true;
    this.getChallenges();

    // listen for events when the user gets a new challenge
    socket.on("new_challenge", (newChallenge) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        challenges: [newChallenge].concat(prevState.challenges),
      }))
    })

    // listen for events when a challenge is accepted
    socket.on("challenge_accepted", (challenge) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        challenges: this.getUpdatedChallenges(prevState.challenges, challenge)
      }))
    })

    // listen to events when a challenge is declined
    socket.on("challenge_declined", (challenge) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        challenges: this.getUpdatedChallenges(prevState.challenges, challenge)
      }))
    })

     // listen to events when a challenge is updated
     socket.on("challenge_updated", (challenge) => {
      if (!this.isMounted) return;
      this.setState((prevState) => ({
        challenges: this.getUpdatedChallenges(prevState.challenges, challenge)
      }))
    })

  }

  componentDidUpdate(prevProps) {
    if (!prevProps.userId && this.props.userId) {
      this.getChallenges();

      // update to previous selection
      const prevState = JSON.parse(localStorage.getItem('challengesState'))
      this.setState({
        displayChallengesReceived: prevState.displayChallengesReceived,
        displayChallengesSent: prevState.displayChallengesSent
      })
    }
  }

  componentWillUnmount() {
    this.isMounted = false;
  }


  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool })
  }

  addTask = (taskObj) => {
    navigate("/current");
  }

  challengeStatusNotification = (isAccepted) => {
    // if bool is true, challenge is accepted else challenge is declined
    if (isAccepted) {
      this.setState({ 
        displayToastAccepted: true,
      })
    } else {
      this.setState({ 
        displayToastDeclined : true,
      })
    }
    
    const timer = setTimeout(() => {
      this.setState({
        displayToastAccepted: false,
        displayToastDeclined: false,
      })
    }, 1000);
    return () => clearTimeout(timer);
  }

  accept = (_id) => {
    const challenges = this.state.challenges.filter(challenge => challenge._id !== _id);
    this.setState({ challenges })
    this.challengeStatusNotification(true)
  }


  decline = (_id) => {
    const challenges = this.state.challenges.filter(challenge => challenge._id !== _id);
    this.setState({ 
      challenges : challenges,
     })
    this.challengeStatusNotification(false)
  }

  toggleReceived = () => {
    if (!this.state.displayChallengesReceived) {
      this.setState({
        displayChallengesSent: false,
        displayChallengesReceived: true,
      })

      localStorage.setItem('challengesState', JSON.stringify({
        displayChallengesSent: false,
        displayChallengesReceived: true,
      }))
    }
  }

  toggleSent = () => {
    if (!this.state.displayChallengesSent) {
      this.setState({
        displayChallengesSent: true,
        displayChallengesReceived: false,
      })

      localStorage.setItem('challengesState', JSON.stringify({
        displayChallengesSent: true,
        displayChallengesReceived: false,
      }))
    }
  }


  displayChallenges = () => {
    let challengesReceived = [];
    let challengesSent = [];

    for (let challengeObj of this.state.challenges) {
      if (challengeObj.userId === this.props.userId) {

        // this is a received challenge
        challengesReceived.push((
          <ChallengeTask
          key={`Challenge_${challengeObj._id}`}
          _id={challengeObj._id}
          task_name={challengeObj.task_name}
          challenger={challengeObj.challenger}
          duration={challengeObj.duration}
          frequency={challengeObj.frequency}
          created={challengeObj.created}
          challengerId={challengeObj.challengerId}
          accept={() => this.accept(challengeObj._id)}
          decline={() => this.decline(challengeObj._id)}/>
        ))

      } else {
        // this is a sent challenge
        challengesSent.push((
          <ChallengeTaskSent
          key={`Challenge_${challengeObj._id}`}
          _id={challengeObj._id}
          task_name={challengeObj.task_name}
          userName={challengeObj.userName}
          duration={challengeObj.duration}
          progress={challengeObj.progress}
          frequency={challengeObj.frequency}
          created={challengeObj.created}
          is_accepted={challengeObj.is_accepted}
          is_completed={challengeObj.is_completed}
          is_challenge={challengeObj.is_challenge}/>
        ))
      }
    }
    if (this.state.displayChallengesReceived) {
      return challengesReceived;

    } else {
      return challengesSent;
    }
  }


  render() { 
    return ( 
      <div className="page-container">
        <SideBar 
          link="/challenges"
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}/>

        {this.state.loading ? <div></div> : (
          <div className="page_main">
            <div className="Challenges-toggleButtons">
              <button 
                className={`Challenges-button ${this.state.displayChallengesReceived ?  "Challenges-buttonSelected" : " Challenges-buttonUnselected"}`}
                onClick={this.toggleReceived}
                style={{marginRight : 12}}>
                Received
              </button>
              
              <button 
                className={`Challenges-button ${this.state.displayChallengesSent ?  "Challenges-buttonSelected" : " Challenges-buttonUnselected"}`} 
                onClick={this.toggleSent}
                style={{marginLeft : 12}}>
                Sent
              </button>
            </div>
            
            {this.displayChallenges()}
          </div>
        )}  

        <AddTaskButton onClick={() => this.setOpenAddTaskDialog(true)}/>

        <AddTaskDialog 
          isOpenAddTaskDialog = {this.state.isOpenAddTaskDialog}
          userId={this.props.userId}
          userName={this.props.userName}
          closeAddTaskDialog = {() => this.setOpenAddTaskDialog(false)} 
          onSubmit={this.addTask}>
        </AddTaskDialog>
      
        <div className={this.state.displayToastAccepted ? "toast toastVisible" : "toast"}>
          <Toast label="Challenge accepted"/>
        </div>

        <div className={this.state.displayToastDeclined ? "toast toastVisible" : "toast"}>
          <Toast label="Challenge declined"/>
        </div>
      </div>
    );
  }
}
 
export default Challenges;