import EmployeeTable from "@/components/tables/EmployeeTable";

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Employees
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all employees.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">
          + Add Employee
        </button>
      </div>

      <EmployeeTable />
    </div>
  );
}
