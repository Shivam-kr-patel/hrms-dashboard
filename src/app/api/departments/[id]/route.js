import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Department from "@/models/Department";

// GET Department
export async function GET(request, { params }) {
  try {
    await connectDB();

    const department = await Department.findById(params.id);

    if (!department) {
      return NextResponse.json(
        {
          success: false,
          message: "Department not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: department,
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

// UPDATE Department
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();

    const department = await Department.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!department) {
      return NextResponse.json(
        {
          success: false,
          message: "Department not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Department updated successfully",
      data: department,
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

// DELETE Department
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const department = await Department.findByIdAndDelete(
      params.id
    );

    if (!department) {
      return NextResponse.json(
        {
          success: false,
          message: "Department not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Department deleted successfully",
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