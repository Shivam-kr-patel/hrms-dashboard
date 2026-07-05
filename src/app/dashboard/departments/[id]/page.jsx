"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function DepartmentDetailsPage() {
  const { id } = useParams();

  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDepartment();
  }, []);

  async function fetchDepartment() {
    try {
      const response = await fetch(`/api/departments/${id}`);
      const result = await response.json();

      if (result.success) {
        setDepartment(result.data);
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Loading...</div>;

  if (!department) return <div>Department not found.</div>;

  return (
    <div className="rounded-xl bg-white p-8 shadow">

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Department Details
        </h1>

        <Link
          href={`/dashboard/departments/${department._id}/edit`}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          Edit
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-sm text-gray-500">
            Department Name
          </p>
          <p className="font-semibold">
            {department.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Department Code
          </p>
          <p className="font-semibold">
            {department.code}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Description
          </p>
          <p>
            {department.description || "-"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Status
          </p>
          <p>
            {department.status}
          </p>
        </div>

      </div>

    </div>
  );
}