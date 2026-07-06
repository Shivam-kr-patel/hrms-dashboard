"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPayrollPage() {
  const router = useRouter();

  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employee: "",
    month: "",
    year: new Date().getFullYear(),
    basicSalary: "",
    allowance: 0,
    bonus: 0,
    deduction: 0,
    status: "Pending",
    remarks: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    try {
      const response = await fetch("/api/employees");
      const result = await response.json();

      setEmployees(result.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const netSalary = useMemo(() => {
    return (
      Number(formData.basicSalary || 0) +
      Number(formData.allowance || 0) +
      Number(formData.bonus || 0) -
      Number(formData.deduction || 0)
    );
  }, [formData]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("/api/payroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          netSalary,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert("Payroll created successfully");

      router.push("/dashboard/payroll");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="max-w-4xl rounded-xl bg-white p-8 shadow">
      <h1 className="mb-8 text-3xl font-bold">
        Create Payroll
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6"
      >
        <div className="col-span-2">
          <label className="mb-2 block font-medium">
            Employee
          </label>

          <select
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          >
            <option value="">
              Select Employee
            </option>

            {employees.map((employee) => (
              <option
                key={employee._id}
                value={employee._id}
              >
                {employee.employeeId} -{" "}
                {employee.firstName}{" "}
                {employee.lastName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Month
          </label>

          <select
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          >
            <option value="">Select Month</option>

            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <option
                key={month}
                value={month}
              >
                {month}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Year
          </label>

          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Basic Salary
          </label>

          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Allowance
          </label>

          <input
            type="number"
            name="allowance"
            value={formData.allowance}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Bonus
          </label>

          <input
            type="number"
            name="bonus"
            value={formData.bonus}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Deduction
          </label>

          <input
            type="number"
            name="deduction"
            value={formData.deduction}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded border p-3"
          >
            <option>Pending</option>
            <option>Paid</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="mb-2 block font-medium">
            Remarks
          </label>

          <textarea
            rows={4}
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />
        </div>

        <div className="col-span-2 rounded-lg bg-blue-50 p-4">
          <p className="text-lg font-semibold">
            Net Salary: ₹{netSalary.toLocaleString()}
          </p>
        </div>

        <button className="col-span-2 rounded bg-blue-600 p-3 text-white hover:bg-blue-700">
          Save Payroll
        </button>
      </form>
    </div>
  );
}