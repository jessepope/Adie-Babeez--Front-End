import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import NewPostPage from "./pages/NewPostPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [currentUser, setCurrentUser] = useState({});
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
            <Route
              path="/signup"
              element={<SignUpPage updateCurrUser={updateCurrUser} />}
            />
            <Route
              path="/feed"
              element={<HomePage currentUser={currentUser} />}
            />
            <Route
              path="/newpost"
              element={<NewPostPage currentUser={currentUser} />}
            />
            <Route
              path="/profile"
              element={<ProfilePage currentUser={currentUser} />}
            />
            <Route
              path="/newpost"
              element={<NewPostPage currentUser={currentUser} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
