import React, { useState, useEffect } from 'react';
import style from './chatStyle.module.css'
import {v4 as uuidv4} from 'uuid'

function CurrentChat({currentUser,selectedUser,messages, scrollRef}) {
  
 

  return (
    <>
    { selectedUser && (
      <>
    <div className={style.currentSelectedCt}>
             <img className={style.currentContactImg} src={selectedUser.avatarImage} alt=""/>
            <h2>{selectedUser.name}</h2> 
            
    </div>
     
      
       {
         messages.map((message)=> {
           return (
             
               message.fromSelf ?  <div className={style.sendingMsg} key={message._id} ref={scrollRef} >{message.message} <div className={style.time}>{message.time} </div></div> :  <div className={style.receivingMsg}>
               {message.message} <div key={message._id} className={style.time}>{message.time} </div>  </div>
             
             
           )
         })
       }
      
    </>
    )
    }
    </>
  )
}

export default CurrentChat