"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function LeavePage() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaves();
  }, []);

  async function fetchLeaves() {
    try {
      const response = await fetch("/api/leaves");
      const result = await response.json();

      setLeaves(result.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteLeave(id) {
    if (!confirm("Delete this leave?")) return;

    try {
      const response = await fetch(`/api/leaves/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert(result.message);

      fetchLeaves();
    } catch (error) {
      alert(error.message);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Leave Management
          </h1>

          <p className="text-gray-500">
            Manage employee leave requests.
          </p>
        </div>

        <Link
          href="/dashboard/leaves/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          + Apply Leave
        </Link>

      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="px-6 py-4 text-left">
                Employee
              </th>

              <th className="px-6 py-4 text-left">
                Leave Type
              </th>

              <th className="px-6 py-4 text-left">
                Start
              </th>

              <th className="px-6 py-4 text-left">
                End
              </th>

              <th className="px-6 py-4 text-left">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {leaves.map((leave) => (

              <tr
                key={leave._id}
                className="border-t hover:bg-gray-50"
              >

                <td className="px-6 py-4">
                  {leave.employee?.firstName}{" "}
                  {leave.employee?.lastName}
                </td>

                <td className="px-6 py-4">
                  {leave.leaveType}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    leave.startDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  {new Date(
                    leave.endDate
                  ).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                    {leave.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-4">

                    <Link
                      href={`/dashboard/leaves/${leave._id}`}
                    >
                      <Eye
                        size={18}
                        className="text-gray-700"
                      />
                    </Link>

                    <Link
                      href={`/dashboard/leaves/${leave._id}/edit`}
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
                        deleteLeave(leave._id)
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