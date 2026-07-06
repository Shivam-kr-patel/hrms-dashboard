"use client";

export default function DangerZone() {
  return (
    <div className="rounded-xl border border-red-300 bg-red-50 p-6">
      <h2 className="mb-4 text-xl font-bold text-red-600">
        Danger Zone
      </h2>

      <button className="rounded-lg bg-red-600 px-5 py-2 text-white">
        Delete Account
      </button>
    </div>
  );
}