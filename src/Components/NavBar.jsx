import React from 'react'
import styles from './style.module.css'

function NavBar({signOut}) {
  return (
      <>
    <nav>
      <div className={styles.menu}>
          <h2>CHATPORT</h2>
          <p>Get Connected! </p>
    </div>
    </nav>
    
   </>
  )
}

export default NavBar