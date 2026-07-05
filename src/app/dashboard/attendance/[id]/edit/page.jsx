"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditAttendancePage() {
  const router = useRouter();
  const { id } = useParams();

  const [employees, setEmployees] = useState([]);

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
    try {
      const response = await fetch("/api/employees");
      const result = await response.json();

      setEmployees(result.data || []);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchAttendance() {
    try {
      const response = await fetch(`/api/attendance/${id}`);
      const result = await response.json();

      const attendance = result.data;

      setFormData({
        employee: attendance.employee?._id || "",
        date: attendance.date
          ? attendance.date.split("T")[0]
          : "",
        checkIn: attendance.checkIn || "",
        checkOut: attendance.checkOut || "",
        status: attendance.status || "Present",
        remarks: attendance.remarks || "",
      });
    } catch (error) {
      console.error(error);
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
      const response = await fetch(`/api/attendance/${id}`, {
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

      alert(result.message);

      router.push("/dashboard/attendance");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className="max-w-3xl rounded-xl bg-white p-8 shadow">
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
          className="w-full rounded-lg border p-3"
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
              {employee.firstName} {employee.lastName} (
              {employee.employeeId})
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          type="time"
          name="checkIn"
          value={formData.checkIn}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <input
          type="time"
          name="checkOut"
          value={formData.checkOut}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        >
          <option value="Present">
            Present
          </option>

          <option value="Absent">
            Absent
          </option>

          <option value="Leave">
            Leave
          </option>
        </select>

        <textarea
          rows={4}
          name="remarks"
          value={formData.remarks}
          onChange={handleChange}
          placeholder="Remarks"
          className="w-full rounded-lg border p-3"
        />

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 p-3 font-medium text-white hover:bg-blue-700"
        >
          Update Attendance
        </button>
      </form>
    </div>
  );
}