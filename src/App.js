import React, { Component, useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import Countdown from "./Countdown";
import { firebase } from "@firebase/app";
import "@firebase/firestore";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Box from "@material-ui/core/Box";
import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";

class App extends Component {
  render() {
    const handleGoogleSignIn = (firebase) => {
      const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(googleAuthProvider);
    };
    const handleLogout = (firebase) => {
      firebase.auth().signOut();
    };

    return (
      <div>
        <Navbar className="justify-content-center" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand>Focus-app</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <IfFirebaseUnAuthed>
                {({ firebase }) => (
                  <Button
                    variant="light"
                    onClick={() => handleGoogleSignIn(firebase)}
                  >
                    Sign in with Google
                  </Button>
                )}
              </IfFirebaseUnAuthed>
              <IfFirebaseAuthed>
                {({ user, firebase }) => (
                  <div>
                    <Button
                      variant="light"
                      onClick={() => {
                        handleLogout(firebase);
                      }}
                    >
                      Log out
                    </Button>
                  </div>
                )}
              </IfFirebaseAuthed>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Body />
      </div>
    );
  }
}

function Body() {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const docRef = db.collection("/history").doc(uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        setHistory(doc.data().point);
      } else {
        setHistory([]);
      }
    });
  }, [setHistory]);

  return (
    <Container>
      <Row>
        <Col>
          <div style={{ marginTop: "60px", width: "100%" }}>
            <Box color="brown" bgcolor="beige" height="500px">
              <p style={{ textAlignVertical: "center", textAlign: "center" }}>
                whitelisted
              </p>

              <Row>
                <Col>
                  <Form.Control type="text" placeholder="Enter URL" />
                </Col>
                <Col>
                  <Button variant="dark">Add</Button>
                </Col>
              </Row>

              <br />
            </Box>
          </div>
        </Col>
        <Col>
          <div className="App">
            <IfFirebaseAuthed>
              {({ user, firebase }) => (
                <div className="App-title">Hi, {user.displayName}</div>
              )}
            </IfFirebaseAuthed>
            <div className="Timers">
              <Countdown />
            </div>
          </div>
        </Col>
        <Col>
          <div style={{ marginTop: "60px", width: "100%" }}>
            <Box align="center" color="brown" bgcolor="beige" height="500px">
              <p>history</p>
              <table style={{ margin: "0 auto", width: "90%" }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>DUR</th>
                    <th>Status</th>
                  </tr>
                </thead>
              </table>
            </Box>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
