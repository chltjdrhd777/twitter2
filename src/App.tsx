import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import { authService, dbService } from "dataSource/firebaseDB";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actions } from "redux/homeReducer";

function App() {
  const dispatch = useDispatch();
  //just understanding old way
  const [logInState, setLogInState] = useState(true);

  useEffect(() => {
    /*  const getTweets = async () => {
      const data = await dbService.collection("tweets").get();
      data.forEach((docs) => {
        const newObject = { ...docs.data(), id: docs.id };
        dispatch(actions.receiveTweet(newObject));
      });
    };
    
    getTweets(); */

    dbService.collection("tweets").onSnapshot((snap) => {
      const tweetData = snap.docs.map((e) => ({
        docId: e.id,
        ...e.data(),
      }));
      dispatch(actions.receiveTweet(tweetData));
    });

    authService.onAuthStateChanged((user) => {
      if (user) {
        setLogInState(true);
      } else {
        setLogInState(false);
      }
      dispatch(actions.userUpdate(user));
      /*   authService.setPersistence(firebase.auth.Auth.Persistence.SESSION); */
    });
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        {logInState ? (
          <>
            <Route exact patch="/">
              <Home />
            </Route>
            <Redirect to="/" />
          </>
        ) : (
          <>
            <Route exact patch="/">
              <Auth />
            </Route>
            <Redirect to="/" />
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
