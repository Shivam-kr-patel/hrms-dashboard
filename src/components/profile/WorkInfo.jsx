export default function WorkInfo({ profile }) {
  if (!profile) return null;

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">
        Work Information
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Info label="Employee ID" value={profile?.employeeId} />
        <Info label="Department" value={profile?.department} />
        <Info label="Designation" value={profile?.designation} />
        <Info label="Joining Date" value={profile?.joiningDate} />
        <Info label="Status" value={profile?.status} />
        <Info label="Salary" value={profile?.salary} />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}