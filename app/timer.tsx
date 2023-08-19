"use client";

import { v4 as uuidv4 } from "uuid";
import { SetStateAction, useState } from "react";

import { type Times, useStopWatch } from "./components/stopwatchhook";

function OptionsPanel({
  options,
  setOptions,
}: {
  options: { targetTime: boolean };
  setOptions: Function;
}) {
  return (
    <div className="flex flex-col justify-center rounded-[5px] border-2 border-slate-900 p-5">
      <h1 className="text-center">Options Panel</h1>
      <form className="flex flex-col">
        <div className="flex items-center gap-2 p-2">
          <label htmlFor="targetTimeToggle">Enable Target Time</label>
          <input
            type="checkbox"
            id="targetTimeToggle"
            checked={options.targetTime}
            onChange={(e) =>
              setOptions({ ...options, targetTime: e.target.checked })
            }
          />
        </div>
        <div className="flex items-center gap-2 p-2">
          <label>Select Target Time</label>
        </div>
      </form>
    </div>
  );
}

export default function Stopwatch() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [previousTimes, setPreviousTimes] = useState<Times[]>([]);
  const { time, start, stop, status } = useStopWatch();
  const [timerOptions, setTimerOptions] = useState({ targetTime: false });

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
    <div className="flex flex-col gap-5 sm:flex-row">
      <OptionsPanel options={timerOptions} setOptions={setTimerOptions} />
      <div className="flex min-w-max flex-col items-center justify-between gap-5 rounded-[5px] border-2 border-slate-900 p-5">
        <h1 className="text-center text-xl">Hold Stopwatch</h1>
        <div>
          <p>{time.seconds} seconds</p>
          <p>{time.minutes} minutes</p>
          <p>{time.hours} hours</p>
        </div>
        <p>{status}</p>
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
    </div>
  );
}
