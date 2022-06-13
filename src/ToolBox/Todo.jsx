import React, { useState, useEffect } from 'react';

import style from "./style.module.css"
function Todo() {

        const [value, setValue] = useState()
        const [items, setItems] = useState([])

        const getValue = (e) => {
                setValue(e.target.value)
        }
        let newItem = [];
        const addValues = (e) => {
            e.preventDefault();
            newItem.push(value)
            setItems(newItem)
            console.log(items);

        }

  return (
        <>
            <div className={style.TodoDiv}>
                
                <div className={style.TodoDisplayDiv}>
                    <form className="style TodoForm">
                        <input type="text" name="input" value={value} onChange={getValue}/>
                        <button onClick={addValues}> > </button>
                    </form>
                    {
                    items.map((item, index) => {
                        return (
                            <p className={style.TodoItem}>{item}</p>

                        )
                    })
                    }
                </div>
                
            </div>
        </>
  )
}

export default Todo