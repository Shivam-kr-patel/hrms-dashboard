"use client";

import { useEffect, useState } from "react";

import {
  Users,
  Building2,
  CalendarCheck,
  ClipboardList,
} from "lucide-react";

import DashboardCard from "@/components/DashboardCard";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    try {
      const response = await fetch("/api/dashboard");
      const result = await response.json();

      setDashboard(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-gray-500">
          Here's what's happening in your HRMS today.
        </p>
      </section>

      {/* Cards */}
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <DashboardCard
          title="Employees"
          value={dashboard.employeeCount}
          growth=""
          icon={Users}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Departments"
          value={dashboard.departmentCount}
          growth=""
          icon={Building2}
          color="bg-violet-600"
        />

        <DashboardCard
          title="Attendance"
          value={dashboard.attendanceCount}
          growth=""
          icon={CalendarCheck}
          color="bg-green-600"
        />

        <DashboardCard
          title="Pending Leaves"
          value={dashboard.pendingLeaveCount}
          growth=""
          icon={ClipboardList}
          color="bg-orange-500"
        />
      </section>

      {/* Bottom */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Attendance Overview */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Attendance Overview
            </h2>

            <button className="text-sm font-medium text-blue-600 hover:underline">
              View Report
            </button>
          </div>

          <div className="space-y-5">
            {[
              { day: "Monday", value: 90 },
              { day: "Tuesday", value: 82 },
              { day: "Wednesday", value: 95 },
              { day: "Thursday", value: 88 },
              { day: "Friday", value: 75 },
            ].map((item) => (
              <div key={item.day}>
                <div className="mb-2 flex justify-between text-sm">
                  <span>{item.day}</span>
                  <span>{item.value}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Employees */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Recent Employees
            </h2>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="pb-3">
                  Employee
                </th>

                <th className="pb-3">
                  Department
                </th>

                <th className="pb-3">
                  Role
                </th>

                <th className="pb-3">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {dashboard.recentEmployees.map(
                (employee) => (
                  <tr
                    key={employee._id}
                    className="border-b last:border-0"
                  >
                    <td className="py-4 font-medium">
                      {employee.firstName}{" "}
                      {employee.lastName}
                    </td>

                    <td>
                      {employee.department}
                    </td>

                    <td>
                      {employee.designation}
                    </td>

                    <td>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          employee.status ===
                          "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {employee.status}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}