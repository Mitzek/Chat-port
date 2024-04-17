import React, { useState, useEffect } from "react";
import styles from "../../chat/chatStyle.module.css";
import { allUsersRoute } from "../../../services/apiRoutes";
import axios from "axios";
import Contact from "./Contact";

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
            <h2>Contacts</h2>
            <Contact contacts={contacts} selectChat={selectChat}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contacts;
