import { MenuItem, Select } from "@mui/material";
import { useState } from "react";

type LevelSelectProps = {
  onChange: (n: number) => void;
  level: number;
};

function LevelSelect({ onChange, level }: LevelSelectProps): JSX.Element {
  const levels = [
    "1: FJ",
    "2: FGHJ (人差し指・中段だけ)",
    "3: RTYUFGHJVBNM (人差し指全部)",
    "4: ERTYUIDFGHJKCVBNM, (人差し指・中指)",
    "5: QWERTYUIOPASDFGHJKL;ZXCVBNM,./, (全指)",
  ];

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
        }
      }}
    >
      {levels.map((l, i) => {
        return (
          <MenuItem value={i + 1} key={i}>
            {l}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default LevelSelect;
