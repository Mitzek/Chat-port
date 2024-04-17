import React from 'react'
import style from "./chatStyle.module.css";

export default function ChatHistory({messages}) {
  return (
    <>
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
    </>
  )
}
