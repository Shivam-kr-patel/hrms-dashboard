"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditEmployeePage() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    employeeId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    joiningDate: "",
    salary: "",
    status: "Active",
  });

  useEffect(() => {
    fetchEmployee();
  }, []);

  async function fetchEmployee() {
    try {
      const response = await fetch(`/api/employees/${id}`);
      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      setFormData({
        employeeId: result.data.employeeId,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        email: result.data.email,
        phone: result.data.phone,
        department: result.data.department,
        designation: result.data.designation,
        joiningDate: result.data.joiningDate.slice(0, 10),
        salary: result.data.salary,
        status: result.data.status,
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
      const response = await fetch(`/api/employees/${id}`, {
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

      alert("Employee updated successfully");

      router.push("/dashboard/employees");
    } catch (error) {
      alert(error.message);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Employee
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-5"
      >
        <input
          name="employeeId"
          value={formData.employeeId}
          onChange={handleChange}
          placeholder="Employee ID"
          className="rounded border p-3"
        />

        <input
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="rounded border p-3"
        />

        <input
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="rounded border p-3"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="rounded border p-3"
        />

        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="rounded border p-3"
        />

        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          className="rounded border p-3"
        />

        <input
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="rounded border p-3"
        />

        <input
          type="date"
          name="joiningDate"
          value={formData.joiningDate}
          onChange={handleChange}
          className="rounded border p-3"
        />

        <input
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="rounded border p-3"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="rounded border p-3"
        >
          <option>Active</option>
          <option>Inactive</option>
          <option>On Leave</option>
        </select>

        <button
          className="col-span-2 rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
        >
          Update Employee
        </button>
      </form>
    </div>
  );
}