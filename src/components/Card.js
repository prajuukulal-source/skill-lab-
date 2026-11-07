export default function Card({ title, value, subtitle, icon }) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center text-gray-500 mb-2">
                <span className="text-sm font-medium">{title}</span>
                {icon && <span className="text-xl">{icon}</span>}
            </div>
            <div>
                <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
                {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
            </div>
        </div>
    );
}