"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import AddTaskModal from "@/components/AddTaskModal";
import { useTasks } from "@/context/TaskContext";

export default function Dashboard() {
    const { tasks, toggleTaskStatus, deleteTask } = useTasks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "Completed").length;
    const pendingTasks = totalTasks - completedTasks;

    const filteredTasks = tasks.filter((task) => {
        const matchesFilter = filter === "All" || task.priority === filter;
        const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.subject.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-slate-50 text-gray-900">
            <Navbar />

            <main className="max-w-6xl mx-auto p-6 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-gray-500 text-sm">Organize your daily study sessions.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow transition"
                    >
                        + Add Task
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card title="Total Tasks" value={totalTasks} subtitle="Assigned active tasks" icon="📚" />
                    <Card title="Completed" value={completedTasks} subtitle="Tasks finished" icon="✅" />
                    <Card title="Pending" value={pendingTasks} subtitle="Action required" icon="⏳" />
                </div>

                {/* Task Section */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <h2 className="text-xl font-semibold">Today's Schedule</h2>

                        <div className="flex flex-col sm:flex-row gap-3">
                            {/* Search Bar */}
                            <input
                                type="text"
                                placeholder="Search tasks or subjects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="px-3.5 py-1.5 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* Priority Filter */}
                            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg text-xs font-medium">
                                {["All", "High", "Medium", "Low"].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => setFilter(level)}
                                        className={`px-3 py-1 rounded-md transition ${filter === level
                                            ? "bg-white text-blue-600 shadow-xs font-semibold"
                                            : "text-gray-600 hover:text-gray-900"
                                            }`}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {filteredTasks.length === 0 ? (
                        <div className="text-center py-8 text-gray-500 text-sm">
                            No study tasks found matching your criteria.
                        </div>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {filteredTasks.map((task) => (
                                <li key={task.id} className="py-3.5 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={task.status === "Completed"}
                                            onChange={() => toggleTaskStatus(task.id)}
                                            className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                                        />
                                        <div>
                                            <span className={`block text-sm font-medium ${task.status === "Completed" ? "line-through text-gray-400" : "text-gray-900"
                                                }`}>
                                                {task.title}
                                            </span>
                                            {task.dueDate && (
                                                <span className="text-xs text-gray-400">Due: {task.dueDate}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 text-xs">
                                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-medium rounded-full">
                                            {task.subject}
                                        </span>
                                        <span className={`px-2.5 py-1 rounded-full font-semibold ${task.priority === "High" ? "bg-red-100 text-red-700" :
                                            task.priority === "Medium" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                                            }`}>
                                            {task.priority}
                                        </span>
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="text-gray-400 hover:text-red-600 p-1"
                                            title="Delete"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>

            <AddTaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}