import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [greeting, setGreeting] = useState<string>("");

  React.useEffect(() => {
    fetch("http://localhost:3000/drones/healthcheck")
      .then((res) => res.json())
      .then((data) => {
        setGreeting(data);
      });
  }, [count]);

  return (
    <div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button>greeting is {greeting}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;