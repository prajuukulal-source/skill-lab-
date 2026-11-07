"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function FocusTimerPage() {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState("work"); // 'work' or 'break'

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds((prev) => prev - 1);
                } else if (minutes > 0) {
                    setMinutes((prev) => prev - 1);
                    setSeconds(59);
                } else {
                    // Timer completed
                    setIsActive(false);
                    alert(
                        mode === "work"
                            ? "Focus session complete! Time for a break."
                            : "Break over! Time to get back to studying."
                    );
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, minutes, seconds, mode]);

    const startTimer = () => setIsActive(true);
    const pauseTimer = () => setIsActive(false);

    const resetTimer = () => {
        setIsActive(false);
        if (mode === "work") {
            setMinutes(25);
        } else {
            setMinutes(5);
        }
        setSeconds(0);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setMinutes(newMode === "work" ? 25 : 5);
        setSeconds(0);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-gray-900">
            <Navbar />

            <main className="max-w-2xl mx-auto p-6 mt-12 text-center space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">Focus Timer</h1>
                    <p className="text-gray-500 text-sm mt-1">
                        Boost your productivity with standard Pomodoro cycles.
                    </p>
                </div>

                {/* Mode Toggles */}
                <div className="inline-flex p-1 bg-gray-200 rounded-xl space-x-1">
                    <button
                        onClick={() => switchMode("work")}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${mode === "work"
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600"
                            }`}
                    >
                        Work (25m)
                    </button>
                    <button
                        onClick={() => switchMode("break")}
                        className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${mode === "break"
                            ? "bg-white text-green-600 shadow-sm"
                            : "text-gray-600"
                            }`}
                    >
                        Break (5m)
                    </button>
                </div>

                {/* Timer Display */}
                <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <div className="text-7xl font-extrabold text-gray-900 tracking-tight font-mono">
                        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                    </div>

                    <div className="flex justify-center space-x-4">
                        {!isActive ? (
                            <button
                                onClick={startTimer}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow transition"
                            >
                                Start
                            </button>
                        ) : (
                            <button
                                onClick={pauseTimer}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-8 py-3 rounded-xl shadow transition"
                            >
                                Pause
                            </button>
                        )}
                        <button
                            onClick={resetTimer}
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-xl transition"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}