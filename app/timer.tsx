"use client";

import { useState } from "react";

import { useStopWatch } from "./components/stopwatchhook";

export default function Stopwatch() {
  const [timerOptions, setTimerOptions] = useState({
    targetTimeEnabled: false,
    targetTime: "0",
    stopAtTargetTime: false,
  });
  const [preparationOptions, setPreparationOptions] = useState({
    preparationEnabled: false,
    preparationTime: 5,
  });
  const {
    time,
    start,
    stop,
    status,
    reachedTarget,
    prepTime,
    previousTimes,
    started,
    buttonref,
  } = useStopWatch(timerOptions, preparationOptions);

  async function handleStartStopButtons() {
    if (!started) {
      start();
    } else {
      stop();
    }
  }

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
      {
        <OptionsPanel
          options={timerOptions}
          setOptions={setTimerOptions}
          preparationOptions={preparationOptions}
          setPreparationOptions={setPreparationOptions}
        />
      }
      <div className="flex min-w-max flex-col items-center justify-between gap-5 rounded-[5px] border-2 border-slate-900 p-5">
        <h1 className="text-center text-xl">Hold Stopwatch</h1>
        <div>
          <p>{time.seconds} seconds</p>
          <p>{time.minutes} minutes</p>
          <p>{time.hours} hours</p>
        </div>
        <p>
          {status} {reachedTarget && "Target Reached"}
          {status === "preparing" && `${prepTime}s`}
        </p>
        <div id="controls" className="flex justify-between gap-1">
          {started ? (
            <button
              ref={buttonref}
              className="bg-slate-800 px-5 py-2 text-xl text-white"
              onClick={handleStartStopButtons}
            >
              Stop
            </button>
          ) : (
            <button
              ref={buttonref}
              className="bg-slate-800 px-5 py-2 text-xl text-white"
              onClick={handleStartStopButtons}
            >
              Start
            </button>
          )}
        </div>
        <ul>
          <h1>Previous Times</h1>
          {previousTimes
            .map((t) => {
              return (
                <li key={t.id}>{`${t.seconds}s ${t.minutes}m ${t.hours}h`}</li>
              );
            })
            .reverse()}
        </ul>
        <p>Does it work?</p>
      </div>
    </div>
  );
}

function OptionsPanel({
  options,
  setOptions,
  preparationOptions,
  setPreparationOptions,
}: {
  options: {
    targetTimeEnabled: boolean;
    targetTime: string;
    stopAtTargetTime: boolean;
  };
  setOptions: Function;
  preparationOptions: {
    preparationEnabled: boolean;
    preparationTime: number;
  };
  setPreparationOptions: Function;
}) {
  const [togglePanel, setTogglePanel] = useState(false);

  if (!togglePanel)
    return (
      <div className="flex flex-col justify-center rounded-[5px] border-2 border-slate-900 p-5">
        <button
          className="rounded-[5px] border-2 border-slate-900 bg-white text-center"
          onClick={() => setTogglePanel(!togglePanel)}
        >
          Options Panel
        </button>
      </div>
    );
  return (
    <div className="flex flex-col justify-center rounded-[5px] border-2 border-slate-900 p-5">
      <button
        className="rounded-[5px] border-2 border-slate-900 bg-white text-center"
        onClick={() => setTogglePanel(!togglePanel)}
      >
        Options Panel
      </button>
      <form className="flex flex-col">
        <div className="flex items-center gap-2 p-2">
          <label htmlFor="targetTimeToggle">Enable Target Time</label>
          <input
            type="checkbox"
            id="targetTimeToggle"
            checked={options.targetTimeEnabled}
            onChange={(e) =>
              setOptions({ ...options, targetTimeEnabled: e.target.checked })
            }
          />
        </div>
        {options.targetTimeEnabled && (
          <div className="flex flex-col justify-center gap-2 p-2">
            <label htmlFor="selectTargetTime">Target Time in seconds</label>
            <input
              className="text-center"
              type="number"
              min="0"
              step="1"
              autoComplete="off"
              value={options.targetTime}
              id="selectTargetTime"
              onChange={(e) => {
                setOptions({ ...options, targetTime: e.target.value });
              }}
            ></input>
            <label htmlFor="stopattargetcheck">Stop at target time</label>
            <input
              type="checkbox"
              id="stopattargetcheck"
              checked={options.stopAtTargetTime}
              onChange={(e) =>
                setOptions({ ...options, stopAtTargetTime: e.target.checked })
              }
            />
          </div>
        )}
        <div className="flex items-center gap-2 p-2">
          <label htmlFor="preparationTimeToggle">Enable Preparation Time</label>
          <input
            type="checkbox"
            id="preparationTimeToggle"
            checked={preparationOptions.preparationEnabled}
            onChange={(e) =>
              setPreparationOptions({
                ...preparationOptions,
                preparationEnabled: e.target.checked,
              })
            }
          />
        </div>
        {preparationOptions.preparationEnabled && (
          <div className="flex flex-col justify-center gap-2 p-2">
            <h1 className="text-center">Select Preparation time</h1>
            <button
              className={`border-2 ${
                preparationOptions.preparationTime === 5
                  ? "border-blue-500"
                  : "border-slate-900"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setPreparationOptions({
                  ...preparationOptions,
                  preparationTime: 5,
                });
              }}
            >
              5s
            </button>
            <button
              className={`border-2 ${
                preparationOptions.preparationTime === 15
                  ? "border-blue-500"
                  : "border-slate-900"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setPreparationOptions({
                  ...preparationOptions,
                  preparationTime: 15,
                });
              }}
            >
              15s
            </button>
            <button
              className={`border-2 ${
                preparationOptions.preparationTime === 30
                  ? "border-blue-500"
                  : "border-slate-900"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setPreparationOptions({
                  ...preparationOptions,
                  preparationTime: 30,
                });
              }}
            >
              30s
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
