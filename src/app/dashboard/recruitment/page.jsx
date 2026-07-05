import Link from "next/link";

export default function RecruitmentPage() {
  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Recruitment
          </h1>

          <p className="text-gray-500">
            Manage recruitment process.
          </p>
        </div>

        <Link
          href="/dashboard/recruitment/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          + New Candidate
        </Link>

      </div>

      <div className="rounded-xl bg-white p-10 shadow text-center">

        <h2 className="text-xl font-semibold">
          Recruitment Module
        </h2>

        <p className="mt-3 text-gray-500">
          Candidate management will appear here.
        </p>

      </div>

    </div>
  );
}