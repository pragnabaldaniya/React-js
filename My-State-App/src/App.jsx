import { useState } from "react";

function App() {

  const [num, setNum] = useState(0);

  function incrementMassage() {
    setNum(num + 1);
  }

  function decrementMassage() {
    setNum(num > 0 ? num - 1 : 0);
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      fontFamily: "sans-serif"
    }}>


      {/* Glass Card */}
      <div style={{
        backdropFilter: "blur(10px)",
        background: "rgba(255,255,255,0.2)",
        padding: "40px",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        color: "#fff",
        width: "300px"
      }}>



        <h1 style={{ marginBottom: "20px" }}>
          State : {num}
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <button
            onClick={incrementMassage}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              border: "none",
              borderRadius: "8px",
              background: "#00c853",
              color: "white",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Increment (+)
          </button>

          <button
            onClick={decrementMassage}
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#d50000",
              color: "white",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Decrement (-)
          </button>
        </div>

        <button
          onClick={() => { alert("Hello, I am Pragna..") }}
          style={{
            padding: "10px 25px",
            border: "none",
            borderRadius: "25px",
            background: "#2979ff",
            color: "white",
            cursor: "pointer",
            fontSize: "15px"
          }}
        >
          Show Name
        </button>

      </div>
    </div>
  );
}

export default App;