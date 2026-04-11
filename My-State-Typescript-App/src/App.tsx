import { useEffect, useState } from "react";

export default function App() {

  // Typescript to variabal

  let name: string = "Pragna";
  let age: number = 25;
  let isTheme: boolean = false;
  let phone: number | string = 0;

  name += "Baldaniya";
  phone = 9876543212

  // TypeScript me Array

  let array: number[] | string[] = [10, 20, 30, 40, "Hello"];

  // State se array creat

  const [counter, setCounter] = useState<number>(0);

  /*Hook : useEffect
  Synatex: 

  useEffect (function, []);
  */

  useEffect(() => {
    console.log("Use Effect is Running...", counter);

  }, [counter]);










  return <>

      <h1>Hello TypeScript</h1>

      <h2>Counter : {counter}</h2>
      <button onClick={() => { setCounter(counter + 1) }}>Increment (+)</button>

      <h4>Name : {name}</h4>
      <h4>Age : {age}</h4>
      <h4>Phone : {phone}</h4>
      <h4>Theme : {isTheme ? "Light" : "Dark"}</h4>

      <h5>Array : {array}</h5>
  

  </>



}