export default function ProfileCard({ profile }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-gray-200 text-3xl font-bold">
        {profile.firstName?.charAt(0)}
        {profile.lastName?.charAt(0)}
      </div>

      <h2 className="mt-4 text-center text-xl font-bold">
        {profile.firstName} {profile.lastName}
      </h2>

      <p className="text-center text-gray-500">
        {profile.designation}
      </p>

      <div className="mt-6 space-y-2 text-sm">
        <p><strong>ID:</strong> {profile.employeeId}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Status:</strong> {profile.status}</p>
      </div>
    </div>
  );
}