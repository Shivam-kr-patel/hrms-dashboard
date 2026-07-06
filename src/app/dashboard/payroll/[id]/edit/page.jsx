"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditPayrollPage() {
  const { id } = useParams();
  const router = useRouter();

  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employee: "",
    month: "",
    year: "",
    basicSalary: "",
    allowance: "",
    bonus: "",
    deduction: "",
    status: "Pending",
    remarks: "",
  });

  useEffect(() => {
    if (!id) return;

    fetchEmployees();
    fetchPayroll();
  }, [id]);

  async function fetchEmployees() {
    const response = await fetch("/api/employees");
    const result = await response.json();

    setEmployees(result.data || []);
  }

  async function fetchPayroll() {
    const response = await fetch(`/api/payroll/${id}`);
    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    setFormData({
      employee: result.data.employee?._id,
      month: result.data.month,
      year: result.data.year,
      basicSalary: result.data.basicSalary,
      allowance: result.data.allowance,
      bonus: result.data.bonus,
      deduction: result.data.deduction,
      status: result.data.status,
      remarks: result.data.remarks || "",
    });
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

    const response = await fetch(`/api/payroll/${id}`, {
      method: "PUT",
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
      alert(result.message);
      return;
    }

    alert("Payroll updated successfully");

    router.push("/dashboard/payroll");
  }

  return (
    <div className="max-w-4xl rounded-xl bg-white p-8 shadow">
      <h1 className="mb-8 text-3xl font-bold">
        Edit Payroll
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6"
      >
        <div className="col-span-2">
          <label className="mb-2 block">
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
          <label className="mb-2 block">
            Month
          </label>

          <input
            type="text"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block">
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
          <label className="mb-2 block">
            Basic Salary
          </label>

          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block">
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
          <label className="mb-2 block">
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
          <label className="mb-2 block">
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
          <label className="mb-2 block">
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
          <label className="mb-2 block">
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

        <div className="col-span-2 rounded-lg bg-green-50 p-5">
          <h2 className="text-xl font-bold">
            Net Salary
          </h2>

          <p className="mt-2 text-3xl font-bold text-green-700">
            ₹{netSalary.toLocaleString()}
          </p>
        </div>

        <button className="col-span-2 rounded bg-blue-600 p-3 text-white hover:bg-blue-700">
          Update Payroll
        </button>
      </form>
    </div>
  );
}