import { useEffect, useState } from "react";
import TableView from "./TableView";

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

    <div className="container">
      <div>
        <h1>Hello TypeScript + Bootstrap</h1>

        <h2>Counter : {counter}</h2>
        <button onClick={() => { setCounter(counter + 1) }}>Increment (+)</button>

        <h5>Name : {name}</h5>
        <h5>Age : {age}</h5>
        <h5>Phone : {phone}</h5>
        <h5>Theme : {isTheme ? "Light" : "Dark"}</h5>

        <h5>Array : {array}</h5>
      </div>

      <TableView />
    </div>

  </>



}