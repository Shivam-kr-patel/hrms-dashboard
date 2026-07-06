"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function PayrollDetailsPage() {
  const { id } = useParams();

  const [payroll, setPayroll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    fetchPayroll();
  }, [id]);

  async function fetchPayroll() {
    try {
      const response = await fetch(`/api/payroll/${id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setPayroll(result.data);
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

  if (!payroll) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        Payroll not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl rounded-xl bg-white p-8 shadow">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Payroll Details
          </h1>

          <p className="text-gray-500">
            {payroll.employee?.firstName}{" "}
            {payroll.employee?.lastName}
          </p>

        </div>

        <div className="flex gap-3">

          <Link
            href="/dashboard/payroll"
            className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
          >
            Back
          </Link>

          <Link
            href={`/dashboard/payroll/${payroll._id}/edit`}
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Edit
          </Link>

        </div>

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-sm text-gray-500">
            Employee
          </p>

          <p className="font-semibold">
            {payroll.employee?.firstName}{" "}
            {payroll.employee?.lastName}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Employee ID
          </p>

          <p className="font-semibold">
            {payroll.employee?.employeeId}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Department
          </p>

          <p className="font-semibold">
            {payroll.employee?.department}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Designation
          </p>

          <p className="font-semibold">
            {payroll.employee?.designation}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Month
          </p>

          <p className="font-semibold">
            {payroll.month}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Year
          </p>

          <p className="font-semibold">
            {payroll.year}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Basic Salary
          </p>

          <p className="font-semibold">
            ₹{payroll.basicSalary.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Allowance
          </p>

          <p className="font-semibold">
            ₹{payroll.allowance.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Bonus
          </p>

          <p className="font-semibold">
            ₹{payroll.bonus.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Deduction
          </p>

          <p className="font-semibold">
            ₹{payroll.deduction.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Net Salary
          </p>

          <p className="text-lg font-bold text-green-600">
            ₹{payroll.netSalary.toLocaleString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>

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
        </div>

        <div className="col-span-2">

          <p className="text-sm text-gray-500">
            Remarks
          </p>

          <p className="font-semibold">
            {payroll.remarks || "-"}
          </p>

        </div>

      </div>

    </div>
  );
}