"use client";

import GeneralSettings from "@/components/settings/GeneralSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import DangerZone from "@/components/settings/DangerZone";

export default function SettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">
          Manage your account preferences.
        </p>
      </div>

      <GeneralSettings />
      <AppearanceSettings />
      <NotificationSettings />
      <SecuritySettings />
      <DangerZone />
    </div>
  );
}