import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Leave from "@/models/Leave";

// GET Leave
export async function GET(request, { params }) {
  try {
    await connectDB();

    const leave = await Leave.findById(params.id).populate("employee");

    if (!leave) {
      return NextResponse.json(
        {
          success: false,
          message: "Leave not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: leave,
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

// UPDATE Leave
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();

    const leave = await Leave.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!leave) {
      return NextResponse.json(
        {
          success: false,
          message: "Leave not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Leave updated successfully",
      data: leave,
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

// DELETE Leave
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const leave = await Leave.findByIdAndDelete(params.id);

    if (!leave) {
      return NextResponse.json(
        {
          success: false,
          message: "Leave not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Leave deleted successfully",
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