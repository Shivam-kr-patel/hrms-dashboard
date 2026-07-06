"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

export default function PayrollPage() {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  async function fetchPayrolls() {
    try {
      const response = await fetch("/api/payroll");
      const result = await response.json();

      setPayrolls(result.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deletePayroll(id) {
    const confirmed = window.confirm(
      "Delete this payroll record?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/payroll/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      fetchPayrolls();
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
            Payroll
          </h1>

          <p className="text-gray-500">
            Manage Employee Payroll
          </p>
        </div>

        <Link
          href="/dashboard/payroll/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          + Create Payroll
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
                Month
              </th>

              <th className="px-5 py-4 text-left">
                Basic
              </th>

              <th className="px-5 py-4 text-left">
                Net Salary
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

            {payrolls.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="py-10 text-center text-gray-500"
                >
                  No payroll records found.
                </td>

              </tr>

            ) : (

              payrolls.map((payroll) => (

                <tr
                  key={payroll._id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="px-5 py-4">

                    <div>

                      <p className="font-semibold">
                        {payroll.employee?.firstName}{" "}
                        {payroll.employee?.lastName}
                      </p>

                      <p className="text-sm text-gray-500">
                        {payroll.employee?.employeeId}
                      </p>

                    </div>

                  </td>

                  <td className="px-5 py-4">
                    {payroll.month} {payroll.year}
                  </td>

                  <td className="px-5 py-4">
                    ₹{payroll.basicSalary.toLocaleString()}
                  </td>

                  <td className="px-5 py-4 font-semibold">
                    ₹{payroll.netSalary.toLocaleString()}
                  </td>

                  <td className="px-5 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        payroll.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : payroll.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payroll.status}
                    </span>

                  </td>

                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-4">

                      <Link
                        href={`/dashboard/payroll/${payroll._id}`}
                      >
                        <Eye
                          size={18}
                          className="text-gray-600 hover:text-black"
                        />
                      </Link>

                      <Link
                        href={`/dashboard/payroll/${payroll._id}/edit`}
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
                          deletePayroll(payroll._id)
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