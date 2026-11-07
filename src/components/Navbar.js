import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">StudySync</span>
            </div>
            <div className="flex items-center space-x-6 text-sm font-medium text-gray-700">
                <Link href="/" className="hover:text-blue-600">Home</Link>
                <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
                <Link href="/login" className="hover:text-blue-600">Login</Link>
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                    AS
                </div>
            </div>
        </nav>
    );
}