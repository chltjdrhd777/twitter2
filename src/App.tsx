import React, { useState } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { authService } from "./dataSource/firebaseDB";
import Auth from "routes/Auth";
import Home from "routes/Home";

function App() {
  const [logInState, setLogInState] = useState(true);
  return (
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
  );
}

export default App;
