import React, { useEffect, useState } from 'react';

export default function StopWatch() {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  // timer effect
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime(state => state + 1)
    }, 1000);


    return () => clearInterval(interval);
  }, [isRunning]);



  // LocalStorage se logs load
  useEffect(() => {
    const storedLogs = localStorage.getItem("stopwatch-logs");

    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  // Logs save karne wala effect
  useEffect(() => {
    localStorage.setItem("stopwatch-logs", JSON.stringify(logs));
  }, [logs]);


  // hours minutes second math logic
  const hours = Math.floor(time / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
  const second = Math.floor(time % 60).toString().padStart(2, '0');



  // stop button mathod
  const handleStop = () => {
    if (!isRunning) return;
    setIsRunning(false);
    setLogs((prev) => [...prev, `${hours}:${minutes}:${second}`]);
  };

  // reset button mathod
  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };


  // logs remove
  const handleClearLogs = () => {
    setLogs([]);
  };

  return (
    // Deep dark mesh-like background
    <div className="min-h-screen bg-[#0f172a] bg-gradient-to-br from-slate-950 via-[#0f172a] to-indigo-950 flex flex-col items-center justify-center p-4 text-slate-200 font-sans antialiased selection:bg-indigo-500/30">

      {/* Glow Effect Elements behind the card */}
      <div className="absolute w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-x-20 -translate-y-20 pointer-events-none" />
      <div className="absolute w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl translate-x-20 translate-y-20 pointer-events-none" />

      {/* Glassmorphism Card */}
      <div className="relative w-full max-w-sm backdrop-blur-xl bg-white/[0.03] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/40 p-6 transition-all duration-300 hover:border-white/[0.12]">

        {/* Header - Subdued & Small */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
          <h1 className="text-center text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
            STOP WATCH
          </h1>
        </div>

        {/* Timer Display - Balanced & Sharp */}
        <div className="text-center font-mono text-5xl font-extrabold tracking-tight text-white my-6 tabular-nums drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]">
          {hours} : {minutes} : {second}
        </div>



        {/* Controls - Micro Layout */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          <button
            onClick={() => setIsRunning(true)}
            disabled={isRunning}
            className={`py-2 px-3 rounded-lg font-medium text-xs transition-all duration-200 ${isRunning
              ? 'bg-white/[0.02] text-slate-600 cursor-not-allowed border border-transparent'
              : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 active:scale-95'
              }`}
          >
            Start
          </button>

          <button
            onClick={handleStop}
            disabled={!isRunning}
            className={`py-2 px-3 rounded-lg font-medium text-xs transition-all duration-200 ${!isRunning
              ? 'bg-white/[0.02] text-slate-600 cursor-not-allowed border border-transparent'
              : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/20 active:scale-95'
              }`}
          >
            Stop
          </button>

          <button
            onClick={handleReset}
            className="py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.05] font-medium text-xs transition-all duration-200 active:scale-95"
          >
            Reset
          </button>
        </div>

        {/* Logs Section */}
        <div className="border-t border-white/[0.06] pt-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Logs History ({logs.length})
            </h2>
            {logs.length > 0 && (
              <button
                onClick={handleClearLogs}
                className="text-[10px] font-semibold text-rose-400/80 hover:text-rose-400 transition-colors bg-rose-500/5 hover:bg-rose-500/10 px-2 py-0.5 rounded"
              >
                Clear All
              </button>
            )}
          </div>

          {logs.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-5 italic bg-white/[0.01] rounded-xl border border-dashed border-white/[0.04]">
              No checkpoints recorded yet.
            </p>
          ) : (
            <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {logs.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/[0.02] hover:bg-white/[0.04] px-3 py-2 rounded-lg border border-white/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Time Captured
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-200 tracking-wide">
                    {item} <span className="text-[10px] text-slate-500 font-sans font-normal ml-0.5">mins</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}