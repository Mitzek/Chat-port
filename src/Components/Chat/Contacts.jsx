import React, { useState, useEffect } from "react";
import styles from "./chatStyle.module.css";
import CurrentChat from "./CurrentChat";
import MainChat from "./MainChat";
import { allUsersRoute } from "../Authentication/API/APIRoutes";
import axios from "axios";

function Contacts({ currentUser, selectChat }) {
  const [contacts, setContacts] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    const getRoute = async () => {
      if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        if (data.data.length === 0) {
          console.log("No Contacts");
        } else {
          setContacts(data.data);
        }
      } else {
        console.log("No current User");
      }
    };
    getRoute();
  }, [currentUser]);
  return (
    <>
      <div>
        <div className={styles.contactContainer}>
          <div className={styles.contact}>
            <h2>Chats</h2>
            {contacts.map((ct) => {
              return (
                <div
                  key={ct._id}
                  onClick={(index) => {
                    selectChat(ct);
                  }}
                >
                  <img
                    className={styles.contactClassImg}
                    src={ct.avatarImage}
                    alt=""
                  />
                  <p className={styles.contactClassName}>{ct.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Contacts;
