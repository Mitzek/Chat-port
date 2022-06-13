import React, { useState, useEffect, useRef } from 'react';
import style from './chatStyle.module.css'
import CurrentChat from './CurrentChat';
import ChatInput from './ChatInput';
import axios from 'axios';
import {sendMsgRoute} from "../Authentication/API/APIRoutes.js";
import { getAllMsgsRoute } from './../Authentication/API/APIRoutes';


function MainChat({currentUser, selectedUser, socket}) {
  
  const scrollRef = useRef();
  const [messages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  
  useEffect(()=>{
    const getMsgs = async () => {
      if(selectedUser) {
     const response = await axios.post(getAllMsgsRoute, {
       from: currentUser._id,
       to: selectedUser._id
     })
     setMessages(response.data)
    }
    }
    getMsgs();
}  ,[selectedUser,messages]);
    
  const sendMsg = async (msg) => {
      await axios.post(sendMsgRoute, {
        from: currentUser._id,
        to: selectedUser._id,
        message: msg
      });
      socket.current.emit("send-msg",{
        from: currentUser._id,
        to: selectedUser._id,
        message: msg
      })

      const msgs = [...messages];
      msgs.push({fromSelf: true, message: msg});
      setMessages(msgs);
  };

  useEffect(()=> {
    if(socket.current) {
        socket.current.on("msg-receive", (msg)=> {
          setArrivalMessage({fromSelf: false, message: msg})
        })};

  },[]);

  useEffect(()=> {
      arrivalMessage && setMessages((prev)=> [...prev, arrivalMessage])
  },[arrivalMessage])
  useEffect(() => {
    scrollRef.current?.scrollIntoView({behaviour: "smooth"})
  },[messages])

  return (

    <>
  
    <div className={style.mainChat}>
    <CurrentChat  scrollRef={scrollRef} messages={messages} currentUser={currentUser} selectedUser={selectedUser}/>
    </div>
      <ChatInput sendMsg={sendMsg}/>
      
    </>
  )
}

export default MainChat