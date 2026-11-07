"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const initialTasks = [
    {
        id: 1,
        title: "Revise Data Structures - Trees & Graphs",
        subject: "Computer Science",
        priority: "High",
        status: "Pending",
        dueDate: "2026-11-10",
    },
    {
        id: 2,
        title: "Complete Operating Systems Lab Assignment",
        subject: "Computer Science",
        priority: "Medium",
        status: "Completed",
        dueDate: "2026-11-08",
    },
    {
        id: 3,
        title: "Read Chapter 4: Macroeconomics",
        subject: "Economics",
        priority: "Low",
        status: "Pending",
        dueDate: "2026-11-12",
    },
];

const TaskContext = createContext();

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState(initialTasks);
    const [user, setUser] = useState({ name: "Student User", isLoggedIn: true });

    // Load saved tasks from localStorage on initial load
    useEffect(() => {
        const savedTasks = localStorage.getItem("studysync_tasks");
        if (savedTasks) {
            try {
                setTasks(JSON.parse(savedTasks));
            } catch (e) {
                console.error("Error reading tasks from localStorage", e);
            }
        }
    }, []);

    // Sync tasks to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem("studysync_tasks", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (newTask) => {
        setTasks((prev) => [
            ...prev,
            { ...newTask, id: Date.now(), status: "Pending" },
        ]);
    };

    const toggleTaskStatus = (id) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        status: task.status === "Completed" ? "Pending" : "Completed",
                    }
                    : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const login = (email) => {
        setUser({ name: email.split("@")[0], isLoggedIn: true });
    };

    return (
        <TaskContext.Provider
            value={{ tasks, addTask, toggleTaskStatus, deleteTask, user, login }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    return useContext(TaskContext);
}