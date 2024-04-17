import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import styles from "../../components/chat/chatStyle.module.css";
import { useNavigate } from "react-router-dom";
import ContactSideBar from "../../components/sidebar/contacts/ContactSideBar.jsx";
import SideBar from "../../components/sidebar/SideBar.jsx";
import MainChat from "../../components/chat/MainChat.jsx";
import { io } from "socket.io-client";
import { host } from "../../services/apiRoutes.js";

function Chat() {
  const socket = useRef();

  const [currentUser, setCurrentUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(undefined);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    const getCurrentUser = async () => {
      if (localStorage.getItem("chat-user") === undefined) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-user")));
      }
    };

    getCurrentUser();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  const selectChat = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      <div className={styles.chatContainer}>
        <div className={styles.chatBox}>
          <ContactSideBar currentUser={currentUser} selectChat={selectChat} />

          <div className={styles.mainChatContainer}>
            <MainChat
              currentUser={currentUser}
              selectedUser={selectedUser}
              socket={socket}
            />
          </div>

          <div className={styles.sideBarContainer}>
            <SideBar currentUser={currentUser} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
