import React from 'react'
import style from './style.module.css'
import NavBar from './NavBar';
import Categories from './Categories';
import Todo from './Todo';
import Converter from './Converter';
function Main() {
  return (
      <>
    <NavBar/>
    <Categories/>
    <div className={style.mainContainer}>
                    
                    <Converter/>
                        </div>
    </>
  )
}

export default Main