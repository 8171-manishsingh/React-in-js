import { useState } from "react";
import Fiction from "./components/Fiction";
import NonFiction from "./components/NonFiction";

function App() {
  const [flag, setflag] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}> 
      <h1 style={{ textAlign: "center" }}>Mini Book Store </h1>

      <button onClick={() => setflag(!flag)} data-testid="toggle-btn" style={{width: "200px",height: "40px", backgroundColor: 
      "gray",color: "white", border: "none", padding: "5px", cursor: "pointer", borderRadius: "10px", fontSize: "15px",
        }}
>
        {flag ?  "Show Fictional Books":"Show Non-Fiction Books" }</button>

      <div data-testid="conditional-container">
        {/* Render either Fiction or NonFiction Based on the Condition */}
        {flag ?<NonFiction />:<Fiction/>}
      </div>
    </div>
  );
}
export default App;

