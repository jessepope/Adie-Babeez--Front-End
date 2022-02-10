import "./InboxPage.css";
import axios from "axios";
import NavBar from "../components/NavBar";
import FooterEachPage from "../components/FooterEachPage";
import { ChatEngine, getOrCreateChat } from "react-chat-engine";
import { useState, useContext } from "react";
import AppContext from "../AppContext";

const InboxPage = () => {
  const [username, setUsername] = useState("");
  // const myContext = useContext(AppContext);
  // const currUsername = myContext.userVariable.username;
  // const userPassword = myContext.userVariable.password;
  // console.log("userId", username, "password", userPassword);

  function createDirectChat(creds) {
    getOrCreateChat(
      creds,
      { is_direct_chat: true, usernames: [username] },
      () => setUsername("")
    );
  }

  function renderChatForm(creds) {
    return (
      <div>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => createDirectChat(creds)}>Create</button>
      </div>
    );
  }

  console.log("username", username);
  return (
    <div id="inbox-page">
      <NavBar />
      <ChatEngine
        height="100vh"
        projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
        userName="admin"
        // userName={currUsername}
        userSecret="adiebabeez"
        // userSecret={userPassword}
        renderNewChatForm={(creds) => renderChatForm(creds)}
      />
      <FooterEachPage />
    </div>
  );
};

export default InboxPage;
