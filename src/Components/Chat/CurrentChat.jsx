import React, { useState, useEffect } from "react";
import style from "./chatStyle.module.css";
import { v4 as uuidv4 } from "uuid";

function CurrentChat({ currentUser, selectedUser, messages, scrollRef }) {
  return (
    <>
      {selectedUser ? (
        <div className={style.parentBox}>
          <div className={style.currentSelectedCt}>
            <img
              className={style.currentContactImg}
              src={selectedUser.avatarImage}
              alt="profilepicture"
            />
            <h2>{selectedUser.name}</h2>
          </div>
          <div className={style.mainChat}>
            {messages.map((message) => {
              return message.fromSelf ? (
                <p
                  className={style.sendingMsg}
                  key={message._id} /*ref={scrollRef}*/
                >
                  {message.message}
                  <p className={style.time}>{message.time} </p>
                </p>
              ) : (
                <p className={style.receivingMsg}>
                  {message.message}
                  <p key={message._id} className={style.time}>
                    {message.time}
                  </p>
                </p>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={style.firstDisplay}>
          {" "}
          Please Select A Chat To Start A Conversation!
        </div>
      )}
    </>
  );
}

export default CurrentChat;
