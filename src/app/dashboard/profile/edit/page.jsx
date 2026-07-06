"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfilePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const res = await fetch("/api/profile");
    const data = await res.json();

    setFormData({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      gender: data.gender || "",
      dob: data.dob || "",
      address: data.address || "",
    });
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/dashboard/profile");
    } else {
      alert("Failed to update profile.");
    }
  }

  return (
    <div className="max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Edit Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="grid gap-5 md:grid-cols-2 rounded-xl bg-white p-6 shadow"
      >
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />

        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <Input
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <Input
          label="Gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />

        <Input
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
        />

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Address
          </label>

          <textarea
            name="address"
            rows="4"
            value={formData.address}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border px-5 py-2"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <input
        {...props}
        className="w-full rounded-lg border p-3"
      />
    </div>
  );
}