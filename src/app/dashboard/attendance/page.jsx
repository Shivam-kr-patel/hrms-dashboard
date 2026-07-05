"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  async function fetchAttendance() {
    try {
      const response = await fetch("/api/attendance");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setAttendance(result.data || []);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteAttendance(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/attendance/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert(result.message);

      fetchAttendance();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Attendance
          </h1>

          <p className="text-gray-500">
            Employee Attendance
          </p>
        </div>

        <Link
          href="/dashboard/attendance/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Mark Attendance
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-4 text-left">
                Employee
              </th>

              <th className="px-5 py-4 text-left">
                Date
              </th>

              <th className="px-5 py-4 text-left">
                Check In
              </th>

              <th className="px-5 py-4 text-left">
                Check Out
              </th>

              <th className="px-5 py-4 text-left">
                Status
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {attendance.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-gray-500"
                >
                  No attendance records found.
                </td>
              </tr>
            ) : (
              attendance.map((item) => (
                <tr
                  key={item._id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4 font-medium">
                    {item.employee?.firstName}{" "}
                    {item.employee?.lastName}
                  </td>

                  <td className="px-5 py-4">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4">
                    {item.checkIn}
                  </td>

                  <td className="px-5 py-4">
                    {item.checkOut}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        item.status === "Present"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Absent"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-4">
                      <Link
                        href={`/dashboard/attendance/${item._id}`}
                      >
                        <Eye
                          size={18}
                          className="text-gray-600"
                        />
                      </Link>

                      <Link
                        href={`/dashboard/attendance/${item._id}/edit`}
                      >
                        <Pencil
                          size={18}
                          className="text-blue-600"
                        />
                      </Link>

                      <Trash2
                        size={18}
                        className="cursor-pointer text-red-600"
                        onClick={() =>
                          deleteAttendance(item._id)
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}