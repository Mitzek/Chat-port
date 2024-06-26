import React from "react";
import style from "../chat/chatStyle.module.css";
import { useNavigate } from "react-router-dom";

function SideBar({ currentUser }) {
  const navigate = useNavigate();
  function handleProfile() {
    navigate("/profile", {
      state: { userName: currentUser.name, image: currentUser.avatarImage },
    });
  }

  function handleLogOut() {
    localStorage.setItem("chat-user", undefined);
    localStorage.setItem("chat-user-token", undefined);
    window.location.reload();
    navigate("/login");
  }

  return (
    <>
      <div className={style.sideBarContainer}>
        <img
          className={style.profileImg}
          src={currentUser.avatarImage}
          alt=""
        />
        <h3>{currentUser.name}</h3>
        <div className={style.sideBarOptions}>
          <div onClick={handleProfile}> My Profile</div>
          <div onClick={handleLogOut}> Log Out</div>
          <span
            style={{ color: "green", fontSize: "12px", paddingTop: "10px" }}
          >
            {" "}
            Portfolio Project by Rehan Ali
          </span>
        </div>
      </div>
    </>
  );
}

export default SideBar;
