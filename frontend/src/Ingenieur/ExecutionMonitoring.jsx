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

  // =========================
  // LOAD PROJECTS
  // =========================
  useEffect(() => {
    const authHeader = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    };

    axios
      .get(
        "http://127.0.0.1:8000/api/engineer/getProjects",
        authHeader
      )
      .then((res) => {
        const responseData = res.data;

        // Normalize API response
        const projectList = Array.isArray(responseData)
          ? responseData
          : responseData?.projects || [];

        const normalizedProjects = projectList.map((project) => ({
          ...project,

          project_id: project.project_id ?? project.id,

          project_name:
            project.project_name ??
            project.name ??
            project.project?.project_name ??
            project.project?.name,
        }));

        setProjects(normalizedProjects);

        if (normalizedProjects.length > 0) {
          setCurrentProject(normalizedProjects[0]);
        }
      })
      .catch((error) => {
        console.error("PROJECTS ERROR:", error);
        console.error("SERVER RESPONSE:", error.response?.data);
        console.error("STATUS:", error.response?.status);
      });
  }, []);

  // =========================
  // LOAD EXECUTION DATA
  // =========================
  useEffect(() => {
    if (!currentProject) {
      return;
    }

    const projectId =
      currentProject.project_id ?? currentProject.id;

    if (!projectId) {
      console.error("No project ID found:", currentProject);
      return;
    }

    const authHeader = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    };

    setLoading(true);
    setData(null);

    axios
      .get(
        `http://127.0.0.1:8000/api/engineer/projects/${projectId}/execution`,
        authHeader
      )
      .then((res) => {
        console.log("EXECUTION DATA:", res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.error("EXECUTION DATA ERROR:", error);
        console.error("SERVER RESPONSE:", error.response?.data);
        console.error("STATUS:", error.response?.status);

        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentProject]);

  // =========================
  // LOADING
  // =========================
  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600 text-lg">
          Loading...
        </p>
      </div>
    );
  }

  const projectId =
    currentProject?.project_id ?? currentProject?.id;

  // =========================
  // UI
  // =========================
  return (
    <div className="min-h-screen bg-slate-100 p-6">

      {/* Header / Project Selector */}
      <Header
        projects={projects}
        currentProject={currentProject}
        setCurrentProject={setCurrentProject}
      />

      {/* Page Title */}
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
          projectId={projectId}
        />

        <QuickActions
          projectId={projectId}
        />

      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-2 gap-4">

        <InspectionList
          projectId={projectId}
        />

        <NonConformities
          projectId={projectId}
        />

      </div>

    </div>
  );
}