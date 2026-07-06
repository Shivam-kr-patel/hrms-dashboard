import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Employee from "@/models/Employee";
import Attendance from "@/models/Attendance";
import Leave from "@/models/Leave";
import Payroll from "@/models/Payroll";
import Recruitment from "@/models/Recruitment";

export async function GET() {
  try {
    await connectDB();

    // KPI Counts
    const employeeCount = await Employee.countDocuments();

    const departmentCount = await Employee.distinct(
      "department"
    ).then((d) => d.length);

    const attendanceCount =
      await Attendance.countDocuments({
        status: "Present",
      });

    const pendingLeaveCount =
      await Leave.countDocuments({
        status: "Pending",
      });

    // Recent Employees
    const recentEmployees =
      await Employee.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

    // Chart Data
    const departmentData =
      await Employee.aggregate([
        {
          $group: {
            _id: "$department",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
      ]);

    const attendanceData =
      await Attendance.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

    const leaveData = await Leave.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const payrollData =
      await Payroll.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

    const recruitmentData =
      await Recruitment.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

    return NextResponse.json({
      success: true,
      data: {
        // KPI Cards
        employeeCount,
        departmentCount,
        attendanceCount,
        pendingLeaveCount,

        // Table
        recentEmployees,

        // Charts
        departments: departmentData,
        attendance: attendanceData,
        leaves: leaveData,
        payroll: payrollData,
        recruitment: recruitmentData,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}