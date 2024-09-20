import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [percent, setPercent] = useState([0, 0])
  const [totalBill, setTotalBill] = useState(0);

  function addBill(newTotal){
    setTotalBill(newTotal);
  }

  function addPercent(index, newPercent){
    setPercent((existingArray) => {
      const newArray = [...existingArray]
      newArray[index] = newPercent;
      return newArray;
    })

  }

  function resetState(){
    setPercent([0, 0]);
    setTotalBill('');
  }


  return (
    <div>
     <h1>tip calculator</h1> 
     <BillInput  value={totalBill} onAddBill={addBill}> How much was the total? </BillInput>
     <PercentInput index={0} value={percent[0]} onAddPercent={addPercent}>
      How much did you like the service?
     </PercentInput>

     <PercentInput index={1} value={percent[1]} onAddPercent={addPercent}>
      How much did friend enjoy the service?
     </PercentInput>
     <EndTotal percent={percent} totalBill={totalBill}/>
     <Button onResetState={resetState}>Reset!</Button>
    </div>
  );
}

function Button({onResetState, children}){
  return(
    <button onClick={onResetState}>
      {children}
    </button>
  )
}

function EndTotal({percent, totalBill}){
  const intialValue = 0; 
  const percentSum = percent.reduce((accumulator, currentValue) => accumulator + currentValue, intialValue);
  console.log("PercentSum = ", percentSum)
  const averagePercent = percentSum / 2;
  console.log("AveragePercent = ", averagePercent)

  let newTotalBill = totalBill + averagePercent;
  console.log(newTotalBill)
    return(
    <div>
      <p>{totalBill === '' ? '' : "$"+ (Math.round(newTotalBill*100)/100).toFixed(2)} </p>
      </div>
  )
}

function PercentInput({index, value, onAddPercent, children}){
  return(
    <div>
      {children}
      <select value={value} onChange={(e) => onAddPercent(index, Number(e.target.value))}>
        <option value={0}>Disastisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  )
}


function BillInput({value, onAddBill,children}){
  return(
    <div>
      {children}
      <input type="number" value={value} onChange={((e) => onAddBill(Number(e.target.value)))}></input>
    </div>
  )
}

export default App;
