import { useEffect, useState } from "react";
import axios from "axios";
import CreateNonConformityModal from "./CreateNonConformityModal";

export default function InspectionModal({
  inspectionId,
  projectId,
  onClose,
}) {
  const [data, setData] = useState(null);

  const [openNC, setOpenNC] = useState(false);
  const [selectedCheck, setSelectedCheck] = useState(null);
const authHeader = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    };
  useEffect(() => {
    if (!inspectionId) return;

    axios
      .get(`http://127.0.0.1:8000/api/engineer/inspections/${inspectionId}`,authHeader)
      .then((res) => setData(res.data))
      .catch(console.log);
  }, [inspectionId]);

  if (!data) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
        <div className="bg-white w-[700px] p-5 rounded-xl max-h-[90vh] overflow-auto">

          <div className="flex justify-between">
            <h2 className="font-bold text-lg">{data.title}</h2>

            <button onClick={onClose}>✕</button>
          </div>

          <p className="text-sm text-gray-500">{data.date}</p>

          <hr className="my-3" />

          <h3 className="font-semibold mb-2">
            Inspection Photos
          </h3>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {data.photos?.length ? (
              data.photos.map((p) => (
                <img
                  key={p.id}
                  src={p.url}
                  className="h-24 w-full object-cover rounded"
                />
              ))
            ) : (
              <p>No photos available</p>
            )}
          </div>

          <hr className="my-3" />

          <h3 className="font-semibold mb-3">
            Checklist
          </h3>

          <div className="space-y-3">

            {data.checks?.map((c) => (
              <div
                key={c.id}
                className="border rounded-lg p-3"
              >
                <div className="flex justify-between">
                  <h4 className="font-semibold">
                    {c.check_name}
                  </h4>

                  <span
                    className={
                      c.status === "ok"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {c.status}
                  </span>
                </div>

                <p className="text-sm text-gray-500">
                  Required: {c.required_value}
                </p>

                <p className="text-sm text-gray-500">
                  Actual: {c.actual_value}
                </p>

                {c.comment && (
                  <p className="mt-2">
                    {c.comment}
                  </p>
                )}

                {c.status === "fail" && (
                  <button
                    onClick={() => {
                      setSelectedCheck(c);
                      setOpenNC(true);
                    }}
                    className="mt-3 bg-red-600 text-white px-4 py-2 rounded"
                  >
                    Create Non-Conformity
                  </button>
                )}
              </div>
            ))}

          </div>

        </div>
      </div>

      <CreateNonConformityModal
        open={openNC}
        onClose={() => setOpenNC(false)}
        inspectionCheck={selectedCheck}
        projectId={projectId}
      />
    </>
  );
}