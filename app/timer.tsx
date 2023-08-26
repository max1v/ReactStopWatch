"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import {
  useStopWatch,
  type TimerOptions,
  type PreparationOptions,
} from "./components/stopwatchhook";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";

export default function Stopwatch() {
  const [timerOptions, setTimerOptions] = useState({
    targetTimeEnabled: false,
    targetTime: 10,
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
    <div className="flex flex-col gap-5">
      <Card>
        <Tabs defaultValue="timer" className="flex flex-col items-center p-5">
          <TabsList>
            <TabsTrigger value="timer">Timers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="timer">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex  flex-col items-center justify-between gap-5 text-center"
            >
              <CardHeader>
                <CardTitle className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Hold Stopwatch
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-5">
                <div className="flex flex-col items-start">
                  <p className="leading-7">{time.seconds} seconds</p>
                  <p className="leading-7">{time.minutes} minutes</p>
                  <p className="leading-7">{time.hours} hours</p>
                  {timerOptions.targetTimeEnabled && (
                    <p className="text-left text-sm text-muted-foreground">{`Target time set at ${
                      timerOptions.targetTime
                    }s ${
                      timerOptions.stopAtTargetTime
                        ? " and will stop when it reaches the target"
                        : ""
                    }`}</p>
                  )}
                  {preparationOptions.preparationEnabled && (
                    <p className="text-left text-sm text-muted-foreground">{`Preparation set to last ${preparationOptions.preparationTime}s`}</p>
                  )}
                </div>
                <Badge
                  variant={`${status === "stopped" ? "outline" : "default"}`}
                >
                  {status}
                  {status === "preparing" && ` ${prepTime}s`}
                </Badge>
                {reachedTarget && (
                  <Badge variant="secondary">Target time reached</Badge>
                )}
                <Separator />
                <Button
                  ref={buttonref}
                  className=" px-5 py-2 text-xl text-white"
                  variant={started ? "destructive" : "default"}
                  onClick={handleStartStopButtons}
                >
                  {started ? "Stop" : "Start"}
                </Button>
                <Separator />
                {previousTimes.length > 0 && (
                  <motion.ul
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 1 }}
                    transition={{ type: "tween" }}
                  >
                    <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                      Previous Times
                    </h2>
                    <ScrollArea className="h-[200px] rounded-md border p-4">
                      {previousTimes
                        .map((t) => {
                          return (
                            <motion.li
                              initial={{ opacity: 0, y: -50 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 1 }}
                              transition={{ type: "tween" }}
                              key={t.id}
                            >{`${t.seconds}s ${t.minutes}m ${t.hours}h`}</motion.li>
                          );
                        })
                        .reverse()}
                    </ScrollArea>
                  </motion.ul>
                )}
              </CardContent>
            </motion.div>
          </TabsContent>
          <TabsContent value="settings">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex  flex-col items-center justify-between gap-5 text-center"
            >
              <OptionsPanel
                options={timerOptions}
                setOptions={setTimerOptions}
                preparationOptions={preparationOptions}
                setPreparationOptions={setPreparationOptions}
              />
            </motion.div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

type OptionsPanelProps = {
  options: TimerOptions;
  setOptions: Function;
  preparationOptions: PreparationOptions;
  setPreparationOptions: Function;
};

function OptionsPanel({
  options,
  setOptions,
  preparationOptions,
  setPreparationOptions,
}: OptionsPanelProps) {
  return (
    <div className="flex flex-col justify-center p-5">
      <CardTitle className="scroll-m-20 text-center text-2xl font-semibold tracking-tight">
        Options Panel
      </CardTitle>
      <form className="mt-5 flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 p-2">
          <Label
            htmlFor="targetTimeToggle"
            className="scroll-m-20 text-xl font-semibold tracking-tight"
          >
            Enable target time
          </Label>
          <Switch
            id="targetTimeToggle"
            checked={options.targetTimeEnabled}
            onCheckedChange={(checked) =>
              setOptions({ ...options, targetTimeEnabled: checked })
            }
          />
        </div>
        {options.targetTimeEnabled && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1 }}
          >
            <Card className="flex flex-col items-center gap-2 p-5">
              <Label htmlFor="selectTargetTime">Target Time in seconds</Label>
              <Input
                type="number"
                min="1"
                autoComplete="off"
                value={options.targetTime}
                id="selectTargetTime"
                onChange={(e) => {
                  setOptions({ ...options, targetTime: e.target.value });
                }}
              />
              <Label htmlFor="stopattargetcheck">Stop at target time</Label>
              <Switch
                id="stopattargetcheck"
                checked={options.stopAtTargetTime}
                onCheckedChange={(c) =>
                  setOptions({ ...options, stopAtTargetTime: c })
                }
              />
            </Card>
          </motion.div>
        )}
        <Separator />
        <div className="flex items-center gap-2 p-2">
          <Label
            htmlFor="preparationTimeToggle"
            className="scroll-m-20 text-xl font-semibold tracking-tight"
          >
            Enable preparation time
          </Label>
          <Switch
            id="preparationTimeToggle"
            checked={preparationOptions.preparationEnabled}
            onCheckedChange={(checked) =>
              setPreparationOptions({
                ...preparationOptions,
                preparationEnabled: checked,
              })
            }
          />
        </div>
        {preparationOptions.preparationEnabled && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 1 }}
          >
            <Card className="flex flex-col items-center gap-2 p-5">
              <Label>Select Preparation time</Label>
              <Select
                defaultValue={preparationOptions.preparationTime?.toString()}
                onValueChange={(currentValue) => {
                  // e.preventDefault();
                  setPreparationOptions({
                    ...preparationOptions,
                    preparationTime: parseInt(currentValue),
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Time before start" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5s</SelectItem>
                  <SelectItem value="15">15s</SelectItem>
                  <SelectItem value="30">30s</SelectItem>
                </SelectContent>
              </Select>
            </Card>
          </motion.div>
        )}
      </form>
    </div>
  );
}
