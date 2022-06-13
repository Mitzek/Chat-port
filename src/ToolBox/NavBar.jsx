import React from 'react'
import styles from '../Components/style.module.css'

function NavBar({signOut}) {
  return (
      <>
    <nav>
      
      <div className={styles.menu}>
      {/* <h2>ToolBox</h2> */}
    <ul>
      <li>
       <a href="" >Home</a>
      </li>
    </ul>
    
    </div>
    </nav>
    
   </>
  )
}

export default NavBar