"use client"
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss'

export default function Home() {
  var numbers = Array.from({length:37}, (_,i) => i);
  var [history, setHistory] = useState([]);
  var [position, setPosition] = useState({row:0, column:0});
  var tableRef = useRef(null);


  var handleClear = () => {
    setHistory([]);
    setPosition({row:0, column:0})
  }



  var handleUndo = () => {
    setHistory((history) => {
        const previousItem = history[history.length - 1];
        setPosition({row:previousItem.row, column: previousItem.col})
        console.log(previousItem)
        tableRef.current.rows[previousItem.row].cells[previousItem.col].style.backgroundColor = "";
        return history.slice(0, -1)
    }) 
}

  var handleAddResult = (e) => {
    var value = e.target.innerText;
    if(Number(value) === 0){
        if(history.length === 0){
          setHistory([{row:position.row,col:position.column, color: "green", number: Number(value) }]);
          tableRef.current.rows[position.row].cells[position.column].style.backgroundColor = "green";
          setPosition({row:position.row + 1, column:position.column});
        } else {
            setHistory([...history,{row:position.row,col:position.column, color: "green", number: Number(value) }]);
            tableRef.current.rows[position.row].cells[position.column].style.backgroundColor = "green";
            setPosition({row:position.row + 1, column:position.column});
        }
    } else {

            if(Number(value) % 2 === 0){
              // Even
                  if(history.length === 0){
                    setHistory([{row:position.row,col:position.column, color: "red", number: Number(value) }]);
                    tableRef.current.rows[position.row].cells[position.column].style.backgroundColor = "red";
                    setPosition({row:position.row + 1, column:position.column});
                  } else if(history[history.length - 1].color === "black" || history[history.length - 1].color === "green"){
                    setHistory([...history,{row:0,col:position.column + 1, color: "red", number: Number(value) }]);
                    tableRef.current.rows[0].cells[position.column + 1].style.backgroundColor = "red";
                    setPosition({row:1, column:position.column + 1});
                  } else {
                    setHistory([...history,{row:position.row,col:position.column, color: "red", number: Number(value) }]);
                    tableRef.current.rows[position.row].cells[position.column].style.backgroundColor = "red";
                    setPosition({row:position.row + 1, column:position.column});
                  }

            } else {
              // Odd 
                  if(history.length === 0){
                    setHistory([{row:position.row,col:position.column, color: "black", number: Number(value) }]);
                    tableRef.current.rows[position.row].cells[position.column].style.backgroundColor = "black";
                    setPosition({row:position.row + 1, column:position.column});
                  } else if(history[history.length - 1].color === "red" || history[history.   length - 1].color === "green"){
                    setHistory([...history,{row:0,col:position.column + 1, color: "black", number: Number(value) }]);
                    tableRef.current.rows[0].cells[position.column + 1].style.backgroundColor = "black";
                    setPosition({row:1, column:position.column + 1});
                  } else {
                    setHistory([...history,{row:position.row,col:position.column, color: "black", number: Number(value) }]);
                    tableRef.current.rows[position.row].cells[position.column].style.backgroundColor = "black";
                    setPosition({row:position.row + 1, column:position.column});
                  }
              }
    }
  }

  useEffect(() => {
    if(position.row >= 10){
        setPosition({row:0, column:position.column + 1});
      }
  
  }, [position])

  return (
    <main>
        <div className={styles.container}>
            <div className={styles.rollete_table}>
              {numbers.map(i => {
                return <div key={i} value={i} onClick={(e) => handleAddResult(e)} className={`${styles.number_box} ${i%2==0 ? styles.red : styles.black} ${i == 0 ? styles.green : ''}`}>{i}</div>
              })}
            </div>

            <div className={styles.button_container}>
                <div onClick={handleUndo} className={styles.button}>Undo</div>
                <div onClick={handleClear} className={styles.button}>Clear</div>
                <div className={styles.button}>Save</div>
            </div>

            <div className={styles.color_trend_analytic}>
                <div className={styles.trend_container}>
                   <table ref={tableRef}>
                    <tbody >
                       {Array.from({length:10}, (_,rowIndex) => (
                         <tr key={rowIndex}>
                            {Array.from({length:100}, (_, colIndex) => (
                               <td  key={colIndex}></td>
                            ))}
                        </tr>
                       ))}
                    </tbody>
                   </table>
                </div>
            </div>
        </div>
    </main>
  )
}
