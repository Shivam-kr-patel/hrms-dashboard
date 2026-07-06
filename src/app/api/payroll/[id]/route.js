import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Payroll from "@/models/Payroll";

// GET SINGLE PAYROLL
export async function GET(request, { params }) {
  try {
    await connectDB();

    const payroll = await Payroll.findById(params.id).populate(
      "employee",
      "employeeId firstName lastName department designation"
    );

    if (!payroll) {
      return NextResponse.json(
        {
          success: false,
          message: "Payroll not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: payroll,
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

// UPDATE PAYROLL
export async function PUT(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();

    const basicSalary = Number(body.basicSalary);
    const allowance = Number(body.allowance || 0);
    const bonus = Number(body.bonus || 0);
    const deduction = Number(body.deduction || 0);

    const payroll = await Payroll.findByIdAndUpdate(
      params.id,
      {
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
      },
      {
        new: true,
        runValidators: true,
      }
    ).populate(
      "employee",
      "employeeId firstName lastName department designation"
    );

    if (!payroll) {
      return NextResponse.json(
        {
          success: false,
          message: "Payroll not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payroll updated successfully",
      data: payroll,
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

// DELETE PAYROLL
export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const payroll = await Payroll.findByIdAndDelete(
      params.id
    );

    if (!payroll) {
      return NextResponse.json(
        {
          success: false,
          message: "Payroll not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Payroll deleted successfully",
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