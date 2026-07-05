import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Attendance from "@/models/Attendance";
import Employee from "@/models/Employee";

// GET ALL ATTENDANCE
export async function GET() {
  try {
    await connectDB();

    const attendance = await Attendance.find()
      .populate("employee", "firstName lastName employeeId department")
      .sort({ date: -1 });

    return NextResponse.json({
      success: true,
      count: attendance.length,
      data: attendance,
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

// CREATE ATTENDANCE
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const employee = await Employee.findById(body.employee);

    if (!employee) {
      return NextResponse.json(
        {
          success: false,
          message: "Employee not found",
        },
        { status: 404 }
      );
    }

    const attendance = await Attendance.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Attendance created successfully",
        data: attendance,
      },
      { status: 201 }
    );
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