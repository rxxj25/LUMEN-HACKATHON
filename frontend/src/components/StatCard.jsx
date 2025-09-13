import React from "react";

export default function StatCard({ title, value, icon, color = "blue", trend = null }) {
  const colorClasses = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
    indigo: "bg-indigo-500"
  };

  const iconColorClasses = {
    blue: "text-blue-500",
    green: "text-green-500",
    yellow: "text-yellow-500",
    red: "text-red-500",
    purple: "text-purple-500",
    indigo: "text-indigo-500"
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colorClasses[color]} bg-opacity-10`}>
          <div className={`text-2xl ${iconColorClasses[color]}`}>
            {icon}
          </div>
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <div className={`flex items-center text-sm mt-1 ${
              trend.direction === 'up' ? 'text-green-600' : 
              trend.direction === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              <span className="mr-1">
                {trend.direction === 'up' ? '↗' : trend.direction === 'down' ? '↘' : '→'}
              </span>
              {trend.percentage}% {trend.period}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
