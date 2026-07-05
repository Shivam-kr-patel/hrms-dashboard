"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function AttendancePage() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  async function fetchAttendance() {
    const response = await fetch("/api/attendance");
    const result = await response.json();
    setAttendance(result.data || []);
  }

  async function deleteAttendance(id) {
    if (!confirm("Delete attendance?")) return;

    await fetch(`/api/attendance/${id}`, {
      method: "DELETE",
    });

    fetchAttendance();
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

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
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          + Mark Attendance
        </Link>

      </div>

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

            {attendance.map((item) => (

              <tr
                key={item._id}
                className="border-t"
              >

                <td className="px-5 py-4">
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
                  {item.status}
                </td>

                <td className="px-5 py-4">

                  <div className="flex justify-center gap-4">

                    <Link href={`/dashboard/attendance/${item._id}`}>
                      <Eye size={18}/>
                    </Link>

                    <Link href={`/dashboard/attendance/${item._id}/edit`}>
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

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}