import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Employee from "@/models/Employee";

// GET Employee by ID
export async function GET(request, { params }) {
  try {
    await connectDB();

    const employee = await Employee.findById(params.id);

    if (!employee) {
      return NextResponse.json(
        { success: false, message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: employee,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// DELETE Employee
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const employee = await Employee.findByIdAndDelete(params.id);

    if (!employee) {
      return NextResponse.json(
        { success: false, message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
