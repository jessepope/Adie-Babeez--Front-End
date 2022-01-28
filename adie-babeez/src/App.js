import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from "./logo.svg";
import "./App.css";
import React from 'react';
import LoginForm from "./components/LoginForm"


function App() {
  return (
      <Router>
        <div className="App">
            <div className="content">
              <Switch>
                <Route path="">
                    <LogInPage />
                  </Route>
                  <Route path="">
                    <SignUpPage />
                  </Route>
                  <Route path="">
                    <HomePage />
                  </Route>

              </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
