import { useState, useRef } from "react";
import { intervalToDuration, millisecondsToSeconds } from "date-fns";
import { v4 as uuidv4 } from "uuid";

export interface Times {
  hours: number;
  minutes: number;
  seconds: number;
  id: string;
}

export type TimerOptions = {
  targetTimeEnabled?: boolean;
  targetTime?: number;
  stopAtTargetTime?: boolean;
  savelimit?: number;
};

export type PreparationOptions = {
  preparationEnabled?: boolean;
  preparationTime?: number;
};

export function useStopWatch(
  options: TimerOptions,
  preparationOptions: PreparationOptions,
) {
  const [previousTimes, setPreviousTimes] = useState<Times[]>([]);
  const [time, setTime] = useState<Times>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    id: "no assigned id",
  });
  const [prepTime, setPrepTime] = useState(0);
  const [status, setStatus] = useState<"stopped" | "running" | "preparing">(
    "stopped",
  );
  const [reachedTarget, setReachedTarget] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>(null!);
  const [started, setStarted] = useState(false);
  const buttonref = useRef<HTMLButtonElement>(null);

  function stop() {
    setStarted(!started);
    setStatus("stopped");
    saveTime();
    setTime({ hours: 0, minutes: 0, seconds: 0, id: "no assigned id" });
    setReachedTarget(false);
    clearInterval(intervalRef.current);
  }

  function saveTime() {
    if (options.savelimit) {
      setPreviousTimes((previousTimes) => {
        if (previousTimes.length >= options.savelimit!) {
          return previousTimes.slice(1).concat({ ...time, id: uuidv4() });
        }
        return previousTimes.concat({ ...time, id: uuidv4() });
      });
    } else {
      setPreviousTimes((previousTimes) => {
        return previousTimes.concat({ ...time, id: uuidv4() });
      });
    }
  }

  async function start() {
    setStarted(!started);
    if (preparationOptions.preparationEnabled) {
      await preparing();
      running();
    } else {
      running();
    }
  }

  function preparing() {
    let preparingPromise = new Promise((resolve, reject) => {
      setStatus("preparing");
      let startTime = Date.now();
      intervalRef.current = setInterval(() => {
        const timeSpent = intervalToDuration({
          start: startTime,
          end: Date.now(),
        });

        setPrepTime(timeSpent.seconds as number);

        if (timeSpent.seconds === preparationOptions.preparationTime) {
          clearInterval(intervalRef.current);
          resolve("Preparation Done");
        }
      }, 10);
    });
    return preparingPromise;
  }

  function running() {
    setStatus("running");
    let startTime = Date.now();
    intervalRef.current = setInterval(() => {
      const timeSpent = intervalToDuration({
        start: startTime,
        end: Date.now(),
      });
      const timeInMs = Date.now() - startTime;

      setTime((t) => {
        return {
          hours: timeSpent.hours as number,
          minutes: timeSpent.minutes as number,
          seconds: timeSpent.seconds as number,
          id: time.id,
        };
      });

      if (options.targetTimeEnabled) {
        if (
          millisecondsToSeconds(timeInMs) > options.targetTime! &&
          options.stopAtTargetTime
        ) {
          buttonref.current!.click();
        }
        if (millisecondsToSeconds(timeInMs) === options.targetTime) {
          setReachedTarget(true);
        }
      }
    }, 10);
  }

  return {
    time,
    start,
    stop,
    status,
    reachedTarget,
    prepTime,
    previousTimes,
    started,
    setStarted,
    buttonref,
  };
}
