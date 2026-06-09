// components/Dashboard/CountdownTimer.tsx
"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
    targetDate: string;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(targetDate).getTime();
            const difference = target - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const timerUnits = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ];

    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 rounded-2xl shadow-md p-6 mb-8 text-white">
            <div className="absolute right-0 top-0 -mt-6 -mr-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white/20 rounded-xl backdrop-blur-xs">
                        <Clock className="text-white animate-pulse" size={24} />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold tracking-tight">Flash Sale Campaign Live</h2>
                        <p className="text-sky-100 text-xs">Hurry up! Special promo campaign ending soon.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {timerUnits.map((unit, idx) => (
                        <div key={idx} className="flex items-center">
                            <div className="text-center bg-white/10 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 min-w-[70px]">
                                <div className="text-2xl font-black font-mono tracking-tight">
                                    {String(unit.value).padStart(2, '0')}
                                </div>
                                <div className="text-[10px] uppercase font-bold text-sky-200 tracking-wider mt-0.5">{unit.label}</div>
                            </div>
                            {idx < 3 && <span className="text-xl font-bold text-white/40 mx-1.5 hidden sm:inline">:</span>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}