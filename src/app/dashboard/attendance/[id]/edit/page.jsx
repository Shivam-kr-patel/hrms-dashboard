"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditAttendancePage() {
  const { id } = useParams();
  const router = useRouter();

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    employee: "",
    date: "",
    checkIn: "",
    checkOut: "",
    status: "Present",
    remarks: "",
  });

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  async function fetchEmployees() {
    const response = await fetch("/api/employees");
    const result = await response.json();
    setEmployees(result.data || []);
  }

  async function fetchAttendance() {
    const response = await fetch(`/api/attendance/${id}`);
    const result = await response.json();

    if (!result.success) {
      alert(result.message);
      return;
    }

    const item = result.data;

    setFormData({
      employee: item.employee?._id || "",
      date: item.date.slice(0, 10),
      checkIn: item.checkIn,
      checkOut: item.checkOut,
      status: item.status,
      remarks: item.remarks,
    });

    setLoading(false);
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await fetch(`/api/attendance/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      return alert(result.message);
    }

    alert("Attendance updated");

    router.push("/dashboard/attendance");
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="rounded-xl bg-white p-8 shadow max-w-3xl">

      <h1 className="mb-6 text-3xl font-bold">
        Edit Attendance
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
        >
          {employees.map((employee) => (
            <option
              key={employee._id}
              value={employee._id}
            >
              {employee.firstName} {employee.lastName}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <input
          type="time"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <input
          type="time"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option>Present</option>
          <option>Absent</option>
          <option>Late</option>
          <option>Half Day</option>
        </select>

        <textarea
          rows={4}
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          className="w-full rounded border p-3"
        />

        <button className="w-full rounded bg-blue-600 p-3 text-white">
          Update Attendance
        </button>

      </form>

    </div>
  );
}