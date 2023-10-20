"use client"
import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss'

export default function Home() {
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
        tableRef.current.rows[previousItem.row].cells[previousItem.col].style.backgroundColor = "";
        // var lastIndex = history.indexOf(previousItem)
        // var item = history[lastIndex - 1]
        // if(item.color === lastIndex.color){
        //     setPosition({row: previousItem.row, column: previousItem.col});
        // } else {
        //    setPosition({row: previousItem.row, column: previousItem.col - 1});
        // }
        
        setPosition({row: previousItem.row, column: previousItem.col});
        return history.slice(0, -1)
    });
}
 
  var handleAddResult = (e) => {
    var value = Number(e.target.innerText);
    var blackNumbers = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35]
  

    if(history.length === 0){
        if(blackNumbers.includes(value)){
            setHistory([{row: position.row, col: position.column, color: 'black', number: value}]);
            setPosition({row: position.row + 1, column: position.column})
        } else {
            setHistory([{row: position.row, col: position.column, color: 'red', number: value}]);
            setPosition({row: position.row + 1, column: position.column})
        }
    }  else {
        var prevHist = history[history.length - 1]
        if(blackNumbers.includes(value)){
          if(prevHist.color === 'black'){
            setHistory([...history, {row:position.row, col: position.column, color: 'black'}])
            setPosition({row: position.row + 1, column: position.column})
          } else {
            setHistory([...history, {row:0, col: position.column + 1, color: 'black'}])
            setPosition({row: 1, column: position.column + 1})
          }
        } else {
          if(prevHist.color === 'red'){
            setHistory([...history, {row:position.row, col: position.column, color: 'red'}])
            setPosition({row: position.row + 1, column: position.column})
          } else {
            setHistory([...history, {row:0, col: position.column + 1, color: 'red'}])
            setPosition({row: 1, column: position.column + 1})
          }
        }
    }
  }

  useEffect(() => {
    if(position.row > 9){
        setPosition({row:0, column:position.column + 1});
      }
      history.map(res => {
        tableRef.current.rows[res.row].cells[res.col].style.backgroundColor = res.color;
      })
      console.log(history)
  }, [position, history])

  return (
    <main>
        <div className={styles.container}>
            <div className={styles.rollete_table}>
              {Array.from({length:36}, (_, i) => {
                  var index = i+1
                 return <div key={index} value={index} onClick={(e) => handleAddResult(e)} className={`
                    ${styles.number_box} ${[1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(index) ? styles.red : styles.black}
                    `}>{index}</div>
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
