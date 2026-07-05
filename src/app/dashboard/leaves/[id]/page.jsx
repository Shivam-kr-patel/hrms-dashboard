"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function LeaveDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeave();
  }, []);

  async function fetchLeave() {
    try {
      const response = await fetch(`/api/leaves/${id}`);
      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        router.push("/dashboard/leaves");
        return;
      }

      setLeave(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  if (!leave) return null;

  return (
    <div className="rounded-xl bg-white p-8 shadow">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-3xl font-bold">
          Leave Details
        </h1>

        <Link
          href={`/dashboard/leaves/${leave._id}/edit`}
          className="rounded bg-blue-600 px-5 py-2 text-white"
        >
          Edit
        </Link>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-sm text-gray-500">
            Employee
          </p>

          <p className="font-semibold">
            {leave.employee?.firstName}{" "}
            {leave.employee?.lastName}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Leave Type
          </p>

          <p>{leave.leaveType}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Start Date
          </p>

          <p>
            {new Date(
              leave.startDate
            ).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            End Date
          </p>

          <p>
            {new Date(
              leave.endDate
            ).toLocaleDateString()}
          </p>
        </div>

        <div className="col-span-2">
          <p className="text-sm text-gray-500">
            Reason
          </p>

          <p>{leave.reason}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            {leave.status}
          </span>
        </div>

      </div>

    </div>
  );
}