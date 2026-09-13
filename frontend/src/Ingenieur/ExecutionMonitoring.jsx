import { useState, useEffect } from "react";
import axios from "axios";

import KpiCards from "./ExecutionMonitoringComponenets/KpiCards";
import PhaseProgress from "./ExecutionMonitoringComponenets/PhasesProgress";
import QualityPanel from "./ExecutionMonitoringComponenets/QualityPanel";
import SafetyPanel from "./ExecutionMonitoringComponenets/SafetyPanel";
import InspectionList from "./ExecutionMonitoringComponenets/InspectionList";
import NonConformities from "./ExecutionMonitoringComponenets/NonConformities";
import QuickActions from "./ExecutionMonitoringComponenets/QuickActions";
import Header from "./PlanningGanttComponenets/Header";

export default function ExecutionMonitoring() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  // Load Projects
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/engineer/getProjects")
      .then((res) => {
        setProjects(res.data);
        if (res.data.length > 0) {
          setCurrentProject(res.data[0]);
        }
      })
      .catch(console.log);
  }, []);

  // Load Execution Data
  useEffect(() => {
    if (!currentProject?.id) return;

    setLoading(true);

    axios
      .get(`http://127.0.0.1:8000/api/projects/${currentProject.id}/execution`)
      .then((res) => setData(res.data))
      .catch(console.log)
      .finally(() => setLoading(false));
  }, [currentProject?.id]);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <Header
        projects={projects}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Execution Monitoring
        </h1>
      </div>

      {/* KPI Cards */}
      <KpiCards data={data} />

      {/* Top Row */}
      <div className="grid grid-cols-3 gap-4 mt-6 mb-4">

        <QualityPanel
          inspectionId={data.qualityInspection?.id}
        />

        <SafetyPanel
          projectId={currentProject?.id}
        />

        <QuickActions
          projectId={currentProject?.id}
        />

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-4">

        <InspectionList
          projectId={currentProject?.id}
        />

        <NonConformities
          projectId={currentProject?.id}
        />

      </div>

    </div>
  );
}