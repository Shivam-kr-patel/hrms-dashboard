import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Employee from "@/models/Employee";

// GET /api/employees
export async function GET() {
  try {
    await connectDB();

    const employees = await Employee.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      count: employees.length,
      data: employees,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch employees",
      },
      { status: 500 }
    );
  }
}

// POST /api/employees
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const employee = await Employee.create(body);

    return NextResponse.json(
      {
        success: true,
        data: employee,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
