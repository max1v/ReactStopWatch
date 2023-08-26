# React Stop Watch

A fully typed stopwatch with preparation time and target time, built with Next.js, React, TypeScript, Shadcn UI, and Framer Motion.

## Why I made this

I recently started doing this bodyweight exercise, the ring hold, and I needed a way to record my time on the correct position, to know that I am surpassing myself (using target times) and a stopwatch that didn't start the instant I hit the start button, neither my phone's clock app nor my workout app had have these options. I thought it would be fun to make the app.

## How it works

The app is a Next.js route that renders a Stopwatch component, which renders an OptionsPanel component.

They rely on an original hook `useStopWatch` that requires 2 objects, `TimerOptions` and `PreparationOptions`:

```typescript
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
```

And returns these properties and methods:

```markdown
- `time`: Tells the current time on the clock
- `start`: To get the clock to start
- `stop`: To get the clock to stop
- `status`: To use the current state of the clock (running, stopped or preparing)
- `reachedTarget`: Tells if the user reached their target time
- `prepTime`: Tells the current preparing time
- `previousTimes`: Array containing all previous recorded times (times stopped at 0 are not recorded)
- `started`: To use for UI toggles
- `setStarted`: To use for UI toggles
- `buttonref`: To pass to the button that will start/stop the clock
- `clear`: To clear all previous recorded times.
```

## Usage

To use the app, you can visit:

[The Official Website](https://react-stop-watch-ecru.vercel.app/)

Or download the file folders and run

```
> npm run build
and when that is done, run
> npm run start
```

in the terminal from the root directory of the project
