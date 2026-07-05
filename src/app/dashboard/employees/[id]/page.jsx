"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function EmployeeDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployee();
  }, []);

  async function fetchEmployee() {
    try {
      const response = await fetch(`/api/employees/${id}`);
      const result = await response.json();

      if (!result.success) {
        alert(result.message);
        router.push("/dashboard/employees");
        return;
      }

      setEmployee(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!employee) {
    return null;
  }

  return (
    <div className="rounded-xl bg-white p-8 shadow">

      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Employee Details
        </h1>

        <Link
          href={`/dashboard/employees/${employee._id}/edit`}
          className="rounded bg-blue-600 px-5 py-2 text-white"
        >
          Edit Employee
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <p className="text-sm text-gray-500">Employee ID</p>
          <p className="font-semibold">{employee.employeeId}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="font-semibold">{employee.status}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">First Name</p>
          <p>{employee.firstName}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Last Name</p>
          <p>{employee.lastName}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p>{employee.email}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p>{employee.phone}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Department</p>
          <p>{employee.department}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Designation</p>
          <p>{employee.designation}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Joining Date</p>
          <p>
            {new Date(employee.joiningDate).toLocaleDateString()}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Salary</p>
          <p>₹ {employee.salary}</p>
        </div>

      </div>
    </div>
  );
}