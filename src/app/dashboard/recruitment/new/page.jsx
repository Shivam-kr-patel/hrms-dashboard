"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewRecruitmentPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    department: "",
    experience: "",
    resume: "",
    appliedDate: "",
    interviewDate: "",
    recruiter: "",
    status: "Applied",
    notes: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("/api/recruitment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      alert("Candidate created successfully.");

      router.push("/dashboard/recruitment");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="max-w-5xl rounded-xl bg-white p-8 shadow">
      <h1 className="mb-8 text-3xl font-bold">
        Add Candidate
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="rounded border p-3"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="rounded border p-3"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="rounded border p-3"
          required
        />

        <input
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          className="rounded border p-3"
          required
        />

        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="rounded border p-3"
          required
        >
          <option value="">Select Department</option>
          <option>Engineering</option>
          <option>HR</option>
          <option>Finance</option>
          <option>Marketing</option>
          <option>Sales</option>
          <option>IT</option>
          <option>Operations</option>
        </select>

        <input
          type="number"
          name="experience"
          placeholder="Experience (Years)"
          value={formData.experience}
          onChange={handleChange}
          className="rounded border p-3"
          required
        />

        <input
          type="url"
          name="resume"
          placeholder="Resume URL"
          value={formData.resume}
          onChange={handleChange}
          className="rounded border p-3"
        />

        <input
          type="text"
          name="recruiter"
          placeholder="Recruiter Name"
          value={formData.recruiter}
          onChange={handleChange}
          className="rounded border p-3"
          required
        />

        <div>
          <label className="mb-2 block text-sm font-medium">
            Applied Date
          </label>

          <input
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            className="w-full rounded border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Interview Date
          </label>

          <input
            type="date"
            name="interviewDate"
            value={formData.interviewDate}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />
        </div>

        <div className="col-span-2">
          <label className="mb-2 block text-sm font-medium">
            Status
          </label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded border p-3"
          >
            <option>Applied</option>
            <option>Screening</option>
            <option>Interview</option>
            <option>Offered</option>
            <option>Hired</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="col-span-2">
          <textarea
            rows={5}
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />
        </div>

        <button className="col-span-2 rounded bg-blue-600 p-3 text-white hover:bg-blue-700">
          Save Candidate
        </button>
      </form>
    </div>
  );
}