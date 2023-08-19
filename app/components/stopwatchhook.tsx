import { useState, useRef } from "react";
import { intervalToDuration } from "date-fns";

export interface Times {
  hours: number;
  minutes: number;
  seconds: number;
  id: string;
}

export function useStopWatch(options?: {}) {
  const [time, setTime] = useState<Times>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    id: "no assigned id",
  });
  const [status, setStatus] = useState<"stopped" | "running">("stopped");
  const intervalRef = useRef<NodeJS.Timeout>(null!);

  function stop() {
    setStatus("stopped");
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
      id: "no assigned id",
    });
    clearInterval(intervalRef.current);
  }

  function start() {
    setStatus("running");
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

  return {
    time,
    start,
    stop,
    status,
  };
}
