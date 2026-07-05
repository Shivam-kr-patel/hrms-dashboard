import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Attendance from "@/models/Attendance";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const attendance = await Attendance.findById(
      params.id
    ).populate("employee");

    if (!attendance) {
      return NextResponse.json(
        {
          success: false,
          message: "Attendance not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: attendance,
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

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();

    const attendance =
      await Attendance.findByIdAndUpdate(
        params.id,
        body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!attendance) {
      return NextResponse.json(
        {
          success: false,
          message: "Attendance not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Attendance updated successfully",
      data: attendance,
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

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const attendance =
      await Attendance.findByIdAndDelete(
        params.id
      );

    if (!attendance) {
      return NextResponse.json(
        {
          success: false,
          message: "Attendance not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message:
        "Attendance deleted successfully",
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