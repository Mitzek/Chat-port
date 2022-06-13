import React from 'react'
import style from './style.module.css'

function Converter() {
  return (

    

    <div className={style.converterDiv}>
            <form>
                <label htmlFor="currency">Select Currency To Be Converted: </label>
                <input type="number" />
                <select name="currency" id="">
                <option value="Select">-SELECT-</option>
                <option value="PKR">PKR</option>
                <option value="US Dollar">US Dollar</option>
                <option value="Euro">Euro</option>
                <option value="Pound">Pound</option>
                <option value="Dirhams">Dirhams</option>
                <option value="Saudi Riyal">Saudi Riyal</option>
                </select>

                
                <label htmlFor="currency">Select Currency To Be Converted To: </label>
                <input type="number" />
                <select name="currency" id="">
                <option value="Select">-SELECT-</option>
                <option value="PKR">PKR</option>
                <option value="US Dollar">US Dollar</option>
                <option value="Euro">Euro</option>
                <option value="Pound">Pound</option>
                <option value="Dirhams">Dirhams</option>
                <option value="Saudi Riyal">Saudi Riyal</option>
                </select>
            </form>

    </div>
  )
}

export default Converter