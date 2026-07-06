"use client";

export default function AppearanceSettings() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">Appearance</h2>

      <label className="flex items-center gap-3">
        <input type="checkbox" />
        Dark Mode
      </label>

      <label className="mt-3 flex items-center gap-3">
        <input type="checkbox" />
        Compact Sidebar
      </label>
    </div>
  );
}