"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useTasks } from "@/context/TaskContext";

export default function TestsPage() {
    const { tests, testResults, submitTestResult } = useTasks();
    const [activeTest, setActiveTest] = useState(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [scoreResult, setScoreResult] = useState(null);

    const startTest = (test) => {
        setActiveTest(test);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
        setScoreResult(null);
    };

    const handleSelectOption = (questionId, option) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: option });
    };

    const handleSubmitTest = () => {
        let score = 0;
        activeTest.questions.forEach((q) => {
            if (selectedAnswers[q.id] === q.answer) score += 1;
        });

        const resultObj = {
            testTitle: activeTest.title,
            score,
            total: activeTest.questions.length,
        };

        submitTestResult(resultObj);
        setScoreResult(resultObj);
        setActiveTest(null);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-gray-900">
            <Navbar />
            <main className="max-w-4xl mx-auto p-6 space-y-8">
                <div>
                    <h1 className="text-3xl font-bold">Practice Tests & Quizzes</h1>
                    <p className="text-gray-500 text-sm mt-1">Evaluate your study retention with interactive test interfaces.</p>
                </div>

                {/* Active Test Modal / Interface */}
                {activeTest && (
                    <div className="bg-white p-8 rounded-2xl border border-blue-200 shadow-xl space-y-6">
                        <div className="flex justify-between items-center border-b pb-4">
                            <h2 className="text-xl font-bold text-blue-600">{activeTest.title}</h2>
                            <span className="text-xs font-semibold text-gray-500">
                                Question {currentQuestionIndex + 1} of {activeTest.questions.length}
                            </span>
                        </div>

                        {(() => {
                            const q = activeTest.questions[currentQuestionIndex];
                            return (
                                <div className="space-y-4">
                                    <p className="text-md font-medium text-gray-900">{q.question}</p>
                                    <div className="space-y-2">
                                        {q.options.map((opt) => (
                                            <label
                                                key={opt}
                                                className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition ${selectedAnswers[q.id] === opt ? "border-blue-600 bg-blue-50 text-blue-900" : "border-gray-200 hover:bg-gray-50"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question-${q.id}`}
                                                    checked={selectedAnswers[q.id] === opt}
                                                    onChange={() => handleSelectOption(q.id, opt)}
                                                    className="text-blue-600"
                                                />
                                                <span className="text-sm">{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            );
                        })()}

                        <div className="flex justify-between pt-4 border-t">
                            <button
                                disabled={currentQuestionIndex === 0}
                                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                                className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium disabled:opacity-50"
                            >
                                Previous
                            </button>
                            {currentQuestionIndex < activeTest.questions.length - 1 ? (
                                <button
                                    onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmitTest}
                                    className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold shadow"
                                >
                                    Submit Test
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Score Popup / Alert after submission */}
                {scoreResult && (
                    <div className="bg-green-50 border border-green-200 p-6 rounded-2xl text-center space-y-2">
                        <h3 className="text-xl font-bold text-green-800">Test Submitted Successfully! 🎉</h3>
                        <p className="text-sm text-green-700">
                            You scored <span className="font-bold">{scoreResult.score}</span> out of <span className="font-bold">{scoreResult.total}</span> on {scoreResult.testTitle}.
                        </p>
                    </div>
                )}

                {/* Available Tests List */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-xl font-semibold">Available Quizzes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tests.map((test) => (
                            <div key={test.id} className="p-5 border border-gray-100 rounded-xl space-y-3 bg-slate-50/50 flex flex-col justify-between">
                                <div>
                                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{test.subject}</span>
                                    <h3 className="text-lg font-semibold mt-2">{test.title}</h3>
                                    <p className="text-xs text-gray-500 mt-1">{test.questions.length} Questions</p>
                                </div>
                                <button
                                    onClick={() => startTest(test)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold shadow transition mt-2"
                                >
                                    Start Test
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Past Test Results */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                    <h2 className="text-xl font-semibold">Test History & Results</h2>
                    {testResults.length === 0 ? (
                        <p className="text-gray-500 text-sm">No test results recorded yet.</p>
                    ) : (
                        <ul className="divide-y divide-gray-100">
                            {testResults.map((res) => (
                                <li key={res.id} className="py-3 flex items-center justify-between text-sm">
                                    <div>
                                        <span className="font-semibold">{res.testTitle}</span>
                                        <span className="block text-xs text-gray-400">Completed on: {res.date}</span>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-800 font-bold rounded-full text-xs">
                                        Score: {res.score} / {res.total}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}