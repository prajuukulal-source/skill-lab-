"use client";
import { TaskProvider } from "@/context/TaskContext";

export function Providers({ children }) {
    return <TaskProvider>{children}</TaskProvider>;
}