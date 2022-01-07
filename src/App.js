import { Button } from "@material-ui/core";
import style from './App.css';
import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed
} from "@react-firebase/auth";
//import { firebase } from "@firebase/app";
//import "@firebase/firestore";

function App() {
  const handleGoogleSignIn = (firebase) => {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleAuthProvider);
  };
  const handleLogout = (firebase) => {
    firebase.auth().signOut();
  };
  return (
    <div>
      <FirebaseAuthConsumer>
        <IfFirebaseUnAuthed>
          {({ firebase }) => (
            <Button
              className = {style.button}
              color = "primary"
              variant="outlined"
              onClick={() => handleGoogleSignIn(firebase)}
            >
              Sign in with Google
            </Button>
          )}
        </IfFirebaseUnAuthed>
        <IfFirebaseAuthed>
        {({ user, firebase }) => (
              <Button
               className = {style.button}
                variant = "outlined"
                color = "primary"
                onClick={() => {
                  handleLogout(firebase)
                }}
              >
                Log out
              </Button>
          )}
        </IfFirebaseAuthed>
      </FirebaseAuthConsumer>
    </div>
  );
}

export default App;

