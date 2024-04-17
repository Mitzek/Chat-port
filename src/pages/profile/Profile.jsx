import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import style from "./profileStyle.module.css";

function Profile() {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const { state } = useLocation();
  const { userName, image } = state;

  const navigate = useNavigate();
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setPassword({ ...password, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/chat");
  };

  return (
    <div className={style.profileContainer}>
      <form className={style.profileForm} onSubmit={handleSubmit}>
        <h2 className={style.profileTitle}>{userName}</h2>
        <img className={style.profileDp} src={image} alt="Display" />
        <h4>Change Password: </h4>
        <input
          disabled
          onChange={handleInput}
          name="currentPassword"
          value={password.currentPassword}
          className={style.changePassword}
          type="password"
          placeholder="Type your current Password"
        />
        <input
          disabled
          onChange={handleInput}
          name="newPassword"
          pvalue={password.newPassword}
          className={style.changePassword}
          type="password"
          placeholder="Type your new Password"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Profile;
