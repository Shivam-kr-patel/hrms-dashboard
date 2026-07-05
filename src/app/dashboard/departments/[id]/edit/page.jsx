"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditDepartmentPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    status: "Active",
  });

  useEffect(() => {
    fetchDepartment();
  }, []);

  async function fetchDepartment() {
    try {
      const response = await fetch(`/api/departments/${id}`);
      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        return;
      }

      setFormData({
        name: result.data.name,
        code: result.data.code,
        description: result.data.description,
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
      const response = await fetch(`/api/departments/${id}`, {
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

      alert("Department updated successfully");

      router.push("/dashboard/departments");
    } catch (error) {
      alert(error.message);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="rounded-xl bg-white p-8 shadow">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Department
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
          rows={4}
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full rounded border p-3"
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
          Update Department
        </button>
      </form>
    </div>
  );
}