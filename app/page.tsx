import Stopwatch from "./timer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-5 font-mono">
      <Stopwatch />
    </main>
  );
}
