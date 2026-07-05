import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Employee from "@/models/Employee";
import Department from "@/models/Department";
import Leave from "@/models/Leave";
import Attendance from "@/models/Attendance";

export async function GET() {
  try {
    await connectDB();

    const [
      employeeCount,
      departmentCount,
      attendanceCount,
      pendingLeaveCount,
      recentEmployees,
    ] = await Promise.all([
      Employee.countDocuments(),

      Department.countDocuments(),

      Attendance.countDocuments(),

      Leave.countDocuments({
        status: "Pending",
      }),

      Employee.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select(
          "firstName lastName department designation status"
        ),
    ]);

    return NextResponse.json({
      success: true,

      data: {
        employeeCount,
        departmentCount,
        attendanceCount,
        pendingLeaveCount,
        recentEmployees,
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