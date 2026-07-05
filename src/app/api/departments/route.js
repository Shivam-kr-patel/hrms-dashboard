import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Department from "@/models/Department";

// GET All Departments
export async function GET() {
  try {
    await connectDB();

    const departments = await Department.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      count: departments.length,
      data: departments,
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

// CREATE Department
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const department = await Department.create(body);

    return NextResponse.json(
      {
        success: true,
        data: department,
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
