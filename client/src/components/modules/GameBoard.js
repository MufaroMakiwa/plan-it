import React, { Component } from "react";
import Player from "./Player.js";
import Opponent from "./Opponent.js";

import "../../utilities.css";
import "./GameBoard.css";

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      board_height: 0,
      board_width: 0,
      player_x: 10,
      player_y: 10,
      cpu_x: 100,
      cpu_y: 100,
      num_turns: 400,
    }
  }

  componentDidMount() {
    // remember -- api calls go here!
    let height = document.getElementById("Board").clientHeight;
    let width = document.getElementById("Board").clientWidth;

    this.setState({
      board_height: height,
      board_width: width,
      player_x: width / 3,
      player_y: height / 3,
      cpu_x: 2 * width / 3,
      cpu_y: 2 * height / 3,
    }, () => {
      document.getElementById("Player").style.left = this.state.player_x + "px";
      document.getElementById("CPU").style.left = this.state.cpu_x + "px";
      document.getElementById("Player").style.top = this.state.player_y + "px";
      document.getElementById("CPU").style.top = this.state.cpu_y + "px";
    })

    this.playGame();
  }

  playGame = () => {
    setInterval(this.moveOpponent, 200);

    let inputDirection = { x: 0, y: 0};

    window.addEventListener('keydown', (event) => {
      this.checkFinished()

      if (event.key === "ArrowUp") {
          inputDirection = { x: 0, y: -10 };
      } else if (event.key === "ArrowDown") {
          inputDirection = { x: 0, y: 10 };
      } else if (event.key === "ArrowRight") {
          inputDirection = { x: 10, y: 0 };
      } else if (event.key === "ArrowLeft") {
          inputDirection = { x: -10, y: 0 };
      }

      this.setState({
        player_x: this.state.player_x + inputDirection.x,
        player_y: this.state.player_y + inputDirection.y,
      }, () => {
        document.getElementById("Player").style.left = this.state.player_x + "px";
        document.getElementById("Player").style.top = this.state.player_y + "px";
      })
    })
  }

  moveOpponent = () => {
    this.checkFinished()

    let cpuDirection = { x: 0, y: 0}

    let cpu_x_dist = this.state.player_x - this.state.cpu_x;
    let cpu_y_dist = this.state.player_y - this.state.cpu_y;
    let cpu_total_dist = Math.sqrt(Math.pow(cpu_x_dist, 2) + Math.pow(cpu_y_dist, 2));

    cpuDirection.x = this.state.num_turns / 20 * cpu_x_dist / cpu_total_dist;
    cpuDirection.y = this.state.num_turns / 20 * cpu_y_dist / cpu_total_dist;

    this.setState({
      cpu_x: this.state.cpu_x + cpuDirection.x,
      cpu_y: this.state.cpu_y + cpuDirection.y,
      num_turns: this.state.num_turns + 1,
    }, () => {
      document.getElementById("CPU").style.left = this.state.cpu_x + "px";
      document.getElementById("CPU").style.top = this.state.cpu_y + "px";
    })
  };

  checkFinished = () => {
    if (Math.abs(this.state.player_x - this.state.cpu_x) <= 12 && Math.abs(this.state.player_y - this.state.cpu_y) <= 12) {
      window.alert("Game Over");
    }
  }

  render() {
    return (
      <div id="Board" className="GameBoard-Container">
        <Player/>
        <Opponent/>
      </div>
    );
  }
}

export default GameBoard;
