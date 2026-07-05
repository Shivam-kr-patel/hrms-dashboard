"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartments();
  }, []);

  async function fetchDepartments() {
    try {
      const response = await fetch("/api/departments");
      const result = await response.json();

      setDepartments(result.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteDepartment(id) {
    if (!confirm("Delete this department?")) return;

    const response = await fetch(`/api/departments/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (!response.ok) {
      return alert(result.message);
    }

    fetchDepartments();
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Departments
          </h1>

          <p className="text-gray-500">
            Manage departments
          </p>
        </div>

        <Link
          href="/dashboard/departments/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          + Add Department
        </Link>

      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Code</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {departments.map((department) => (

              <tr
                key={department._id}
                className="border-t"
              >

                <td className="px-6 py-4">
                  {department.name}
                </td>

                <td className="px-6 py-4">
                  {department.code}
                </td>

                <td className="px-6 py-4">
                  {department.status}
                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-4">

                    <Link
                      href={`/dashboard/departments/${department._id}`}
                    >
                      <Eye
                        size={18}
                        className="text-gray-700"
                      />
                    </Link>

                    <Link
                      href={`/dashboard/departments/${department._id}/edit`}
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
                        deleteDepartment(department._id)
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