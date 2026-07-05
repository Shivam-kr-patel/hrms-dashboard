"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AttendanceDetailsPage() {
  const { id } = useParams();

  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  async function fetchAttendance() {
    try {
      const response = await fetch(`/api/attendance/${id}`);
      const result = await response.json();

      setAttendance(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        Loading...
      </div>
    );
  }

  if (!attendance) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        Attendance not found.
      </div>
    );
  }

  return (
    <div className="max-w-3xl rounded-xl bg-white p-8 shadow">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Attendance Details
        </h1>

        <Link
          href="/dashboard/attendance"
          className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
        >
          Back
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">
            Employee
          </p>

          <p className="font-semibold">
            {attendance.employee?.firstName}{" "}
            {attendance.employee?.lastName}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Employee ID
          </p>

          <p className="font-semibold">
            {attendance.employee?.employeeId}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Department
          </p>

          <p className="font-semibold">
            {attendance.employee?.department}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Date
          </p>

          <p className="font-semibold">
            {new Date(attendance.date).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Check In
          </p>

          <p className="font-semibold">
            {attendance.checkIn}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Check Out
          </p>

          <p className="font-semibold">
            {attendance.checkOut}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              attendance.status === "Present"
                ? "bg-green-100 text-green-700"
                : attendance.status === "Absent"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {attendance.status}
          </span>
        </div>

        <div className="md:col-span-2">
          <p className="text-sm text-gray-500">
            Remarks
          </p>

          <p className="font-semibold">
            {attendance.remarks || "-"}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Link
          href={`/dashboard/attendance/${attendance._id}/edit`}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Edit Attendance
        </Link>
      </div>
    </div>
  );
}