import React, { Component } from "react";

import Countdown from "./Countdown";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <Navbar bg="primary" variant="dark">
        <Container>
        <Navbar.Brand >focus-app</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#login">user</a>
        </Navbar.Text>
      </Navbar.Collapse>
        </Container>
    </Navbar>

        <div className="App">
          <div className="App-title">Hi, username</div>
          <div className="Timers">
            <Countdown />
          </div>
        </div> 
      </div>
    );
  }
}

export default App;