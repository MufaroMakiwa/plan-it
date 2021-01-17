import React, { Component } from 'react';
import SideBar from "../modules/SideBar.js";
import "../../utilities.css";
import AddTaskButton from "../modules/AddTaskButton.js";
import AddTaskDialog from "../modules/AddTaskDialog.js";
import ChallengeTask from "../modules/ChallengeTask.js";
import { navigate } from '@reach/router';

class Challenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenAddTaskDialog: false,

      challenges: [
        {
          _id: 0,
          task_name: "Go for a swim",
          challenger: "Shreya Gupta",
          duration: 20,
          frequency: "Daily",
        },

        {
          _id: 1,
          task_name: "Eat 20 Papa John's Hawaaian Pizza",
          challenger: "Nisarg Dharia",
          duration: 2,
          frequency: "Weekly",
        },

        {
          _id: 2,
          task_name: "Run 20 miles on the treadmill",
          challenger: "Mufaro Makiwa",
          duration: 12,
          frequency: "Monthly",
        },
      ]
    }
  }

  setOpenAddTaskDialog = (bool) => {
    this.setState({ isOpenAddTaskDialog: bool })
  }

  addTask = (taskObj) => {
    navigate("/current");
  }

  accept = (_id) => {
    alert("Handle me");
  }


  decline = (_id) => {
    const challenges = this.state.challenges.filter(challenge => challenge._id !== _id);
    this.setState({ challenges })
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
      challengesList = <div></div>;
    }


    return ( 
      <div className="page-container">
        <SideBar 
          link="/challenges"
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

      </div>
    );
  }
}
 
export default Challenges;