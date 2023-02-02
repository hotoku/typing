import { Box, Card, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const red = "#ffeeee";
const blue = "#aaccff";

const problemGenerator = (() => {
  let last = 0;
  const letters = ["F", "J"];

  return (): string => {
    const change = Math.random() > 0.3;
    if (change) {
      last = (last + 1) % 2;
    }
    return letters[last];
  };
})();

type HistoryProps = {
  vals: string[];
  ngs?: boolean[];
};

function History({ vals, ngs }: HistoryProps): JSX.Element {
  return (
    <>
      {vals.map((v, i) => {
        const color = ngs && ngs[i] ? red : "white";
        return (
          <Card
            key={i}
            style={{
              float: "left",
              width: "1rem",
              border: "solid black",
              borderWidth: "1px",
              background: color,
            }}
          >
            {v}
          </Card>
        );
      })}
      <div style={{ clear: "left" }} />
    </>
  );
}

function Problem(): JSX.Element {
  const [prob, setProb] = useState(problemGenerator());
  const [probHistory, setProbHistory] = useState<string[]>([]);
  const [ansHistory, setAnsHistory] = useState<string[]>([]);
  const [color, setColor] = useState("");

  if (probHistory.length !== ansHistory.length) {
    throw new Error("panic");
  }

  let ngHistory = [] as boolean[];
  for (let i = 0; i < ansHistory.length; i++) {
    ngHistory.push(probHistory[i] !== ansHistory[i]);
  }

  const blink = (color: string): void => {
    setColor(color);
    setTimeout(() => {
      setColor("white");
    }, 100);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      const re = /^[A-Z]$/;
      const key = e.key.toUpperCase();
      if (!re.test(key)) return;
      const nextProb = problemGenerator();

      if (key !== prob) {
        blink(red);
      } else {
        blink(blue);
      }

      setProb(() => nextProb);
      setProbHistory((s) => [...s, prob]);
      setAnsHistory((s) => [...s, key]);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [prob]);

  return (
    <Paper style={{ padding: "10px" }}>
      <Card
        style={{
          margin: "10px auto",
          width: "10em",
          background: color,
          border: "solid black",
          borderWidth: "1px",
        }}
      >
        <Typography variant="h1" component="div">
          <Box component="span">{prob}</Box>
        </Typography>
      </Card>
      <History vals={probHistory} />
      <History vals={ansHistory} ngs={ngHistory} />
    </Paper>
  );
}

export default Problem;
