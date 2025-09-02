import React, { Component } from "react";

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 5 * 60, 
    };
  }

  componentDidMount() {
    this.updateBodyBackground(this.state.timeLeft); 

    this.timerInterval = setInterval(() => {
      this.setState((prevState) => {
        const newTime = prevState.timeLeft - 1;

        if (newTime <= 0) {
          clearInterval(this.timerInterval);
          this.updateBodyBackground(0);
          return { timeLeft: 0 };
        }

        this.updateBodyBackground(newTime);
        return { timeLeft: newTime };
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  updateBodyBackground = (seconds) => {
    const isEven = seconds % 2 === 0;
    document.body.style.backgroundColor = isEven ? "#e90909ff" : "#ffff00ff"; 
    document.body.style.transition = "background-color 0.5s ease";
  };

  formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  render() {
    const { timeLeft } = this.state;

    const timerTextStyle = {
      fontSize: "48px",
      marginTop: "20vh",
      textAlign: "center",
      color:"white",
    };

    return (
      <div>
        <h2 style={{ textAlign: "center",color:"white" }}>تایمر معکوس</h2>
        <h1 style={timerTextStyle}>{this.formatTime(timeLeft)}</h1>
      </div>
    );
  }
}

export default CountdownTimer;
