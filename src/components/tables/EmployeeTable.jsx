"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const response = await fetch("/api/employees");
      const result = await response.json();

      setEmployees(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteEmployee(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert(result.message);

      fetchEmployees();
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
    <div className="overflow-hidden rounded-xl bg-white shadow">
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
          {employees.map((employee) => (
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
                  <Eye
                    size={18}
                    className="cursor-pointer text-gray-600"
                  />

                  <Pencil
                    size={18}
                    className="cursor-pointer text-blue-600"
                  />

                  <Trash2
                    size={18}
                    className="cursor-pointer text-red-600"
                    onClick={() => deleteEmployee(employee._id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
