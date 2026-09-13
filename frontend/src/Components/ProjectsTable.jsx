import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MoreHorizontal,
  MapPin,
  Pencil,
  Trash2,
  X,
  Loader2,
  CalendarDays,
  AlertTriangle,
} from "lucide-react";

export default function ProjectsTable({
  projects = [],
  setProjects,
}) {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);
  const [deleteProject, setDeleteProject] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const getStatusStyle = (status) => {
    const styles = {
      active:
        "bg-emerald-50 text-emerald-700 border-emerald-200",
      paused:
        "bg-amber-50 text-amber-700 border-amber-200",
      completed:
        "bg-blue-50 text-blue-700 border-blue-200",
      cancelled:
        "bg-red-50 text-red-700 border-red-200",
      planned:
        "bg-slate-50 text-slate-600 border-slate-200",
    };

    return styles[status] || styles.planned;
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "bg-emerald-500";
    if (progress >= 40) return "bg-amber-400";
    return "bg-blue-500";
  };

  const handleEdit = (project) => {
    if (!project?.id) {
      console.error("Project ID is missing:", project);
      return;
    }

    navigate(`/projects/${project.id}/edit`);
  };

  const handleDelete = async () => {
    if (!deleteProject?.id) return;

    try {
      setDeleting(true);

      await axios.delete(
        `http://127.0.0.1:8000/api/engineer/projects/${deleteProject.id}`
      );

      setProjects((prev) =>
        prev.filter(
          (project) => project.id !== deleteProject.id
        )
      );

      setDeleteProject(null);
      setOpenMenu(null);
    } catch (error) {
      console.error("Delete project error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete project."
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {/* TABLE HEADER */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-7 bg-blue-600 rounded-full" />

              <h2 className="text-lg font-bold text-slate-900">
                Project Portfolio
              </h2>
            </div>

            <p className="text-xs text-slate-400 mt-1 ml-4">
              Overview of active construction operations
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />

            <span className="text-xs font-medium text-slate-500">
              Live portfolio
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200">
                <th className="text-left px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-slate-400">
                  Project
                </th>

                <th className="text-left px-5 py-4 font-bold text-[11px] uppercase tracking-wider text-slate-400">
                  Type
                </th>

                <th className="text-left px-5 py-4 font-bold text-[11px] uppercase tracking-wider text-slate-400">
                  Site Manager
                </th>

                <th className="text-left px-5 py-4 font-bold text-[11px] uppercase tracking-wider text-slate-400">
                  Timeline
                </th>

                <th className="text-left px-5 py-4 font-bold text-[11px] uppercase tracking-wider text-slate-400">
                  Progress
                </th>

                <th className="text-left px-5 py-4 font-bold text-[11px] uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="text-left px-5 py-4 font-bold text-[11px] uppercase tracking-wider text-slate-400">
                  Budget
                </th>

                <th className="text-left px-5 py-4 font-bold text-[11px] uppercase tracking-wider text-slate-400">
                  Issues
                </th>

                <th className="text-right px-6 py-4 font-bold text-[11px] uppercase tracking-wider text-slate-400">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {projects.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                        <MapPin
                          size={24}
                          className="text-slate-400"
                        />
                      </div>

                      <p className="font-semibold text-slate-700">
                        No projects found
                      </p>

                      <p className="text-xs text-slate-400 mt-1">
                        Try changing your search or filters.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                projects.map((project) => {
                  const progress = Number(
                    project.progress || 0
                  );

                  return (
                    <tr
                      key={project.id}
                      className="group hover:bg-blue-50/30 transition-colors duration-200"
                    >
                      {/* PROJECT */}
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
                            {project.name
                              ?.charAt(0)
                              ?.toUpperCase() || "P"}
                          </div>

                          <div>
                            <p className="font-bold text-slate-800 group-hover:text-blue-700 transition">
                              {project.name}
                            </p>

                            {project.location && (
                              <div className="flex items-center gap-1 mt-1 text-[11px] text-slate-400">
                                <MapPin size={11} />
                                {project.location}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* TYPE */}
                      <td className="px-5 py-5">
                        <span className="inline-flex px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium">
                          {project.type || "Construction"}
                        </span>
                      </td>

                      {/* SITE MANAGER */}
                      <td className="px-5 py-5">
                        {project.chef ? (
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                              {project.chef
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <p className="font-semibold text-slate-700 text-sm">
                                {project.chef}
                              </p>

                              <p className="text-[10px] text-slate-400">
                                Site Manager
                              </p>
                            </div>
                          </div>
                        ) : (
                          <span className="inline-flex px-2.5 py-1 rounded-lg bg-slate-50 border border-dashed border-slate-200 text-xs text-slate-400">
                            Not assigned
                          </span>
                        )}
                      </td>

                      {/* TIMELINE */}
                      <td className="px-5 py-5">
                        <div className="flex items-center gap-2">
                          <CalendarDays
                            size={15}
                            className="text-slate-400"
                          />

                          <div className="text-xs">
                            <p className="font-medium text-slate-600">
                              {project.start_date || "—"}
                            </p>

                            <p className="text-slate-400 mt-0.5">
                              → {project.end_date || "—"}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* PROGRESS */}
                      <td className="px-5 py-5 min-w-[170px]">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
                            Completion
                          </span>

                          <span className="text-xs font-black text-slate-700">
                            {progress}%
                          </span>
                        </div>

                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getProgressColor(
                              progress
                            )} transition-all duration-500`}
                            style={{
                              width: `${Math.min(
                                progress,
                                100
                              )}%`,
                            }}
                          />
                        </div>
                      </td>

                      {/* STATUS */}
                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-bold capitalize ${getStatusStyle(
                            project.status
                          )}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {project.status || "planned"}
                        </span>
                      </td>

                      {/* BUDGET */}
                      <td className="px-5 py-5">
                        <span className="font-bold text-slate-700">
                          {project.budget
                            ? `${Number(
                                project.budget
                              ).toLocaleString()} MAD`
                            : "—"}
                        </span>
                      </td>

                      {/* ISSUES */}
                      <td className="px-5 py-5">
                        <div
                          className={`inline-flex items-center gap-1.5 ${
                            Number(project.issues || 0) > 0
                              ? "text-red-600"
                              : "text-slate-400"
                          }`}
                        >
                          {Number(project.issues || 0) > 0 && (
                            <AlertTriangle size={14} />
                          )}

                          <span className="font-bold">
                            {project.issues ?? 0}
                          </span>
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-5 text-right relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu(
                              openMenu === project.id
                                ? null
                                : project.id
                            )
                          }
                          className="
                            w-9 h-9 rounded-xl
                            flex items-center justify-center
                            text-slate-400
                            hover:text-blue-600
                            hover:bg-blue-50
                            transition
                          "
                        >
                          <MoreHorizontal size={18} />
                        </button>

                        {openMenu === project.id && (
                          <div className="absolute right-6 top-14 z-40 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-1">
                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenu(null);
                                handleEdit(project);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                            >
                              <Pencil size={15} />
                              Edit Project
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setOpenMenu(null);
                                setDeleteProject(project);
                              }}
                              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                            >
                              <Trash2 size={15} />
                              Delete Project
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DELETE MODAL */}
      {deleteProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
            <div className="h-1.5 bg-red-500" />

            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Delete Project
                </h3>

                <p className="text-xs text-slate-400 mt-1">
                  This action cannot be undone.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setDeleteProject(null)}
                disabled={deleting}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-7">
              <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Trash2 size={21} />
              </div>

              <p className="text-sm text-slate-600 leading-6">
                Are you sure you want to delete{" "}
                <span className="font-bold text-slate-900">
                  {deleteProject.name}
                </span>
                ?
              </p>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 bg-slate-50">
              <button
                type="button"
                onClick={() => setDeleteProject(null)}
                disabled={deleting}
                className="px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition flex items-center gap-2"
              >
                {deleting && (
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                )}

                {deleting
                  ? "Deleting..."
                  : "Delete Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}