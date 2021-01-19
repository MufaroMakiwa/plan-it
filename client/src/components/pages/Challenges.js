import React, { Component } from 'react';
import SideBar from "../modules/SideBar.js";
import "../../utilities.css";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import ChallengeTask from "../modules/ChallengeTask.js";
import { navigate } from '@reach/router';
import {get , post} from "../../utilities.js";
import Toast from "../modules/Toast.js";


class Challenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddTaskDialog: false,
      challenges: [],
      displayToastAccepted: false,
      displayToastDeclined: false
    }
  }

  getChallenges = () => {
    get("/api/tasks/challenges", { userId: this.props.userId }).then((challenges) => {
      this.setState({ challenges: challenges.reverse() })
    })
  }

  componentDidMount() {
    this.getChallenges();
  }

  componentDidUpdate(prevProps) {
    console.log(`The previous props: ${prevProps.userId}`)

    if (!prevProps.userId && this.props.userId) {
      this.getChallenges();
    }
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
      console.log(this.state)
      this.setState({
        displayToastAccepted: false,
        displayToastDeclined: false,
      })
    }, 2000);
    return () => clearTimeout(timer);
  }

  accept = (_id) => {
    const challenges = this.state.challenges.filter(challenge => challenge._id !== _id);
    this.setState({ challenges })
    this.challengeStatusNotification(true)
  }


  decline = (_id) => {
    const challenges = this.state.challenges.filter(challenge => challenge._id !== _id);
    this.setState({ challenges })
    this.challengeStatusNotification(false)
  }

  render() { 
    let challengesList = null;
    const hasChallenges = this.state.challenges.length !== 0;

    if (hasChallenges) {
      challengesList = this.state.challenges.map((challengeObj) => (
        <ChallengeTask
          key={`Challenge_${challengeObj._id}`}
          _id={challengeObj._id}
          task_name={challengeObj.task_name}
          challenger={challengeObj.challenger}
          duration={challengeObj.duration}
          frequency={challengeObj.frequency}
          accept={() => this.accept(challengeObj._id)}
          decline={() => this.decline(challengeObj._id)}
        />
      ));
    } else {
      challengesList = <div>No challenges</div>;
    }


    return ( 
      <div className="page-container">
        <SideBar 
          link="/challenges"
          userName={this.props.userName}
          handleLogout={this.props.handleLogout}/>
        <div className="page_main">
          {challengesList}
        </div>

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