import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Recruitment from "@/models/Recruitment";

// GET SINGLE CANDIDATE
export async function GET(request, { params }) {
  try {
    await connectDB();

    const candidate = await Recruitment.findById(params.id);

    if (!candidate) {
      return NextResponse.json(
        {
          success: false,
          message: "Candidate not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: candidate,
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

// UPDATE CANDIDATE
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();

    const existingCandidate = await Recruitment.findOne({
      email: body.email,
      _id: { $ne: params.id },
    });

    if (existingCandidate) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Candidate with this email already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const candidate = await Recruitment.findByIdAndUpdate(
      params.id,
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!candidate) {
      return NextResponse.json(
        {
          success: false,
          message: "Candidate not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Candidate updated successfully.",
      data: candidate,
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

// DELETE CANDIDATE
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const candidate = await Recruitment.findByIdAndDelete(
      params.id
    );

    if (!candidate) {
      return NextResponse.json(
        {
          success: false,
          message: "Candidate not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Candidate deleted successfully.",
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