"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function RecruitmentPage() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCandidates();
  }, []);

  async function fetchCandidates() {
    try {
      const response = await fetch("/api/recruitment");
      const result = await response.json();

      setCandidates(result.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteCandidate(id) {
    const confirmed = window.confirm(
      "Delete this candidate?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/recruitment/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      fetchCandidates();
    } catch (error) {
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

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Recruitment
          </h1>

          <p className="text-gray-500">
            Candidate Management
          </p>

        </div>

        <Link
          href="/dashboard/recruitment/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Add Candidate
        </Link>

      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="px-5 py-4 text-left">
                Candidate
              </th>

              <th className="px-5 py-4 text-left">
                Position
              </th>

              <th className="px-5 py-4 text-left">
                Department
              </th>

              <th className="px-5 py-4 text-left">
                Experience
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

            {candidates.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >
                  No candidates found.
                </td>

              </tr>

            ) : (

              candidates.map((candidate) => (

                <tr
                  key={candidate._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-5 py-4">

                    <div>

                      <p className="font-semibold">
                        {candidate.fullName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {candidate.email}
                      </p>

                    </div>

                  </td>

                  <td className="px-5 py-4">
                    {candidate.position}
                  </td>

                  <td className="px-5 py-4">
                    {candidate.department}
                  </td>

                  <td className="px-5 py-4">
                    {candidate.experience} Years
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium
                      ${
                        candidate.status === "Hired"
                          ? "bg-green-100 text-green-700"
                          : candidate.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : candidate.status === "Interview"
                          ? "bg-blue-100 text-blue-700"
                          : candidate.status === "Offered"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {candidate.status}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-4">

                      <Link
                        href={`/dashboard/recruitment/${candidate._id}`}
                      >
                        <Eye
                          size={18}
                          className="text-gray-600 hover:text-black"
                        />
                      </Link>

                      <Link
                        href={`/dashboard/recruitment/${candidate._id}/edit`}
                      >
                        <Pencil
                          size={18}
                          className="text-blue-600 hover:text-blue-800"
                        />
                      </Link>

                      <Trash2
                        size={18}
                        className="cursor-pointer text-red-600 hover:text-red-800"
                        onClick={() =>
                          deleteCandidate(candidate._id)
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