import React, { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [greeting, setGreeting] = useState<{ hello: string }>({ hello: "" });
  console.log("🚀 ~ file: App.tsx:7 ~ App ~ greeting:", greeting);

  React.useEffect(() => {
    fetch("http://localhost:3000/drones/healthcheck")
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log("🚀 ~ file: App.tsx:16 ~ .then ~ data:", data);
        setGreeting(data);
      });
  }, [count]);

  return (
    <div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          data-testid="count"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <button data-testid="greeting">greeting is {greeting.hello}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  );
}

export default App;
