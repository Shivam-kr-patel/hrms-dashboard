"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NewLeavePage() {
  const router = useRouter();

  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employee: "",
    leaveType: "Casual Leave",
    startDate: "",
    endDate: "",
    reason: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  async function fetchEmployees() {
    const response = await fetch("/api/employees");
    const result = await response.json();

    setEmployees(result.data || []);
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch("/api/leaves", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      return alert(result.message);
    }

    alert("Leave created successfully");

    router.push("/dashboard/leaves");
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow">

      <h1 className="mb-6 text-3xl font-bold">
        Apply Leave
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

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
              {employee.firstName} {employee.lastName}
            </option>

          ))}

        </select>

        <select
          name="leaveType"
          value={formData.leaveType}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >

          <option>Casual Leave</option>
          <option>Sick Leave</option>
          <option>Paid Leave</option>
          <option>Unpaid Leave</option>

        </select>

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <textarea
          rows={5}
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Reason"
          className="w-full rounded border p-3"
          required
        />

        <button
          className="w-full rounded bg-blue-600 p-3 text-white"
        >
          Submit Leave
        </button>

      </form>

    </div>
  );
}