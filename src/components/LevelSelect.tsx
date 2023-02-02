import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

type LevelSelectProps = {
  onChange: (n: number) => void;
};

function LevelSelect({ onChange }: LevelSelectProps): JSX.Element {
  const [level, setLevel] = useState<number>(1);

  return (
    <Select
      value={level}
      onChange={(e) => {
        const v = e.target.value;
        const n = typeof v === "string" ? parseInt(v) : v;
        if (Number.isNaN(n)) {
          throw new Error("parse error");
        } else {
          onChange(n);
          setLevel(n);
        }
      }}
    >
      <MenuItem value={1}>1: F,J</MenuItem>
      <MenuItem value={2}>2: F,G,H,J (人差し指・中段だけ)</MenuItem>
    </Select>
  );
}

export default LevelSelect;
