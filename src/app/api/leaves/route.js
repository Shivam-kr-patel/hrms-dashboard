import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Leave from "@/models/Leave";

// GET All Leaves
export async function GET() {
  try {
    await connectDB();

    const leaves = await Leave.find()
      .populate("employee")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: leaves.length,
      data: leaves,
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

// CREATE Leave
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const leave = await Leave.create(body);

    return NextResponse.json(
      {
        success: true,
        data: leave,
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