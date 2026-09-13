import React from "react";
import {
  Search,
  Bell,
  Upload,
  FolderPlus,
  UploadCloud,
} from "lucide-react";

export default function ConstructionDashboard() {
  const folders = [
    "Architecture",
    "Structure",
    "MEP",
    "3D Models",
    "Contracts",
    "Invoices",
    "Reports",
    "Insurance",
  ];

  const versions = [
    { name: "v3", status: "Approved" },
    { name: "v2", status: "Reviewed" },
    { name: "v1", status: "Draft" },
  ];

  return (
    <div className="w-full h-screen bg-[#f5f7fb] flex text-gray-800">

      {/* LEFT SIDEBAR */}
      <div className="w-[260px] bg-white border-r p-4 flex flex-col">

        <div className="text-2xl font-bold mb-6">
          Plans & Documents
        </div>

        {/* SEARCH */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border outline-none"
          />
        </div>

        {/* FOLDERS */}
        <div className="space-y-3 flex-1">
          {folders.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-gray-100 cursor-pointer"
            >
              <span>{item}</span>
              <span className="text-sm text-gray-400">{index + 3}</span>
            </div>
          ))}
        </div>

        {/* UPLOAD BOX (WITH UploadCloud ICON) */}
        <div className="mt-6 p-4 border rounded-2xl bg-gray-50 hover:bg-gray-100 transition cursor-pointer">

          <div className="flex flex-col items-center justify-center text-center">

            <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />

            <p className="text-sm font-medium text-gray-700">
              Upload File
            </p>

            <p className="text-xs text-gray-400">
              Click or drag & drop
            </p>

          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">

        {/* TOP BAR */}
        <div className="h-[70px] bg-white border-b flex items-center justify-between px-6">

          <div className="relative w-[450px]">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents, plans..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border outline-none"
            />
          </div>

          <div className="flex items-center gap-4">

            <Bell className="w-5 h-5" />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload
            </button>

            <button className="border px-4 py-2 rounded-xl flex items-center gap-2">
              <FolderPlus className="w-4 h-4" />
              New Folder
            </button>

            <img
              src="https://i.pravatar.cc/100"
              alt=""
              className="w-10 h-10 rounded-full"
            />

          </div>

        </div>

        {/* CONTENT */}
        <div className="flex flex-1 overflow-hidden">

          {/* PDF VIEW */}
          <div className="flex-1 p-5 overflow-auto">

            <div className="bg-white rounded-2xl shadow-sm border p-4">

              <div className="mb-4">
                <h2 className="font-bold text-xl">
                  Structure Plan.pdf
                </h2>
                <p className="text-sm text-gray-400">
                  Plans / Structure
                </p>
              </div>

              <div className="bg-[#f8f8f8] border rounded-2xl h-[600px] overflow-hidden">
                <img
                  src="planexemple.PNG"
                  alt="plan"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="w-[320px] bg-white border-l p-5 overflow-auto">

            <h2 className="font-bold text-lg mb-6">
              Document Information
            </h2>

            <div className="space-y-4 text-sm">

              <div>
                <p className="text-gray-400">File Name</p>
                <p className="font-medium">Structure Plan.pdf</p>
              </div>

              <div>
                <p className="text-gray-400">Category</p>
                <p className="font-medium">Plans / Structure</p>
              </div>

              <div>
                <p className="text-gray-400">Uploaded By</p>
                <p className="font-medium">Yassine Engineer</p>
              </div>

              <div>
                <p className="text-gray-400">Status</p>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs">
                  Approved
                </span>
              </div>

            </div>

            {/* VERSIONS */}
            <div className="mt-10">

              <h3 className="font-bold mb-4">Versions</h3>

              <div className="space-y-3">
                {versions.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-xl p-3 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        24 Apr 2024
                      </p>
                    </div>

                    <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

            </div>

            {/* ANNOTATIONS */}
            <div className="mt-10">

              <h3 className="font-bold mb-4">Annotations</h3>

              <div className="space-y-4 text-sm">

                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Verify column dimensions</p>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <p>Move staircase location</p>
                </div>

                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                  <p>Check beam alignment</p>
                </div>

              </div>

            </div>

            <button className="w-full mt-8 border rounded-xl py-3 hover:bg-gray-50">
              Compare Versions
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
