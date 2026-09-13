import { useState } from "react";
import {
  FiClipboard,
  FiCalendar,
  FiAlertTriangle,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

import QualityChecklistModal from "./QualityChecklistModal";
import ScheduleInspectionModal from "./ScheduleInspectionModal";
import ReportSafetyIncidentModal from "./ReportSafetyIncidentModal";
import CreateNonConformityModal from "./CreateNonConformityModal";

const actions = [
  {
    id: 1,
    title: "Add Quality Checklist",
    description: "Create a new quality checklist",
    icon: <FiClipboard size={22} />,
    color: "bg-blue-100 text-blue-600",
    type: "checklist",
  },
  {
    id: 2,
    title: "Schedule Inspection",
    description: "Plan a quality or safety inspection",
    icon: <FiCalendar size={22} />,
    color: "bg-green-100 text-green-600",
    type: "inspection",
  },
  {
    id: 3,
    title: "Report Safety Incident",
    description: "Report a new safety issue",
    icon: <FiAlertTriangle size={22} />,
    color: "bg-red-100 text-red-600",
    type: "safety",
  },
  {
    id: 4,
    title: "Add Non-Conformity",
    description: "Create a manual non-conformity",
    icon: <FiShield size={22} />,
    color: "bg-amber-100 text-amber-600",
    type: "nc",
  },
];

export default function QuickActions({ projectId }) {
  const [showChecklist, setShowChecklist] = useState(false);
  const [showInspection, setShowInspection] = useState(false);
  const [showSafety, setShowSafety] = useState(false);
  const [showNC, setShowNC] = useState(false);

  const openModal = (type) => {
    if (type === "checklist") setShowChecklist(true);
    if (type === "inspection") setShowInspection(true);
    if (type === "safety") setShowSafety(true);
    if (type === "nc") setShowNC(true);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border p-6">

        <h2 className="text-lg font-bold mb-5">
          Quick Actions
        </h2>

        <div className="space-y-4">

          {actions.map((item) => (
            <button
              key={item.id}
              onClick={() => openModal(item.type)}
              className="w-full flex justify-between items-center border rounded-xl p-4 hover:bg-slate-50"
            >
              <div className="flex gap-4 items-center">

                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}
                >
                  {item.icon}
                </div>

                <div className="text-left">

                  <h4 className="font-semibold">
                    {item.title}
                  </h4>

                  <p className="text-sm text-slate-500">
                    {item.description}
                  </p>

                </div>

              </div>

              <FiArrowRight />

            </button>
          ))}

        </div>

      </div>

      <QualityChecklistModal
        open={showChecklist}
        onClose={() => setShowChecklist(false)}
        projectId={projectId}
      />

      <ScheduleInspectionModal
        open={showInspection}
        onClose={() => setShowInspection(false)}
        projectId={projectId}
      />

      <ReportSafetyIncidentModal
        open={showSafety}
        onClose={() => setShowSafety(false)}
        projectId={projectId}
      />

      <CreateNonConformityModal
        open={showNC}
        onClose={() => setShowNC(false)}
        inspectionCheck={null}
        projectId={projectId}
      />
    </>
  );
}