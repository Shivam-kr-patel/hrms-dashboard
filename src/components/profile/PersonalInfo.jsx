export default function PersonalInfo({ profile }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">
        Personal Information
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <Info label="First Name" value={profile.firstName} />
        <Info label="Last Name" value={profile.lastName} />
        <Info label="Email" value={profile.email} />
        <Info label="Phone" value={profile.phone} />
        <Info label="Gender" value={profile.gender} />
        <Info label="Date of Birth" value={profile.dob} />
        <Info label="Address" value={profile.address} />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-500 text-sm">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}