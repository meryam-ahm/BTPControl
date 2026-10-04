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

  const getMediaUrl = (url) => {
    if (!url) return "";

    console.log("MEDIA URL FROM DB:", url);

    // Already a complete URL
    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    // Laravel local storage
    const apiUrl =
      import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

    const cleanUrl = url.replace(/^\/+/, "");

    return `${apiUrl}/storage/${cleanUrl}`;
  };

  const getFileName = (url) => {
    if (!url) return "Unnamed file";

    try {
      const cleanUrl = url.split("?")[0];
      return cleanUrl.split("/").pop() || "Unnamed file";
    } catch {
      return "Unnamed file";
    }
  };

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

  const openDocument = (doc) => {
    console.log("SELECTED MEDIA:", doc);

    const finalUrl = getMediaUrl(doc.url);

    console.log("FINAL MEDIA URL:", finalUrl);

    setSelectedDocument(doc);
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
      {/* ================= TASK DETAILS ================= */}
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

        {/* CONTENT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5">
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
                <h3 className="text-xs text-gray-400 mb-1">
                  Priority
                </h3>

                <div
                  className={`inline-flex items-center px-2 py-0.5 text-xs rounded-full font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  <Flag className="w-3 h-3 mr-1" />

                  {task.priority || "medium"}
                </div>
              </div>
            </div>

            {/* TABS */}
            <div>
              <div className="flex space-x-6 border-b border-gray-200">
                <button
                  onClick={() => setActiveSubtab("documents")}
                  className={`py-2 text-sm font-medium ${
                    activeSubtab === "documents"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Documents
                </button>

                <button
                  onClick={() => setActiveSubtab("history")}
                  className={`py-2 text-sm font-medium ${
                    activeSubtab === "history"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  History
                </button>
              </div>

              {/* ================= DOCUMENTS ================= */}
              <div className="mt-4 space-y-2">
                {activeSubtab === "documents" && (
                  <>
                    {task.media?.length > 0 ? (
                      task.media.map((doc) => (
                        <div
                          key={doc.id}
                          onClick={() => openDocument(doc)}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            {doc.type === "photo" ? (
                              <Image className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            ) : (
                              <FileText className="w-4 h-4 text-red-500 flex-shrink-0" />
                            )}

                            <div className="min-w-0">
                              <p className="text-sm font-medium text-gray-700 truncate">
                                {getFileName(doc.url)}
                              </p>

                              <p className="text-xs text-gray-400">
                                {doc.type || "file"}
                              </p>
                            </div>
                          </div>

                          <span className="text-xs text-blue-600 ml-3">
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

                {/* ================= HISTORY ================= */}
                {activeSubtab === "history" && (
                  <div className="text-sm text-gray-500 py-3">
                    No history available.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MEDIA MODAL ================= */}
      {selectedDocument && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">

          {/* BACKDROP */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedDocument(null)}
          />

          {/* MODAL */}
          <div className="relative w-[80vw] max-w-5xl h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden">

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setSelectedDocument(null)}
              className="absolute top-4 right-4 z-20 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* FILE */}
            {selectedDocument.type === "photo" ||
            /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i.test(
              selectedDocument.url || ""
            ) ? (
              <div className="w-full h-full bg-black flex items-center justify-center">

                <img
                  src={getMediaUrl(selectedDocument.url)}
                  alt={getFileName(selectedDocument.url)}
                  className="max-w-full max-h-full object-contain"
                  onLoad={() => {
                    console.log(
                      "IMAGE LOADED:",
                      getMediaUrl(selectedDocument.url)
                    );
                  }}
                  onError={(e) => {
                    console.error(
                      "IMAGE FAILED:",
                      e.currentTarget.src
                    );
                  }}
                />

              </div>
            ) : (
              <iframe
                src={getMediaUrl(selectedDocument.url)}
                className="w-full h-full"
                title={getFileName(selectedDocument.url)}
                onLoad={() => {
                  console.log(
                    "DOCUMENT LOADED:",
                    getMediaUrl(selectedDocument.url)
                  );
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}