import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import { Provider } from "react-redux";
import { createStore } from "./redux/store";
import { authService } from "dataSource/firebaseDB";

const store = createStore();

function App() {
  const [logInState, setLogInState] = useState(authService.currentUser);
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {logInState ? (
            <>
              <Route exact patch="/">
                <Home />
              </Route>
            </>
          ) : (
            <Route exact patch="/">
              <Auth />
            </Route>
          )}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
