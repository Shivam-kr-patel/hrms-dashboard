"use client";

import { Bell, Search, ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Welcome back 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            className="w-72 rounded-xl border border-gray-300 py-2 pl-10 pr-4 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Notification */}
        <button className="relative rounded-xl p-2 transition hover:bg-gray-100">
          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <button className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-gray-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
            S
          </div>

          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold text-gray-800">
              Shivam
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={18}
            className="hidden text-gray-500 lg:block"
          />
        </button>
      </div>
    </header>
  );
}
