import { MoveUpRight } from "lucide-react";

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  color = "bg-blue-500",
  growth = "+0%",
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${color}`}
        >
          {Icon && <Icon className="h-7 w-7 text-white" />}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm">
        <MoveUpRight className="h-4 w-4 text-green-500" />

        <span className="font-semibold text-green-600">
          {growth}
        </span>

        <span className="text-gray-500">
          compared to last month
        </span>
      </div>
    </div>
  );
}
