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
      num_turns: 100,
      up: false,
      down: false,
      left: false,
      right: false,
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

    window.addEventListener('keydown', (event) => {
      if (event.key === "ArrowUp") {
        this.setState({up: true});
      } else if (event.key === "ArrowDown") {
        this.setState({down: true});
      } else if (event.key === "ArrowRight") {
        this.setState({right: true});
      } else if (event.key === "ArrowLeft") {
        this.setState({left: true});
      }
    })

    window.addEventListener('keyup', (event) => {
      if (event.key === "ArrowUp") {
        this.setState({up: false});
      } else if (event.key === "ArrowDown") {
        this.setState({down: false});
      } else if (event.key === "ArrowRight") {
        this.setState({right: false});
      } else if (event.key === "ArrowLeft") {
        this.setState({left: false});
      }
    })

    this.playGame();
  }

  playGame = () => {
    setInterval(this.moveOpponent, 30);
    setInterval(this.movePlayer, 30);
  }

  movePlayer = () => {
    this.checkFinished();

    let next_player_x = 0;
    let next_player_y = 0;

    if (this.state.up) { next_player_y -= 10 };
    if (this.state.down) { next_player_y += 10 };
    if (this.state.right) { next_player_x += 10 };
    if (this.state.left) { next_player_x -= 10 };

    next_player_x += this.state.player_x;
    next_player_y += this.state.player_y;

    next_player_x = Math.min(next_player_x, this.state.board_width - 20);
    next_player_y = Math.min(next_player_y, this.state.board_height - 20);

    next_player_x = Math.max(next_player_x, 0);
    next_player_y = Math.max(next_player_y, 0);

    this.setState({
      player_x: next_player_x,
      player_y: next_player_y,
    }, () => {
      document.getElementById("Player").style.left = this.state.player_x + "px";
      document.getElementById("Player").style.top = this.state.player_y + "px";
    })
  }

  moveOpponent = () => {
    this.checkFinished()

    let cpuDirection = { x: 0, y: 0};

    let cpu_x_dist = this.state.player_x - this.state.cpu_x;
    let cpu_y_dist = this.state.player_y - this.state.cpu_y;
    let cpu_total_dist = Math.sqrt(Math.pow(cpu_x_dist, 2) + Math.pow(cpu_y_dist, 2));

    cpuDirection.x = this.state.num_turns / 200 * cpu_x_dist / cpu_total_dist;
    cpuDirection.y = this.state.num_turns / 200 * cpu_y_dist / cpu_total_dist;

    let next_cpu_x = Math.min(this.state.cpu_x + cpuDirection.x, this.state.board_width - 20);
    let next_cpu_y = Math.min(this.state.cpu_y + cpuDirection.y, this.state.board_height - 20);

    next_cpu_x = Math.max(0, next_cpu_x);
    next_cpu_y = Math.max(0, next_cpu_y);

    this.setState({
      cpu_x: next_cpu_x,
      cpu_y: next_cpu_y,
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
