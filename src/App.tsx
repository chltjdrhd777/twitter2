import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import { Provider } from "react-redux";
import { createStore } from "./redux/store";
import { authService } from "dataSource/firebaseDB";

const store = createStore();

function App() {
  //just understanding old way
  const [logInState, setLogInState] = useState(false);

  return (
    <Provider store={store}>
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
              {" "}
              <Route exact patch="/">
                <Auth />
              </Route>{" "}
              <Redirect to="/" />
            </>
          )}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
