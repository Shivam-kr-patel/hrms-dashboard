"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

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

      if (!result.success) {
        alert(result.message);
        return;
      }

      setAttendance(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  if (!attendance) return null;

  return (
    <div className="rounded-xl bg-white p-8 shadow">

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Attendance Details
        </h1>

        <Link
          href={`/dashboard/attendance/${attendance._id}/edit`}
          className="rounded bg-blue-600 px-5 py-2 text-white"
        >
          Edit
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-sm text-gray-500">Employee</p>
          <p>
            {attendance.employee?.firstName}{" "}
            {attendance.employee?.lastName}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p>
            {new Date(attendance.date).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Check In</p>
          <p>{attendance.checkIn}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Check Out</p>
          <p>{attendance.checkOut}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p>{attendance.status}</p>
        </div>

        <div className="col-span-2">
          <p className="text-sm text-gray-500">Remarks</p>
          <p>{attendance.remarks}</p>
        </div>

      </div>

    </div>
  );
}