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
          id: 0,
          name: "Go for a swim",
          challengedBy: "Shreya Gupta",
          duration: 20,
          frequency: "Daily",
          points: 10
        },

        {
          id: 1,
          name: "Eat 20 Papa John's Hawaaian Pizza",
          challengedBy: "Nisarg Dharia",
          duration: 2,
          frequency: "Weekly",
          points: 20
        },

        {
          id: 2,
          name: "Run 20 miles on the treadmill",
          challengedBy: "Mufaro Makiwa",
          duration: 12,
          frequency: "Monthly",
          points: 100
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

  render() { 
    let challengesList = null;
    const hasChallenges = this.state.challenges.length !== 0;

    if (hasChallenges) {
      challengesList = this.state.challenges.map((challengeObj) => (
        <ChallengeTask
          key={`Challenge_${challengeObj.id}`}
          _id={challengeObj.id}
          name={challengeObj.name}
          challengedBy={challengeObj.challengedBy}
          duration={challengeObj.duration}
          frequency={challengeObj.frequency}
          points={challengeObj.points}
        />
      ));
    } else {
      challengesList = <div>No Tasks!</div>;
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