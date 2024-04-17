import React, { useState } from "react";
import authStyles from "./authStyles.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { loginRoute } from "../../services/apiRoutes";

function SignIn() {

  
  const [loader, setLoader] = useState(false);

  //For viewing purposes the login has been hardcoded.
  const [user, setUser] = useState({
    email: "rehan.ali@foobar.com",
    password: "123456",
  });

  const navigate = useNavigate();

  //Get data from form and set it to user state.
  let name, value;
  const handleChange = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  
  //Send data from form to server
  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoader(true);
    const { email, password } = user;

    const { data } = await axios.post(loginRoute, {
      email,
      password,
    });

    if (data.status === false) {
      console.log("Error" + data.msg);
      alert("Error: " + data.msg);

    } else {
      //Using browser local storage to set user data.
      localStorage.setItem("chat-user", JSON.stringify(data.userCheck));
      localStorage.setItem("chat-user-token", data.token);
      navigate("/chat");
      window.location.reload();
      setLoader(false);
    }
  };

  return (
    <>
      <div className={authStyles.loginContainer}>

        {loader ? (
          <div style={{ display: "block", margin: "10px" }}>
            <div className={authStyles.loader} style={{ margin: "10px" }}></div>
            <h4>Signing In...</h4>
          </div>

        ) : (
          <form className={authStyles.loginForm} onSubmit={handleSubmit}>
            <h1 className={authStyles.logo}>
              <span className="material-symbols-outlined">chat</span>CHAT PORT
            </h1>
            <h2>Log In To Your Account</h2>
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

            {loader ? (
              <button>
                <div className={authStyles.loader}></div>
              </button>
            ) : (
              <button type="submit">Log In</button>
            )}

            <span style={{ fontSize: "12px", color: "green" }}>
              For your convenience, the login inputs are already added, just hit
              login.
            </span>
            <span>
              Dont have an account?{" "}
              <Link to="/register" className={authStyles.regLogin}>
                Register
              </Link>
            </span>
          </form>
        )}
      </div>
    </>
  );
}

export default SignIn;
