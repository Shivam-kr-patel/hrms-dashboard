"use client";

export default function GeneralSettings() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">General</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block">Company Name</label>
          <input
            className="w-full rounded-lg border p-3"
            defaultValue="ABC Pvt Ltd"
          />
        </div>

        <div>
          <label className="mb-2 block">Language</label>
          <select className="w-full rounded-lg border p-3">
            <option>English</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block">Timezone</label>
          <select className="w-full rounded-lg border p-3">
            <option>Asia/Kolkata</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block">Currency</label>
          <select className="w-full rounded-lg border p-3">
            <option>INR</option>
          </select>
        </div>
      </div>
    </div>
  );
}