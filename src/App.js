import React, { Component } from "react";

import Countdown from "./Countdown";

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Box from '@material-ui/core/Box';
import './App.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class App extends Component {
  render() {
    return (
      <div>


      <Navbar className="justify-content-center" bg="dark" variant="dark">
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
    <Container>
  
  <Row>
    <Col>
    <div style={{ marginTop: '60px', width: '100%' }}>
    <Box color="brown" bgcolor="beige" height= "500px" >
    <p style={{textAlignVertical: "center",textAlign: "center",}}>whitelisted</p>

      <Row>
        <Col>
      <Form.Control type="text" placeholder="Enter URL" />

        </Col>
        <Col>
      <Button variant="dark"  >Add</Button>

        </Col>
      </Row>

  <br />
    </Box>
    </div>
    </Col>
    <Col>
    <div className="App">
          <div className="App-title">Hi, username</div>
          <div className="Timers">
            <Countdown />
          </div>
        </div> 
    </Col>
    <Col>
    <div style={{ marginTop: '60px', width: '100%' }}>
    <Box color="brown" bgcolor="beige" height= "500px" >
      history
    </Box>
    </div>
    </Col>
  </Row>
</Container>
   
   
      
      </div>
    );
  }
}

export default App;