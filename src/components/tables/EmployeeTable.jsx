"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Search } from "lucide-react";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const limit = 10;

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, [page, search]);

  async function fetchEmployees() {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/employees?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setEmployees(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteEmployee(id) {
    if (!window.confirm("Delete this employee?")) return;

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      fetchEmployees();
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
    <div className="overflow-hidden rounded-xl bg-white shadow">
      {/* Header */}
      <div className="flex items-center justify-between border-b p-6">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            className="w-80 rounded-lg border border-gray-300 py-2 pl-10 pr-4 outline-none focus:border-blue-600"
          />
        </div>

        <p className="text-sm text-gray-500">
          Total Employees: {pagination.total}
        </p>
      </div>

      {/* Table */}
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left">Employee</th>
            <th className="px-6 py-4 text-left">Department</th>
            <th className="px-6 py-4 text-left">Designation</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-10 text-center text-gray-500"
              >
                No employees found.
              </td>
            </tr>
          ) : (
            employees.map((employee) => (
              <tr
                key={employee._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-semibold">
                      {employee.firstName} {employee.lastName}
                    </p>

                    <p className="text-sm text-gray-500">
                      {employee.employeeId}
                    </p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  {employee.department}
                </td>

                <td className="px-6 py-4">
                  {employee.designation}
                </td>

                <td className="px-6 py-4">
                  {employee.email}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
                    {employee.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-4">
                    <Link
                      href={`/dashboard/employees/${employee._id}`}
                    >
                      <Eye
                        size={18}
                        className="text-gray-600"
                      />
                    </Link>

                    <Link
                      href={`/dashboard/employees/${employee._id}/edit`}
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
                        deleteEmployee(employee._id)
                      }
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t p-6">
        <button
          onClick={() =>
            setPage((p) => Math.max(1, p - 1))
          }
          disabled={page === 1}
          className="rounded-lg border px-4 py-2 disabled:opacity-40"
        >
          Previous
        </button>

        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>

        <button
          onClick={() =>
            setPage((p) =>
              Math.min(pagination.totalPages, p + 1)
            )
          }
          disabled={page === pagination.totalPages}
          className="rounded-lg border px-4 py-2 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}