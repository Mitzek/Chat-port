import React, { useState } from "react";
import authStyles from "./authStyles.module.css"
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import {registerRoute} from './API/APIRoutes'
import { storage } from '../../Services/Firebase.js';

function Register() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
      name:"", email:"", password: ""
    })
    const [progress, setProgress] = useState(0)
    const [image, setImage] = useState()
    const [imgUrl, setImgUrl] = useState()
  

    let name, value
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({...user, [name]: value})
    }

    const handleValidation = () => {
          const {name, password} = user;

          if(name.length < 3) {
            alert("Username cannot be less than 3 characters.")
            return false;
          }  
          else if(password.length < 6 ) {
            alert("Passowrd cannot be less than 6 characters.")
            return false;
          }
          else {
            return true;
          }
        }
    
         const handleFile = (event) => {
        
        setImage(event.target.files[0])
        
        
}
        
    const uploadImage = (e) => {
      e.preventDefault();
      const upload = storage.ref(`images/${image.name}`).put(image);
      
      upload.on(
          "State_changed",
          snapshot => {
              const load = Math.round((snapshot.bytesTransferred / snapshot.totalBytes ) * 100);
              setProgress(load)
          },
          error => {
              console.log(error);
          },
          () => {
              storage
              .ref("images")
              .child(image.name)
              .getDownloadURL()
              .then(url => {
                  setImgUrl(url)
                  console.log(imgUrl);
              });
          }
     );
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(handleValidation()){
         
         const { name, email, password} = user;
         const {data} = await axios.post(registerRoute,{
           name, email, password, avatarImage : imgUrl
         });
        if(data.status===false) {
            console.log("Error" + data.msg)
            alert("Registeration Failed " + data.msg)
        }
        else {
         // localStorage.setItem("chat-app-user", JSON.stringify(data.user))
          alert("You have successfully registered, please login")
          navigate("/login")
        }

      }     
    }

  return (
    <div className={authStyles.regContainer}>
        
          <form  className={authStyles.regForm} onSubmit={handleSubmit}>
              <h1>Chat Port</h1>
              <h2>Register Your Account</h2>
          <input required type="text" value={user.name} placeholder="Enter your username" onChange={handleChange} name="name"/>
          <input required type="email" value={user.email} placeholder="Enter your email" onChange={handleChange} name="email"/>
          <input required type="password" value={user.password} placeholder="Enter your passowrd" onChange={handleChange} name="password"/>
        
           <label htmlFor="photo">Please upload your avatar image</label>
           <input type="file" onChange={handleFile} />
           <button onClick={uploadImage}>Upload</button>
           <progress value={progress} max="100" />
           {console.log(progress)} 
           <img style={{width:"200px", height: "200px"}} src={imgUrl || "http://via.placeholder.com/200x200"} alt="images" />

          <button type="submit">Create Account</button>
          <span>Already have an account? <Link to="/login" className={authStyles.regLogin}>LOG IN</Link></span>
          
          </form>
          </div>
  );
}

export default Register;
                                                                                            