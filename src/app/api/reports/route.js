import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Employee from "@/models/Employee";
import Department from "@/models/Department";
import Attendance from "@/models/Attendance";
import Leave from "@/models/Leave";
import Payroll from "@/models/Payroll";
import Recruitment from "@/models/Recruitment";

export async function GET() {
  try {
    await connectDB();

    const [
      employeeCount,
      departmentCount,
      attendanceCount,
      leaveCount,
      payrollCount,
      recruitmentCount,

      presentCount,
      absentCount,
      lateCount,

      approvedLeave,
      pendingLeave,
      rejectedLeave,

      paidPayroll,
      pendingPayroll,

      hiredCount,
      interviewCount,
      appliedCount,
    ] = await Promise.all([
      Employee.countDocuments(),
      Department.countDocuments(),
      Attendance.countDocuments(),
      Leave.countDocuments(),
      Payroll.countDocuments(),
      Recruitment.countDocuments(),

      Attendance.countDocuments({
        status: "Present",
      }),

      Attendance.countDocuments({
        status: "Absent",
      }),

      Attendance.countDocuments({
        status: "Late",
      }),

      Leave.countDocuments({
        status: "Approved",
      }),

      Leave.countDocuments({
        status: "Pending",
      }),

      Leave.countDocuments({
        status: "Rejected",
      }),

      Payroll.countDocuments({
        status: "Paid",
      }),

      Payroll.countDocuments({
        status: "Pending",
      }),

      Recruitment.countDocuments({
        status: "Hired",
      }),

      Recruitment.countDocuments({
        status: "Interview",
      }),

      Recruitment.countDocuments({
        status: "Applied",
      }),
    ]);

    return NextResponse.json({
      success: true,

      data: {
        employees: employeeCount,

        departments: departmentCount,

        attendance: {
          total: attendanceCount,
          present: presentCount,
          absent: absentCount,
          late: lateCount,
        },

        leaves: {
          total: leaveCount,
          approved: approvedLeave,
          pending: pendingLeave,
          rejected: rejectedLeave,
        },

        payroll: {
          total: payrollCount,
          paid: paidPayroll,
          pending: pendingPayroll,
        },

        recruitment: {
          total: recruitmentCount,
          hired: hiredCount,
          interview: interviewCount,
          applied: appliedCount,
        },
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}