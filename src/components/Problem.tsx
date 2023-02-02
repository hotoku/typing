import { Box, Card, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
};

function History({ vals }: HistoryProps): JSX.Element {
  return (
    <>
      {vals.map((v, i) => {
        return (
          <div
            key={i}
            style={{
              float: "left",
              width: "1rem",
              border: "solid black",
              borderWidth: "1px",
            }}
          >
            {v}
          </div>
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
        blink("#ffeeee");
      } else {
        blink("#aaccff");
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
      <Card style={{ margin: "0 auto", width: "10em", background: color }}>
        <Typography variant="h1" component="div">
          <Box component="span">{prob}</Box>
        </Typography>
      </Card>
      <History vals={probHistory} />
      <History vals={ansHistory} />
    </Paper>
  );
}

export default Problem;
