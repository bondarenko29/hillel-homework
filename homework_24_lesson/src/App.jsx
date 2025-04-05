import React from "react";
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

const Card = () => {
  return <div className="card">HELLO</div>
}

function App() {
  const [count, setCount] = useState(0);

  const currentYear = new Date().getFullYear();

  const isMoreThanFive = count > 5;

  const handlelog = () =>  {
    console.log("Hello World!")
  };

  const handleGreet = (name) => {
    console.log(`Hello, ${name}`)
  };

  const handleInput = (e) => {
    console.log("Input value: ", e.target.value);
  }

  return (
    <>

      <div style={{
          backgroundColor: "#f0f0f0",
          padding: "1rem",
          borderRadius: "12px",
          color: "#333",
        }}>Block with inline styles</div>

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>{currentYear}</p>
      <Card />
      <button onClick={handlelog}>LOG</button>
      <button onClick={() => handleGreet("JACK")}>HEY</button>

      <div>
        <input type="text" onChange={handleInput}/>
      </div>

      <h1>Vite + React!</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className={`read-the-docs ${isMoreThanFive ? "bigger-text" : ""}`}>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

// {React.createElement(
//   "div",
//   null,
//   React.createElement(
//    "a",
// {
//   href: "https://vite.dev",
//   target: "_blank",
// },
// React.createElement("img", {
//   src: viteLogo,
//   className: "logo",
//   alt: "Vite logo",
// })
// ), React.createElement(
//   "a",
//   {
//     href: "https://react.dev",
//     target: "_blank",
//   },
//   React.createElement("img", {
//     src: reactLogo,
//     className: "logo",
//     alt: "React logo",
//   })
//  )
// )}
export default App;
