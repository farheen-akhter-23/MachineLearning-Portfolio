
import React, {useEffect, useState, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

// 0. Import depdendencies
import * as tf from "@tensorflow/tfjs"
import * as speech from "@tensorflow-models/speech-commands"

// 4. Draw Ball
import {drawGiraffe} from "./utilities";

const App = () => {
// 1. Create model and action states
const [model, setModel] = useState(null)
const [action, setAction] = useState(null)
const [labels, setLabels] = useState(null)

// 6. Create Canvas Ref and x,y,r
const canvasRef = useRef(null); 
const [x, setX] = useState(200);
const [y, setY] = useState(275);
const [r, setR] = useState(75)

// 2. Create Recognizer
const loadModel = async () =>{
  const recognizer = await speech.create("BROWSER_FFT")
  console.log('Model Loaded')
  await recognizer.ensureModelLoaded();
  console.log(recognizer.wordLabels())
  setModel(recognizer)
  setLabels(recognizer.wordLabels())
}

useEffect(()=>{loadModel()}, []); 

// 7. Update ball state
const numberMap = {
  "zero":0,
  "one":1,
  "two":2,
  "three":3,
  "four":4,
  "five":5,
  "six":6,
  "seven":7,
  "eight":8,
  "nine":9
}

useEffect(()=>{
  // Update position x,y
  const update = action === 'up' ? setY(y-10) : action==="down" ? setY(y+10) : action==="left" ? setX(x-10) : action==="right"? setX(x+10) : ""
  // Update size r
  if(Object.keys(numberMap).includes(action)){
    setR(10*numberMap[action])
  }
  const canvas = canvasRef.current;
  canvasRef.current.width = 800;
  canvasRef.current.height = 800;
  const ctx = canvasRef.current.getContext('2d')
  console.log(x,y,r)
  drawGiraffe(ctx,canvas,x,y,r)
  setAction('base')
}, [action])

// 3. Listen for Actions
function argMax(arr){
  return arr.map((x, i) => [x, i]).reduce((r, a) => (a[0] > r[0] ? a : r))[1];
}

const recognizeCommands = async () =>{
  console.log('Listening for commands')
  model.listen(result=>{
    // console.log(labels[argMax(Object.values(result.scores))])
    setAction(labels[argMax(Object.values(result.scores))])
    
  }, {includeSpectrogram:true, probabilityThreshold:0.9})
  // setTimeout(()=>model.stopListening(), 10e3)
}

  return (
    <div className="App">
      <header className="App-header">
      <h1>Voice controlled Giraffe</h1>
        {/* 5. Setup Canvas */}
        <canvas 
        ref={canvasRef}
        style={{
          marginLeft: 0,
          marginRight: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 1,
          width: 300,
          height: 300,
        }}
        />
       
          <button onClick={recognizeCommands}>Command</button>
          {action ? <div>{action}</div>:<div>No Action Detected</div> }
      </header>
    </div>
  );
}

export default App;

