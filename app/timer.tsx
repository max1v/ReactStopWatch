"use client";

import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef } from "react";
import {
  differenceInMilliseconds,
  millisecondsToSeconds,
  millisecondsToHours,
  millisecondsToMinutes,
  intervalToDuration,
} from "date-fns";

interface Times {
  hours: number;
  minutes: number;
  seconds: number;
  id: string;
}

export default function Stopwatch() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerStatus, setTimerStatus] = useState("stopped");
  const [previousTimes, setPreviousTimes] = useState<Times[]>([]);

  const [time, setTime] = useState<Times>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    id: "no assigned id",
  });
  const intervalRef = useRef(null) as any;

  function handleStartStopButtons() {
    if (!timerStarted) {
      startTimer();
      setTimerStarted(!timerStarted);
    } else {
      setPreviousTimes((prev) => prev.concat({ ...time, id: uuidv4() }));
      setTime({
        hours: 0,
        minutes: 0,
        seconds: 0,
        id: "no assigned id",
      });
      setTimerStarted(!timerStarted);
      clearInterval(intervalRef.current);
    }
  }

  function startTimer() {
    let startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const timeSpent = intervalToDuration({
        start: startTime,
        end: Date.now(),
      });
      setTime({
        hours: timeSpent.hours as number,
        minutes: timeSpent.minutes as number,
        seconds: timeSpent.seconds as number,
        id: time.id,
      });
    }, 10);
  }

  return (
    <div className="flex flex-col items-center justify-between gap-5 border-2 border-slate-900 rounded-[5px] p-5 min-w-max">
      <h1 className="text-xl text-center">Hold Stopwatch</h1>
      <div>
        <p>{time.seconds} seconds</p>
        <p>{time.minutes} minutes</p>
        <p>{time.hours} hours</p>
      </div>
      <div id="controls" className="flex justify-between gap-1">
        {timerStarted ? (
          <button
            className="bg-slate-800 px-5 py-2 text-white text-xl"
            onClick={handleStartStopButtons}
          >
            Stop
          </button>
        ) : (
          <button
            className="bg-slate-800 px-5 py-2 text-white text-xl"
            onClick={handleStartStopButtons}
          >
            Start
          </button>
        )}
      </div>
      <ul>
        {previousTimes.map((t) => {
          return (
            <li key={t.id}>{`${t.seconds}s ${t.minutes}m ${t.hours}h`}</li>
          );
        })}
      </ul>
    </div>
  );
}
