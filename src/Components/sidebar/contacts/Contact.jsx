import React from 'react'
import style from "../../chat/chatStyle.module.css"

export default function Contact({contacts, selectChat}) {
  return (
    <>
    {contacts.map((ct) => {
              return (
                <div
                  key={ct._id}
                  onClick={(index) => {
                    selectChat(ct);
                  }}
                >
                  <img
                    className={style.contactClassImg}
                    src={ct.avatarImage}
                    alt=""
                  />
                  <p className={style.contactClassName}>{ct.name}</p>
                </div>
              );
            })}
    </>
  )
}
