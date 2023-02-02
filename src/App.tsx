import { useState } from "react";
import {
  useLocation,
  Routes as Routes_,
  BrowserRouter,
} from "react-router-dom";
import "./App.css";
import LevelSelect from "./components/LevelSelect";
import Problem from "./components/Problem";

type SearchParameter = {
  level?: string;
};

function parseQuery(query: string): SearchParameter {
  if (query === "" || query === undefined) {
    return {};
  }
  if (query[0] !== "?") {
    throw Error(`parseQuery: first letter must be '?' => ${query}`);
  }
  const body = query.slice(1);
  const map = new Map<string, string>();
  for (const s of body.split("&")) {
    const pair = s.split("=");
    if (pair.length !== 2) {
      throw Error(`parseQuery: splitted by '=' must be of length 2 => ${s}`);
    }
    map.set(pair[0], pair[1]);
  }
  return {
    level: map.get("level"),
  };
}

export const maybeInt = (s: string | undefined): number | undefined => {
  if (s === undefined) return undefined;
  const ret = parseInt(s);
  if (isNaN(ret)) return undefined;
  return ret;
};

function Routes(): JSX.Element {
  const query = parseQuery(useLocation().search);
  const [level, setLevel] = useState<number>(maybeInt(query.level) ?? 1);
  const handleLevelChange = (level: number): void => setLevel(level);

  return (
    <div className="App" style={{ padding: "10px" }}>
      <LevelSelect onChange={handleLevelChange} level={level} />
      <Problem level={level} />
    </div>
  );
}

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
}

export default App;
