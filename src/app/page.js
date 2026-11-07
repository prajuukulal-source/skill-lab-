import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center text-center p-6">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Master Your Study Schedule with <span className="text-blue-600">StudySync</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mb-8">
        Minimalist daily study time-blocker and task manager built for students to eliminate cramming and boost productivity.
      </p>
      <Link
        href="/dashboard"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}