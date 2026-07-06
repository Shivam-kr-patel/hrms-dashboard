"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProfileCard from "@/components/profile/ProfileCard";
import PersonalInfo from "@/components/profile/PersonalInfo";
import WorkInfo from "@/components/profile/WorkInfo";
import ChangePassword from "@/components/profile/ChangePassword";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    try {
      const response = await fetch("/api/profile");

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Profile</h1>

        <div className="mt-6 rounded-lg bg-white p-6 shadow">
          Loading...
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">Profile</h1>

        <div className="mt-6 rounded-lg bg-white p-6 shadow text-red-500">
          Failed to load profile.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-gray-500">
            View and manage your profile information.
          </p>
        </div>

        <Link
          href="/dashboard/profile/edit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Edit Profile
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <ProfileCard profile={profile} />

        <div className="space-y-6 lg:col-span-2">
          <PersonalInfo profile={profile} />
          <WorkInfo profile={profile} />
          <ChangePassword />
        </div>
      </div>
    </div>
  );
}