
import Header from "./Header";
import Hero from "./Hero"
function App() {

  // Spread
  console.log("---Spread to Array---");

  let array1 = [10, 20, 30, 40, 50];
  let array2 = [111, 121, ...array1, 60, 70, 80];

  console.log(array1);
  console.log(array2);

  // Spread to object
  console.log("---Spread to Object---");

  let data = {
    name: "Pragna",
    age: 25,
    location: "Surat",
    isMarried: true
  };
  // data = { ...data, age: 35, location: "Rajkot" }

  const object = {
    salary: 78000,
    ...data
  }

  console.log(data);
  console.log(object);



  // Rest
  console.log("--Rest Operator--");

  function myFun(...numbers) {
    console.log("Rest Number : ", numbers);
  }

  myFun(10, 20, 30, 40, 50);



  const cars = ["ABC", "DEF", "BMW", "TATA", "BAJAJ"];

  // const first = cars[0];
  // const second = cars[1];
  // const third = cars[2];

  const [first, second, third, ...pendingCar] = cars;
  const { name, age, ...pendingData } = data;

  console.log(name); // Pragna
  console.log(age); // 25
  console.log(pendingData); // {location : "Surat", isMarried : true}


  console.log(first); // ABC
  console.log(second); // DEF
  console.log(third); // BMW
  console.log(pendingCar); // [TATA, BAJAJ]


  return (
    <>
      <Header />
      <Hero />
    </>
  )
}

export default App
