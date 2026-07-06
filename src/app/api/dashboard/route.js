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

    const departmentData = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
    ]);

    const attendanceData = await Attendance.aggregate([
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

    const payrollData = await Payroll.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    const recruitmentData = await Recruitment.aggregate([
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
      {
        status: 500,
      }
    );
  }
}