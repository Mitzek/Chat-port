import React, { useState, useEffect } from 'react';
import axios from 'axios'
import NavBar from './Components/NavBar';

import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import Register from './Components/Authentication/Register';
import SignIn from './Components/Authentication/SignIn';
import SetAvatar from './Components/Authentication/SetAvatar';
import Chat from './Components/Chat/Chat'
import Profile from './Components/Profile/Profile';
import { authRoute } from './Components/Authentication/API/APIRoutes';
function App() {
  const [auth, setAuth] = useState();

  useEffect(() => {
    const getToken = async () => {
     const { data } = await axios.get(authRoute, {
       headers: {
         "x-access-token": localStorage.getItem("chat-user-token"),
       },
     });
     if (data.auth === true) {
       setAuth(true);
       

     } else {
       setAuth(false);
       
     
     }
     console.log(data);
   };
   getToken()

 }, [auth]); 
 console.log(auth);
  return (
 <>
  
 <Router>
        {auth && (
          <>
             <NavBar />
             
          </>
        )}

        <Routes>
          {auth && (
            <>
    <Route path="/chat" element={<Chat/>} />
    <Route path="/profile" element={<Profile/>} />

            </>
          )}

          {!auth && (
            <>
            
              <Route path="/register" element={<Register/> }/>
              <Route path="/login" element={<SignIn/>} />
              <Route path="/" element={<SignIn/>} />
              
            </>
          )}

          <Route
            path="*"
            element={<Navigate to={auth ? "/chat" : "/login"}/>}
          />
        </Routes>
        {auth && (
          <>
           
          </>
        )}
      </Router>
   
  </>
  )
}

export default App