"use client";

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import { type Times, useStopWatch } from "./components/stopwatchhook";

export default function Stopwatch() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [previousTimes, setPreviousTimes] = useState<Times[]>([]);
  const { time, start, stop, status } = useStopWatch();

  function handleStartStopButtons() {
    if (!timerStarted) {
      start();
      setTimerStarted(!timerStarted);
    } else {
      setPreviousTimes((prev) => prev.concat({ ...time, id: uuidv4() }));
      stop();
      setTimerStarted(!timerStarted);
    }
  }

  return (
    <div className="flex min-w-max flex-col items-center justify-between gap-5 rounded-[5px] border-2 border-slate-900 p-5">
      <h1 className="text-center text-xl">Hold Stopwatch</h1>
      <div>
        <p>{time.seconds} seconds</p>
        <p>{time.minutes} minutes</p>
        <p>{time.hours} hours</p>
      </div>
      <p>{status === "running" ? "running" : "stopped"}</p>
      <div id="controls" className="flex justify-between gap-1">
        {timerStarted ? (
          <button
            className="bg-slate-800 px-5 py-2 text-xl text-white"
            onClick={handleStartStopButtons}
          >
            Stop
          </button>
        ) : (
          <button
            className="bg-slate-800 px-5 py-2 text-xl text-white"
            onClick={handleStartStopButtons}
          >
            Start
          </button>
        )}
      </div>
      <ul>
        <h1>Previous Times</h1>
        {previousTimes.map((t) => {
          return (
            <li key={t.id}>{`${t.seconds}s ${t.minutes}m ${t.hours}h`}</li>
          );
        })}
      </ul>
      <p>Does it work?</p>
    </div>
  );
}
