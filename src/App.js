import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
// import  HomePage from './pages/HomePage';
// import  SignUpPage from './pages/SignUpPage';

function App() {
  const [currentUser, setCurrentUser] = useState("");
  const updateCurrUser = (props) => {
    setCurrentUser(props);
  };
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route
              path=""
              element={<LandingPage updateCurrUser={updateCurrUser} />}
            />

            {/* <Route path="/signup">
                    <SignUpPage updateCurrUser={updateCurrUser} />
                  </Route>
                  <Route path="/feed">
                    <HomePage currentUser={currentUser}/>
                  </Route> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
