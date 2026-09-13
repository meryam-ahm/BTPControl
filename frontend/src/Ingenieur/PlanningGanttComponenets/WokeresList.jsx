import { useState } from "react";

export default function WorkersList({ project }) {
  const [selectedWorker, setSelectedWorker] = useState(null);

  const copyWorker = (worker) => {
    navigator.clipboard.writeText(
      `${worker.name} | ${worker.role_on_proj} | ${worker.email}`
    );
  };

  if (!project) return null;

  return (
    <div className="flex-1 p-6 overflow-hidden">

      <h2 className="text-xl font-bold mb-4">
        Workers - {project.name}
      </h2>

      <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-[80vh]">
        {project.users?.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedWorker(user)}
            className="p-4 bg-white border rounded-xl cursor-pointer hover:shadow"
          >
            <div className="font-semibold">{user.name}</div>
            <div className="text-sm text-gray-500">{user.role_on_proj}</div>
          </div>
        ))}
      </div>

      {/* FLOAT MODAL */}
      {selectedWorker && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-96 p-5 rounded-xl relative">

            <button
              onClick={() => setSelectedWorker(null)}
              className="absolute top-2 right-2"
            >
              ✕
            </button>

            <h2 className="font-bold">{selectedWorker.name}</h2>

            <p>{selectedWorker.email}</p>
            <p>{selectedWorker.role_on_proj}</p>

            <button
              onClick={() => copyWorker(selectedWorker)}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              Copy
            </button>

          </div>
        </div>
      )}

    </div>
  );
}