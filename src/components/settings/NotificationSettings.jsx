"use client";

export default function NotificationSettings() {
  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-bold">Notifications</h2>

      <label className="flex items-center gap-3">
        <input type="checkbox" defaultChecked />
        Email Notifications
      </label>

      <label className="mt-3 flex items-center gap-3">
        <input type="checkbox" defaultChecked />
        Attendance Alerts
      </label>

      <label className="mt-3 flex items-center gap-3">
        <input type="checkbox" />
        Leave Updates
      </label>
    </div>
  );
}