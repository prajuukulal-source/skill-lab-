"use client";
import { useState } from "react";
import { useTasks } from "@/context/TaskContext";

export default function AddTaskModal({ isOpen, onClose }) {
    const { addTask } = useTasks();
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !subject) return;

        addTask({ title, subject, priority, dueDate });
        setTitle("");
        setSubject("");
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-md space-y-4 shadow-xl">
                <h2 className="text-xl font-bold text-gray-900">Add New Task</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                            Task Title
                        </label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g., Revise Chapter 3"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                            Subject
                        </label>
                        <input
                            type="text"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            placeholder="e.g., Computer Science"
                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                                Priority
                            </label>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                                Due Date
                            </label>
                            <input
                                type="date"
                                required
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg text-sm font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium shadow"
                        >
                            Save Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}