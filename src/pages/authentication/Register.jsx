import React, { useState } from "react";
import authStyles from "./authStyles.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {registerRoute} from "../../services/apiRoutes.js"
import { storage } from "../../services/firebase.js";

function Register() {

  const [loader, setLoader] = useState(false)
  const [user, setUser] = useState({ 
    name: "",
    email: "",
    password: "",
  });

  const [progress, setProgress] = useState(0); //image progress bar
  const [image, setImage] = useState(); 
  const [imgUrl, setImgUrl] = useState();

  const navigate = useNavigate();

  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleValidation = () => {
    /** This function validates the inputs from the form */
    const { name, password } = user;

    if (name.length < 3) {
      alert("Username cannot be less than 3 characters.");
      return false;
    } else if (password.length < 6) {
      alert("Passowrd cannot be less than 6 characters.");
      return false;
    } else {
      return true;
    }
  };

  //Functions for uploading profile image on register
  const handleFile = (event) => {
    setImage(event.target.files[0]);

  };

  const uploadImage = (e) => {
    e.preventDefault();
    const upload = storage.ref(`images/${image.name}`).put(image);

    upload.on(
      "State_changed",
      (snapshot) => {
        const load = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(load);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setImgUrl(url);
            console.log(imgUrl);
          });
      }
    );
  };

  //Sending the data to server
  const handleSubmit = async (e) => {
    setLoader(true)
    e.preventDefault();
    if (handleValidation()) {
      const { name, email, password } = user;
      const { data } = await axios.post(registerRoute, {
        name,
        email,
        password,
        avatarImage: imgUrl,
      });
      
      if (data.status === false) {
        console.log("Error" + data.msg);
        alert("Registeration Failed " + data.msg);
      } else {
        setLoader(false)
        // localStorage.setItem("chat-app-user", JSON.stringify(data.user))
        alert("You have successfully registered, please login");
        navigate("/login");
      }
    }
  };

  return (

    <div className={authStyles.regContainer}>
      {loader ? <> <div className={authStyles.loader} style={{ margin: "10px" }}></div>
            <h4>Creating Account...</h4> </> : (
            <>
          <h1 className={authStyles.logo}>
          <span className="material-symbols-outlined">chat</span>CHAT PORT
        </h1>
        <form className={authStyles.regForm} onSubmit={handleSubmit}>
          <div className={authStyles.regLeft}>
            <h2>Register Your Account</h2>
            <input
              required
              type="text"
              value={user.name}
              placeholder="Enter your username"
              onChange={handleChange}
              name="name"
            />
            <input
              required
              type="email"
              value={user.email}
              placeholder="Enter your email"
              onChange={handleChange}
              name="email"
            />
            <input
              required
              type="password"
              value={user.password}
              placeholder="Enter your passowrd"
              onChange={handleChange}
              name="password"
            />
          </div>
          <div className={authStyles.regRight}>
            <label htmlFor="photo">Please upload your avatar image</label>
            <input required id="photo_upload" type="file" onChange={handleFile} />
            <button onClick={uploadImage}>Upload</button>
            <progress
              className={authStyles.progress}
              value={progress}
              max="100"
              style={{ backgroundColor: "#04F06A" }}
            />
  
            <img
              style={{ width: "300px", height: "200px" }}
              src={imgUrl || "http://via.placeholder.com/200x200"}
              alt="images"
            />
  
            {loader ? (
              <button>
                <div className={authStyles.loader}></div>
              </button>
            ) : (
              <button type="submit">Create Account</button>
            )}
            <span>
              Already have an account?{" "}
              <Link to="/login" className={authStyles.regLogin}>
                LOG IN
              </Link>
            </span>
          </div>
        </form>
            </>
      )}
          </div>
  );
}

export default Register;
