import React, { Component } from "react";
import Player from "./Player.js";
import Opponent from "./Opponent.js";

import "../../utilities.css";
import "./GameBoard.css";
import { get, post } from "../../utilities.js";

class GameBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      high_score: 0,
      curr_coins: 0,
      skin: 1,
      board_height: 0,
      board_width: 0,
      player_x: 10,
      player_y: 10,
      cpu_x: 100,
      cpu_y: 100,
      num_turns: 100,
      curr_score: 0,
      up: false,
      down: false,
      left: false,
      right: false,
      playing: false,
    }
  }

  componentDidMount() {
    this.getProfile();

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

    this.setupGame();
  }

  getProfile = () => {
    get('/api/profile/fill', {
      userId: this.props.userId,
    }).then((profile) => {
      this.setState({
        curr_coins: profile.coins,
        high_score: profile.high_score,
        skin: profile.skin,
      });
    });
  }

  setupGame = () => {
    let height = document.getElementById("Board").clientHeight;
    let width = document.getElementById("Board").clientWidth;

    this.setState({
      board_height: height,
      board_width: width,
      player_x: width / 3,
      player_y: height / 3,
      cpu_x: 2 * width / 3,
      cpu_y: 2 * height / 3,
      num_turns: 100,
      left: false,
      right: false,
      up: false,
      down: false,
      player_interval: null,
      opponent_interval: null,
      score_interval: null,
    }, () => {
      document.getElementById("Player").style.left = this.state.player_x + "px";
      document.getElementById("CPU").style.left = this.state.cpu_x + "px";
      document.getElementById("Player").style.top = this.state.player_y + "px";
      document.getElementById("CPU").style.top = this.state.cpu_y + "px";
    })
  }

  playGame = () => {
    if (this.state.playing) {
      if (this.state.curr_score > this.state.high_score) {
        this.updateHighScore(this.state.curr_score);
        this.setState({
          high_score: this.state.curr_score,
        });
      }

      clearInterval(this.state.player_interval);
      clearInterval(this.state.opponent_interval);
      clearInterval(this.state.score_interval);
      this.setupGame();

      this.setState({ 
        playing: false,
        player_interval: null,
        opponent_interval: null,
        score_interval: null,
        curr_score: 0,
      });
    } else {
      let player_moving = setInterval(this.moveOpponent, 30);
      let opponent_moving = setInterval(this.movePlayer, 30);
      let score_counting = setInterval(this.increaseScore, 60);

      this.setState({ 
        playing: true,
        player_interval: player_moving,
        opponent_interval: opponent_moving,
        score_interval: score_counting,
      });
    }
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
    this.checkFinished();

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

  increaseScore = () => {
    let rate = Math.floor(this.state.num_turns / 500 + 1);
    this.setState({
      curr_score: this.state.curr_score + rate,
    });
  }

  updateHighScore = (score) => {
    post("/api/profile/score", {
      userId: this.props.userId,
      high_score: score,
    });
  }

  checkFinished = () => {
    if (Math.abs(this.state.player_x - this.state.cpu_x) <= 20 && Math.abs(this.state.player_y - this.state.cpu_y) <= 20) {
      this.playGame();
    }
  }

  render() {
    return (
      <div className="GameBoard-Container">
        <div id="Board" className="GameBoard-Main">
          <Player
            skin={this.state.skin}/>
          <Opponent/>
        </div>
        <div className="GameBoard-Bottom">
          <h3 className="GameBoard-Score"> Current Score: {this.state.curr_score} </h3>
          <div id="Start" className="GameBoard-Button" onClick={this.playGame}>
            <h3 className="GameBoard-Text">
              {(this.state.playing === false) ? "Start New Game" : "End Game"}
            </h3>
          </div>
          <h3 className="GameBoard-Score"> High Score: {this.state.high_score} </h3>
        </div>
      </div>
    );
  }
}

export default GameBoard;
