import React from "react";
import styles from "./style.module.css";

function NavBar() {
  return (
    <>
      <nav>
        <div className={styles.menu}>
          <h2 className={styles.logo}>
            {" "}
            <span className="material-symbols-outlined">chat</span>CHAT PORT
          </h2>
          <p>Get Connected! </p>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
