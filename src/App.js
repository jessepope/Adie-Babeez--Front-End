import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import React from "react";
import { useState } from "react";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import NewPostPage from "./pages/NewPostPage";
import ProfilePage from "./pages/ProfilePage";
import AppContext from "./AppContext";
import { ChatEngine } from 'react-chat-engine';
import InboxPage from "./pages/InboxPage";

function App() {
  
    const [currentUser, setCurrentUser] = useState({});
    const userSettings = {
      userVariable: currentUser,
      setCurrentUser,
    };
    console.log(currentUser)

  return (
    <AppContext.Provider value={userSettings}>
      <Router>
        <div className="App">
          <div className="content">
            <Routes>
              <Route
                path=""
                element={<LandingPage />}
              />
              <Route
                path="/signup"
                element={<SignUpPage />}
              />

              <Route
                path="/feed"
                element={<HomePage />}
              />

              <Route
                path="/newpost"
                element={<NewPostPage />}
              />
              
              <Route
                path={"/profile/:id"}
                element={<ProfilePage />}
              />
           
              <Route
                path={"/inbox/:id"}
                element={<InboxPage />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
