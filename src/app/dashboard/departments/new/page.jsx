"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddDepartmentPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    status: "Active",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert("Department added successfully");

      router.push("/dashboard/departments");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow">

      <h1 className="mb-6 text-3xl font-bold">
        Add Department
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >

        <input
          type="text"
          name="name"
          placeholder="Department Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <input
          type="text"
          name="code"
          placeholder="Department Code"
          value={formData.code}
          onChange={handleChange}
          className="w-full rounded border p-3"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded border p-3"
          rows={4}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded border p-3"
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button
          className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
        >
          Save Department
        </button>

      </form>

    </div>
  );
}