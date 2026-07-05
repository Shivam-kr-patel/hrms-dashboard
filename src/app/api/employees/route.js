import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Employee from "@/models/Employee";

// GET /api/employees?page=1&limit=10&search=shiv
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";

    const skip = (page - 1) * limit;

    const query = search
      ? {
          $or: [
            {
              firstName: {
                $regex: search,
                $options: "i",
              },
            },
            {
              lastName: {
                $regex: search,
                $options: "i",
              },
            },
            {
              employeeId: {
                $regex: search,
                $options: "i",
              },
            },
            {
              email: {
                $regex: search,
                $options: "i",
              },
            },
            {
              department: {
                $regex: search,
                $options: "i",
              },
            },
            {
              designation: {
                $regex: search,
                $options: "i",
              },
            },
          ],
        }
      : {};

    const [employees, total] = await Promise.all([
      Employee.find(query)
        .sort({
          createdAt: -1,
        })
        .skip(skip)
        .limit(limit),

      Employee.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,

      data: employees,

      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch employees",
      },
      {
        status: 500,
      }
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