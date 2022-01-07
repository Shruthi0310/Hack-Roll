import React, { Component } from "react";
import "./App.css";
import Button from "react-bootstrap/Button";

class Countdown extends Component {
  state = {
    dur: "",
    date: "",
    timerOn: false,
    timerStart: 0,
    timerTime: 300000,
    endTime: new Date(Date.now() + 300000)
  };
  startTimer = () => {
    const current = new Date();
    this.setState({
      dur:
        ("0" + Math.floor((this.state.timerTime / 3600000) % 60)).slice(-2) +
        ":" +
        ("0" + Math.floor((this.state.timerTime / 60000) % 60)).slice(-2) +
        ":" +
        ("0" + (Math.floor((this.state.timerTime / 1000) % 60) % 60)).slice(-2),
      date: `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`,
      timerOn: true,
      timerTime: this.state.timerTime,
      timerStart: this.state.timerTime,
      endTime: new Date(Date.now() + this.state.timerTime)
    });
    this.timer = setInterval(() => {
      const newTime = new Date(this.state.endTime - Date.now()).getTime();
      if (newTime >= 0 && new Date() < this.state.endTime) {
        this.setState({
          timerTime: newTime
        });
      } else {
        clearInterval(this.timer);
        this.props.setHistories([
          ...this.props.histories,
          {
            date: this.state.date,
            dur: this.state.dur,
            stat: "Completed"
          }
        ]);
        console.log(this.props.histories);
        this.setState({ timerOn: false, timerTime: 0 });
        alert("Good job");
      }
    }, 10);
  };

  stopTimer = () => {
    clearInterval(this.timer);
    alert("Boo u loser");

    this.setState({
      timerOn: false,
      timerTime: 300000
    });

    this.props.setHistories([
      ...this.props.histories,
      {
        date: this.state.date,
        dur: this.state.dur,
        stat: "Failed"
      }
    ]);
  };

  adjustTimer = (input) => {
    const { timerTime, timerOn } = this.state;
    if (!timerOn) {
      if (input === "incHours" && timerTime + 3600000 < 216000000) {
        this.setState({ timerTime: timerTime + 3600000 });
      } else if (input === "decHours" && timerTime - 3600000 >= 0) {
        this.setState({ timerTime: timerTime - 3600000 });
      } else if (input === "incMinutes" && timerTime + 60000 < 216000000) {
        this.setState({ timerTime: timerTime + 60000 });
      } else if (input === "decMinutes" && timerTime - 60000 >= 0) {
        this.setState({ timerTime: timerTime - 60000 });
      } else if (input === "incSeconds" && timerTime + 1000 < 216000000) {
        this.setState({ timerTime: timerTime + 1000 });
      } else if (input === "decSeconds" && timerTime - 1000 >= 0) {
        this.setState({ timerTime: timerTime - 1000 });
      }
    }
  };

  render() {
    const { timerTime, timerStart, timerOn } = this.state;
    let seconds = ("0" + (Math.floor((timerTime / 1000) % 60) % 60)).slice(-2);
    let minutes = ("0" + Math.floor((timerTime / 60000) % 60)).slice(-2);
    let hours = ("0" + Math.floor((timerTime / 3600000) % 60)).slice(-2);

    return (
      <div className="Countdown">
        <br></br>
        <div className="Countdown-label">Hours : Minutes : Seconds</div>
        <div className="Countdown-display">
          <Button
            variant="light"
            size="sm"
            className="Countdown-button"
            onClick={() => this.adjustTimer("incHours")}
          >
            &#8679;
          </Button>
          <Button
            variant="light"
            size="sm"
            className="Countdown-button"
            onClick={() => this.adjustTimer("incMinutes")}
          >
            &#8679;
          </Button>
          <Button
            variant="light"
            size="sm"
            className="Countdown-button"
            onClick={() => this.adjustTimer("incSeconds")}
          >
            &#8679;
          </Button>

          <div className="Countdown-time">
            {hours} : {minutes} : {seconds}
          </div>
          <Button
            variant="light"
            size="sm"
            className="Countdown-button"
            onClick={() => this.adjustTimer("decHours")}
          >
            &#8681;
          </Button>
          <Button
            variant="light"
            size="sm"
            className="Countdown-button"
            onClick={() => this.adjustTimer("decMinutes")}
          >
            &#8681;
          </Button>
          <Button
            variant="light"
            size="sm"
            className="Countdown-button"
            onClick={() => this.adjustTimer("decSeconds")}
          >
            &#8681;
          </Button>
        </div>
        <br></br>
        {timerOn === false && (
          <Button variant="dark" size="lg" onClick={this.startTimer}>
            Start
          </Button>
        )}
        {timerOn === true && timerTime >= 1000 && (
          <Button variant="dark" size="lg" onClick={this.stopTimer}>
            Stop
          </Button>
        )}
      </div>
    );
  }
}

export default Countdown;
