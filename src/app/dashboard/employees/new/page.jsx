"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

export default function AddEmployeePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

const onSubmit = async (data) => {
  try {
    const response = await fetch("/api/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to add employee");
    }

    alert("Employee added successfully!");

    console.log(result);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};   // We'll connect this to MongoDB next
  
  return (
    <div className="mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Add Employee
          </h1>

          <p className="mt-2 text-gray-500">
            Fill in the employee details below.
          </p>
        </div>

        <Link
          href="/dashboard/employees"
          className="rounded-xl border border-gray-300 px-5 py-3 hover:bg-gray-100"
        >
          Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl bg-white p-8 shadow"
      >
        <div className="grid gap-6 md:grid-cols-2">
          {/* Employee ID */}
          <div>
            <label className="mb-2 block font-medium">
              Employee ID
            </label>

            <input
              {...register("employeeId", {
                required: "Employee ID is required",
              })}
              className="w-full rounded-xl border p-3"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.employeeId?.message}
            </p>
          </div>

          {/* First Name */}
          <div>
            <label className="mb-2 block font-medium">
              First Name
            </label>

            <input
              {...register("firstName", {
                required: "First name is required",
              })}
              className="w-full rounded-xl border p-3"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.firstName?.message}
            </p>
          </div>

          {/* Last Name */}
          <div>
            <label className="mb-2 block font-medium">
              Last Name
            </label>

            <input
              {...register("lastName", {
                required: "Last name is required",
              })}
              className="w-full rounded-xl border p-3"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.lastName?.message}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              {...register("email", {
                required: "Email is required",
              })}
              className="w-full rounded-xl border p-3"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.email?.message}
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="mb-2 block font-medium">
              Phone
            </label>

            <input
              {...register("phone", {
                required: "Phone number is required",
              })}
              className="w-full rounded-xl border p-3"
            />

            <p className="mt-1 text-sm text-red-500">
              {errors.phone?.message}
            </p>
          </div>

          {/* Department */}
          <div>
            <label className="mb-2 block font-medium">
              Department
            </label>

            <select
              {...register("department")}
              className="w-full rounded-xl border p-3"
            >
              <option>Engineering</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Marketing</option>
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="mb-2 block font-medium">
              Designation
            </label>

            <input
              {...register("designation")}
              className="w-full rounded-xl border p-3"
            />
          </div>

          {/* Joining Date */}
          <div>
            <label className="mb-2 block font-medium">
              Joining Date
            </label>

            <input
              type="date"
              {...register("joiningDate")}
              className="w-full rounded-xl border p-3"
            />
          </div>

          {/* Salary */}
          <div>
            <label className="mb-2 block font-medium">
              Salary
            </label>

            <input
              type="number"
              {...register("salary")}
              className="w-full rounded-xl border p-3"
            />
          </div>

          {/* Status */}
          <div>
            <label className="mb-2 block font-medium">
              Status
            </label>

            <select
              {...register("status")}
              className="w-full rounded-xl border p-3"
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
            className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Save Employee
          </button>
        </div>
      </form>
    </div>
  );
}
