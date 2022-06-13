import React, { useState } from "react";
import authStyles from "./authStyles.module.css";

import { Link, useNavigate} from 'react-router-dom';

import axios from 'axios';
import {loginRoute} from './API/APIRoutes';

function SignIn() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
      email:"", password: ""
    })

    let name, value
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]: value})
        
    }

    
    const handleSubmit = async (e) => {
      
        e.preventDefault();
        
        const { email, password} = user;
        
        const {data} = await axios.post(loginRoute,{
          email, password
        });
        
        console.log(data);
       if(data.status===false) {
           console.log("Error" + data.msg)
           alert("Error: " + data.msg )
       }
       else {
         localStorage.setItem("chat-user", JSON.stringify(data.userCheck))
         localStorage.setItem("chat-user-token", data.token)
         window.location.reload();
         navigate("/chat");
       }
       

     }     
 
         
  return (
    <div className={authStyles.loginContainer}>
        
          <form  className={authStyles.loginForm} onSubmit={handleSubmit}>
            
              <img src="" alt=""/>            
              <h1>Chat Port</h1>

          <h2>Log In To Your Account</h2>
          <input required type="email" value={user.email} placeholder="Enter your email" onChange={handleChange} name="email"/>
          <input required type="password" value={user.password} placeholder="Enter your passowrd" onChange={handleChange} name="password"/>
          <button type="submit">Log In</button>
          <span>Dont have an account? <Link to="/register" className={authStyles.regLogin}>Register</Link></span>
          
          </form>
          </div>
  );
}

export default SignIn;
