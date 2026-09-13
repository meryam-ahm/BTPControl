import { useState } from "react";
import {
  MoreVertical,
  Flag,
  FileText,
  Image,
  X,
} from "lucide-react";

export default function TaskDetails({ task }) {
  const [activeSubtab, setActiveSubtab] = useState("documents");
  const [selectedDocument, setSelectedDocument] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "high":
        return "bg-orange-100 text-orange-700";
      case "urgent":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (!task) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-6 text-gray-400">
        Select a task to view details
      </div>
    );
  }

  return (
    <>
      {/* MAIN CARD */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

        {/* HEADER */}
        <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">
              {task.title}
            </h2>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition">
              <MoreVertical className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">

          {/* LEFT */}
          <div className="space-y-5">

            {/* DESCRIPTION */}
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                Description
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {task.description || "No description available"}
              </p>
            </div>

            {/* PRIORITY */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <h3 className="text-xs text-gray-400 mb-1">Priority</h3>
                <div
                  className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  <Flag className="w-3 h-3 mr-1" />
                  {task.priority}
                </div>
              </div>
            </div>

            {/* SUBTABS */}
            <div>
              <div className="flex space-x-6 border-b border-gray-200">

                <button
                  onClick={() => setActiveSubtab("documents")}
                  className={`py-2 text-sm font-medium ${
                    activeSubtab === "documents"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  Documents
                </button>
 
                <button
                  onClick={() => setActiveSubtab("history")}
                  className={`py-2 text-sm font-medium ${
                    activeSubtab === "history"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  history
                </button>  

              </div>

              <div className="mt-4 space-y-2">

                {/* DOCUMENTS */}
                {activeSubtab === "documents" && (
                  <>
                    {task.media?.length ? (
                      task.media.map((doc) => (
                        <div
                          key={doc.id}
                          onClick={() => setSelectedDocument(doc)}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            {doc.type === "photo" ? (
                              <Image className="w-4 h-4 text-blue-500" />
                            ) : (
                              <FileText className="w-4 h-4 text-red-500" />
                            )}

                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                {doc.url.split("/").pop()}
                              </p>
                              <p className="text-xs text-gray-400">
                                {doc.type}
                              </p>
                            </div>
                          </div>

                          <span className="text-xs text-blue-600">
                            Open
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        No documents
                      </p>
                    )}
                  </>
                )}

              </div>
            </div>
          </div>

          {/* RIGHT */}
          {/* <div className="space-y-5">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-xs text-gray-400 uppercase mb-2">
                Schedule
              </h3>

              <div className="text-sm text-gray-700">
                Start: {task.start_date || "--"}
              </div>
              <div className="text-sm text-gray-700">
                End: {task.due_date || "--"}
              </div>
              <div className="text-sm text-gray-700">
                Progress: {task.progress || 0}%
              </div>
            </div>
          </div> */}

        </div>
      </div>

      {/* MODAL VIEWER */}
      {selectedDocument && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">

          {/* BLUR BACKGROUND */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={() => setSelectedDocument(null)}
          />

          {/* CONTENT */}
          <div className="relative w-[55vw] h-[55vh] bg-white rounded-2xl shadow-2xl overflow-hidden">

            <button
              onClick={() => setSelectedDocument(null)}
              className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedDocument.type === "photo" ? (
              <img
                src={`http://127.0.0.1:8000/storage/${selectedDocument.url}`}
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <iframe
                src={`http://127.0.0.1:8000/storage/${selectedDocument.url}`}
                className="w-full h-full"
              />
            )}

          </div>
        </div>
      )}
    </>
  );
}
