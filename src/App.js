import { Button } from "@material-ui/core";
//import './App.css';
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
  return (
    <div>
      <FirebaseAuthConsumer>
        <IfFirebaseAuthed></IfFirebaseAuthed>
        <IfFirebaseUnAuthed>
          {({ firebase }) => (
            <Button
              variant="outlined"
              onClick={() => handleGoogleSignIn(firebase)}
            >
              Sign in with Google
            </Button>
          )}
        </IfFirebaseUnAuthed>
      </FirebaseAuthConsumer>
    </div>
  );
}

export default App;
