"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useTasks } from "@/context/TaskContext";

export default function AssignmentsPage() {
    const { assignments, addAssignment, toggleAssignmentStatus, deleteAssignment } = useTasks();
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !subject) return;
        addAssignment({ title, subject, dueDate });
        setTitle("");
        setSubject("");
        setDueDate("");
    };

    return (
        <div className="min-h-screen bg-slate-50 text-gray-900">
            <Navbar />
            <main className="max-w-4xl mx-auto p-6 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">Assignments</h1>
                    <p className="text-gray-500 text-sm mt-1">Track and submit your homework and college projects.</p>
                </div>

                {/* Add Assignment Form */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-lg font-semibold">Add New Assignment</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                            type="text"
                            placeholder="Assignment Title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Subject"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                        <input
                            type="date"
                            required
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm shadow">
                        + Add Assignment
                    </button>
                </form>

                {/* Assignment List */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-xl font-semibold">Pending & Completed Assignments</h2>
                    {assignments.length === 0 ? (
                        <p className="text-gray-500 text-sm">No assignments found.</p>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {assignments.map((item) => (
                                <li key={item.id} className="py-3 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="checkbox"
                                            checked={item.status === "Completed"}
                                            onChange={() => toggleAssignmentStatus(item.id)}
                                            className="w-4 h-4 text-blue-600 rounded border-gray-300 cursor-pointer"
                                        />
                                        <div>
                                            <span className={`text-sm font-medium ${item.status === "Completed" ? "line-through text-gray-400" : ""}`}>
                                                {item.title}
                                            </span>
                                            <span className="block text-xs text-gray-400">Due: {item.dueDate}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3 text-xs">
                                        <span className="px-2.5 py-1 bg-blue-50 text-blue-700 font-medium rounded-full">{item.subject}</span>
                                        <button onClick={() => deleteAssignment(item.id)} className="text-gray-400 hover:text-red-600">✕</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}