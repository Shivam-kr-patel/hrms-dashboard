"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditLeavePage() {
  const { id } = useParams();
  const router = useRouter();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    employee: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
    status: "",
  });

  useEffect(() => {
    fetchEmployees();
    fetchLeave();
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

  async function fetchLeave() {
    try {
      const response = await fetch(`/api/leaves/${id}`);
      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      const leave = result.data;

      setFormData({
        employee: leave.employee?._id || "",
        leaveType: leave.leaveType,
        startDate: leave.startDate?.slice(0, 10),
        endDate: leave.endDate?.slice(0, 10),
        reason: leave.reason,
        status: leave.status,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`/api/leaves/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert("Leave updated successfully");
      router.push("/dashboard/leaves");
    } catch (error) {
      alert(error.message);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow max-w-3xl">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Leave
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <select
          name="employee"
          value={formData.employee}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option value="">Select Employee</option>

          {employees.map((employee) => (
            <option key={employee._id} value={employee._id}>
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
          <option>Sick Leave</option>
          <option>Casual Leave</option>
          <option>Paid Leave</option>
          <option>Unpaid Leave</option>
        </select>

        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          rows={4}
          placeholder="Reason"
          className="w-full rounded border p-3"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
        >
          Update Leave
        </button>

      </form>
    </div>
  );
}