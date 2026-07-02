"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EditEmployeePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    fetchEmployee();
  }, []);

  async function fetchEmployee() {
    try {
      const response = await fetch(`/api/employees/${id}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      reset(result.data);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(data) {
    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert("Employee updated successfully");

      router.push("/dashboard/employees");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 shadow">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Edit Employee
          </h1>

          <p className="text-gray-500 mt-2">
            Update employee information.
          </p>
        </div>

        <Link
          href="/dashboard/employees"
          className="rounded-xl border px-5 py-3 hover:bg-gray-100"
        >
          Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl bg-white p-8 shadow"
      >
        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <label>Employee ID</label>

            <input
              {...register("employeeId")}
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label>First Name</label>

            <input
              {...register("firstName", {
                required: "Required",
              })}
              className="mt-2 w-full rounded-lg border p-3"
            />

            <p className="text-red-500 text-sm">
              {errors.firstName?.message}
            </p>
          </div>

          <div>
            <label>Last Name</label>

            <input
              {...register("lastName", {
                required: "Required",
              })}
              className="mt-2 w-full rounded-lg border p-3"
            />

            <p className="text-red-500 text-sm">
              {errors.lastName?.message}
            </p>
          </div>

          <div>
            <label>Email</label>

            <input
              type="email"
              {...register("email")}
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label>Phone</label>

            <input
              {...register("phone")}
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label>Department</label>

            <select
              {...register("department")}
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option>Engineering</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Marketing</option>
            </select>
          </div>

          <div>
            <label>Designation</label>

            <input
              {...register("designation")}
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label>Joining Date</label>

            <input
              type="date"
              {...register("joiningDate")}
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label>Salary</label>

            <input
              type="number"
              {...register("salary")}
              className="mt-2 w-full rounded-lg border p-3"
            />
          </div>

          <div>
            <label>Status</label>

            <select
              {...register("status")}
              className="mt-2 w-full rounded-lg border p-3"
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>On Leave</option>
            </select>
          </div>

        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}
