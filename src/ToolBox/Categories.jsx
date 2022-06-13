import React from 'react'
import styles from './style.module.css';

function Categories() {
  return (
    <>
     <div>
            <ul className={styles.categoriesContainerUl}>
              <li>
                <a href="" className={styles.categoriesLink}>
                    Calculator
                </a>
              </li>
              <li>
                <a href="" className={styles.categoriesLink}>
                  Todo List
                </a>
              </li>
              <li>
                <a href="" className={styles.categoriesLink}>
                  Unit Converter
                </a>
              </li>
              <li>
                <a href="" className={styles.categoriesLink}>
                  Expense Tracker
                </a>
              </li>
            </ul>
          </div>
         
    </>
  )
}

export default Categories