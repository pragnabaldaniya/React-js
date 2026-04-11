import { useState } from "react";

export default function App() {

  const [counter, setCounter] = useState(1);

  const increment = () => {
    if (counter < 15) {
      setCounter(counter + 1);
    } else {
      alert("Out of Stock...");
    }
  };

  const decrement = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      alert("Minimum Count One (1)...");
    }
  };

  // Button CSS
  const myBtnCss = {
    backgroundColor: "white",
    border: "none",
    margin: "10px",
    padding: "10px 15px",
    borderRadius: "50px",
    color: "white",
    fontSize: "18px",
    cursor: "pointer"
  };

  // Card CSS
  const cardStyle = {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(255, 255, 255, 0.3)",
    textAlign: "center",
    width: "260px",
    color: 'white'
  };

  // Background Image Container
  const containerStyle = {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('https://images.unsplash.com/photo-1508780709619-79562169bc64')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  };

  const counterStyle = {
    fontSize: "25px",
    fontWeight: "bold",
    margin: "10px"
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>🛒 Counter App</h2>

        <div>
          <button style={myBtnCss} onClick={increment}>➕</button>
          <span style={counterStyle}>{counter}</span>
          <button style={myBtnCss} onClick={decrement}>➖</button>
        </div>

      </div>
    </div>
  );
}