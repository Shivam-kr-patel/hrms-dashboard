"use client";

import { useEffect, useState } from "react";

export default function ReportsPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  async function fetchReports() {
    try {
      const response = await fetch("/api/reports");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setReport(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-6 shadow">
        Loading Reports...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="text-gray-500">
          Overall HRMS Statistics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

        <ReportCard
          title="Employees"
          value={report.employees}
        />

        <ReportCard
          title="Departments"
          value={report.departments}
        />

        <ReportCard
          title="Attendance"
          value={report.attendance.total}
        />

        <ReportCard
          title="Leaves"
          value={report.leaves.total}
        />

        <ReportCard
          title="Payroll"
          value={report.payroll.total}
        />

        <ReportCard
          title="Recruitment"
          value={report.recruitment.total}
        />

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">
            Attendance Summary
          </h2>

          <div className="space-y-2">
            <p>Present : {report.attendance.present}</p>
            <p>Absent : {report.attendance.absent}</p>
            <p>Late : {report.attendance.late}</p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">
            Leave Summary
          </h2>

          <div className="space-y-2">
            <p>Approved : {report.leaves.approved}</p>
            <p>Pending : {report.leaves.pending}</p>
            <p>Rejected : {report.leaves.rejected}</p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">
            Payroll Summary
          </h2>

          <div className="space-y-2">
            <p>Paid : {report.payroll.paid}</p>
            <p>Pending : {report.payroll.pending}</p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-bold">
            Recruitment Summary
          </h2>

          <div className="space-y-2">
            <p>Applied : {report.recruitment.applied}</p>
            <p>Interview : {report.recruitment.interview}</p>
            <p>Hired : {report.recruitment.hired}</p>
          </div>
        </div>

      </div>

    </div>
  );
}

function ReportCard({ title, value }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h3 className="text-gray-500">
        {title}
      </h3>

      <p className="mt-2 text-4xl font-bold">
        {value}
      </p>
    </div>
  );
}