import { useState } from "react";
import "./App.css";
import LevelSelect from "./components/LevelSelect";
import Problem from "./components/Problem";

function App() {
  const [level, setLevel] = useState(1);

  const handleLevelChange = (level: number): void => {};

  return (
    <div className="App" style={{ padding: "10px" }}>
      <LevelSelect onChange={handleLevelChange} />
      <Problem level={level} />
    </div>
  );
}

export default App;
