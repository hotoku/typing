import { useState } from "react";
import "./App.css";
import LevelSelect from "./components/LevelSelect";
import Problem from "./components/Problem";

function App() {
  const [level, setLevel] = useState<number>(1);

  const handleLevelChange = (level: number): void => setLevel(level);

  return (
    <div className="App" style={{ padding: "10px" }}>
      <LevelSelect onChange={handleLevelChange} />
      <Problem level={level} />
    </div>
  );
}

export default App;
