import { Box, Card, Paper, Typography } from "@mui/material";
import { useEffect, useState, useMemo } from "react";

const red = "#ffeeee";
const blue = "#aaccff";

function randomSample(
  letters: string[],
  acceptSameProblem_?: number
): () => string {
  let last = 0;
  const acceptSameProblem = acceptSameProblem_ ?? 0.8;
  return (): string => {
    let n = Math.floor(Math.random() * letters.length);
    let q = Math.random();
    while (true) {
      if (n !== last) {
        break;
      } else if (q > acceptSameProblem) {
        break;
      } else {
        n = Math.floor(Math.random() * letters.length);
        q = Math.random();
      }
    }

    last = n;
    return letters[last];
  };
}

const problem1 = randomSample("FJ".split(""), 0.7);
const problem2 = randomSample("FGHJ".split(""));
const problem3 = randomSample("RTYUFGHJVBNM".split(""));
const problem4 = randomSample("ERTYUIDFGHJKCVBNM".split(""));
const problem5 = randomSample("QWERTYUIOPASDFGHJKL;ZXCVBNM,./ ".split(""));

function problemGenerator(level: number): () => string {
  switch (level) {
    case 1:
      return problem1;
    case 2:
      return problem2;
    case 3:
      return problem3;
    case 4:
      return problem4;
    case 5:
      return problem5;
    default:
      throw new Error("bad level");
  }
}

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

type ProblemProps = {
  level: number;
};

function Problem({ level }: ProblemProps): JSX.Element {
  const probGen = useMemo(() => problemGenerator(level), [level]);

  const [prob, setProb] = useState(probGen());
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
      const re = /^[A-Z;,\./]$/;
      const key = e.key.toUpperCase();
      if (!re.test(key)) return;
      const nextProb = probGen();

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
  }, [prob, probGen]);

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
