import React from "react";

export default function DocumentInfo() {
  const versions = [
    { name: "v3", status: "Approved" },
    { name: "v2", status: "Reviewed" },
    { name: "v1", status: "Draft" },
  ];

  return (
    <div className="w-[320px] bg-white border-l p-5 overflow-auto">

      <h2 className="font-bold mb-6">Document Information</h2>

      <div className="space-y-3 text-sm">
        <p><span className="text-gray-400">File:</span> Structure Plan.pdf</p>
        <p><span className="text-gray-400">Category:</span> Plans / Structure</p>
        <p><span className="text-gray-400">Uploaded:</span> Yassine Engineer</p>

        <p>
          <span className="text-gray-400">Status:</span>{" "}
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
            Approved
          </span>
        </p>
      </div>

      <h3 className="font-bold mt-8 mb-3">Versions</h3>

      <div className="space-y-2">
        {versions.map((v) => (
          <div key={v.name} className="border p-3 rounded-xl">
            <p className="font-medium">{v.name}</p>
            <p className="text-xs text-gray-400">{v.status}</p>
          </div>
        ))}
      </div>

    </div>
  );
}