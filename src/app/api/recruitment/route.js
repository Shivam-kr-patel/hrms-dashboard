import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Recruitment from "@/models/Recruitment";

// GET ALL CANDIDATES
export async function GET() {
  try {
    await connectDB();

    const candidates = await Recruitment.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      count: candidates.length,
      data: candidates,
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

// CREATE CANDIDATE
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const existingCandidate =
      await Recruitment.findOne({
        email: body.email,
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

    const candidate =
      await Recruitment.create(body);

    return NextResponse.json(
      {
        success: true,
        message:
          "Candidate created successfully.",
        data: candidate,
      },
      {
        status: 201,
      }
    );
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