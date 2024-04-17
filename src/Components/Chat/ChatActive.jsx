import React from 'react'
import style from "./chatStyle.module.css";
export default function ChatActive({selectedUser}) {
  return (
    <>
    <img
              className={style.currentContactImg}
              src={selectedUser.avatarImage}
              alt="profilepicture"
            />
            <h2>{selectedUser.name}</h2>
    </>
  )
}
