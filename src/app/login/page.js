"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTasks } from "@/context/TaskContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useTasks();
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            login(email);
            router.push("/dashboard");
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm w-full max-w-md space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-blue-600">StudySync</h1>
                    <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="student@college.edu"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm shadow transition"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}