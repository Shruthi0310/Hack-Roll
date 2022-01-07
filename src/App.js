import React, { Component } from "react";

import Countdown from "./Countdown";

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import './App.css';

class App extends Component {
  render() {
    return (
      <Container>

          <Navbar bg="primary" variant="dark">
            <Navbar.Brand >focus-app</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as: <a href="#login">user</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        <div className="App">
          <div className="App-title">Hi, username</div>
          <div className="Timers">
            <Countdown />
          </div>
        </div>
      
      </Container>  
  
    );
  }
}

export default App;