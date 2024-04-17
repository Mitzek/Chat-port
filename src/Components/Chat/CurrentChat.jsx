import React from "react";
import style from "./chatStyle.module.css";
import ChatHistory from "./ChatHistory";
import ChatActive from "./ChatActive";


function CurrentChat({ currentUser, selectedUser, messages, scrollRef }) {
  return (
    <>
      {selectedUser ? (
        <div className={style.parentBox}>
          <div className={style.currentSelectedCt}>
            <ChatActive selectedUser={selectedUser}/>
          </div>
          <div className={style.mainChat}>
            <ChatHistory messages={messages}/>
          </div>
        </div>
      ) : (
        <div className={style.firstDisplay}>
          
          Please Select A Chat To Start A Conversation!
        </div>
      )}
    </>
  );
}

export default CurrentChat;
