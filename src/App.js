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
  const [list, setList] = useState([]);
  const [histories, setHistories] = useState([]);
  useEffect(() => {
    const uid = firebase.auth().currentUser?.uid;
    const db = firebase.firestore();
    const docRef = db.collection("/history").doc(uid);

    docRef.get().then((doc) => {
      if (doc.exists) {
        setHistories(doc.data().point);
      } else {
        setHistories([]);
      }
    });
    console.log(histories);
  }, [setHistories]);

  return (
    <Container>
      <Row>
        <Col>
          <div style={{ marginTop: "70px", width: "100%" }}>
            <Box color="#293136" bgcolor="beige" height="500px">
              <p
                style={{
                  paddingTop: "15px",
                  textAlignVertical: "center",
                  textAlign: "center",
                  fontSize: "20px"
                }}
              >
                Whitelisted
              </p>

              <Row align="center">
                <Col xs="9">
                  <Form.Control
                    type="text"
                    placeholder="Enter URL"
                    className="whitelist"
                  />
                </Col>
                <Col xs="3" align="center">
                  <Button variant="dark" className="whitelist">
                    Add
                  </Button>
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
                <div
                  className="App-title"
                  style={{ marginTop: "60px", fontSize: "20px" }}
                >
                  Hi, {user.displayName}
                </div>
              )}
            </IfFirebaseAuthed>
            <IfFirebaseUnAuthed>
              <div
                className="App-title"
                style={{ marginTop: "60px", fontSize: "20px" }}
              >
                Welcome! Sign in to get started!
              </div>
            </IfFirebaseUnAuthed>
            <div className="Timers">
              <Countdown setHistories={setHistories} histories={histories} />
            </div>
          </div>
        </Col>
        <Col>
          <div style={{ marginTop: "70px", width: "100%" }}>
            <Box align="center" color="#293136" bgcolor="beige" height="500px">
              <p
                style={{
                  paddingTop: "15px",
                  textAlignVertical: "center",
                  textAlign: "center",
                  fontSize: "20px"
                }}
              >
                History
              </p>
              <table
                style={{
                  margin: "0 auto",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Dur</th>
                    <th>Stat</th>
                  </tr>
                </thead>
                <tbody>
                  {histories === [] ? (
                    <div></div>
                  ) : (
                    histories.map((history, index) => (
                      <tr>
                        <td>{history.date}</td>
                        <td>{history.dur}</td>
                        <td>{history.stat}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </Box>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
