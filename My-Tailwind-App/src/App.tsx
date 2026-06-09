import './App.css'

export default function App() {

  const pStyle = {
    color: 'orange',
    backgroundColor: 'black',
    padding: '20px'
  }


  return <>
    <h1 className="text-2xl"> My React App</h1>
    <h1 className="text-3xl"> My React App</h1>
    <h1 className="text-4xl"> My React App</h1>


    <h2 className="text-blue-800 text-5xl m-2">Hello Tailwind</h2>
    <h2 className="text-pink-400 text-5xl m-2 ">Hello Tailwind</h2>


    { /* {Internal css} */}
    <p style={{ color: "green", margin: '10px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>

    {/* {Inline css} */}
    <p style={pStyle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>


    {/* {Eternal css} */}
    <div className="container">
      <h1 className="title">Hello Tailwind</h1>
    </div>

  </>
}