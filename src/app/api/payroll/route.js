import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Payroll from "@/models/Payroll";

// GET ALL PAYROLLS
export async function GET() {
  try {
    await connectDB();

    const payrolls = await Payroll.find()
      .populate(
        "employee",
        "employeeId firstName lastName department designation"
      )
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      count: payrolls.length,
      data: payrolls,
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

// CREATE PAYROLL
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const basicSalary = Number(body.basicSalary);
    const allowance = Number(body.allowance || 0);
    const bonus = Number(body.bonus || 0);
    const deduction = Number(body.deduction || 0);

    // Prevent duplicate payroll
    const existingPayroll = await Payroll.findOne({
      employee: body.employee,
      month: body.month,
      year: body.year,
    });

    if (existingPayroll) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Payroll already exists for this employee for the selected month.",
        },
        {
          status: 400,
        }
      );
    }

    const payroll = await Payroll.create({
      employee: body.employee,
      month: body.month,
      year: body.year,
      basicSalary,
      allowance,
      bonus,
      deduction,
      netSalary:
        basicSalary +
        allowance +
        bonus -
        deduction,
      status: body.status,
      remarks: body.remarks,
    });

    const populatedPayroll = await Payroll.findById(
      payroll._id
    ).populate(
      "employee",
      "employeeId firstName lastName department designation"
    );

    return NextResponse.json(
      {
        success: true,
        message: "Payroll created successfully",
        data: populatedPayroll,
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