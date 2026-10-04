 
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
  loading = false,
}) {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] =
    useState(null);

  const [deleteProject, setDeleteProject] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);

  /*
   * STATUS STYLE
   */
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

    return (
      styles[status] ||
      styles.planned
    );
  };

  /*
   * PROGRESS COLOR
   */
  const getProgressColor = (
    progress
  ) => {
    if (progress >= 80) {
      return "bg-emerald-500";
    }

    if (progress >= 40) {
      return "bg-amber-400";
    }

    return "bg-blue-500";
  };

  /*
   * EDIT PROJECT
   */
  const handleEdit = (
    project
  ) => {
    if (!project?.id) {
      console.error(
        "Project ID is missing:",
        project
      );

      return;
    }

    navigate(
      `/engineer/projects/${project.id}/edit`
    );
  };

  /*
   * DELETE PROJECT
   */
  const handleDelete = async () => {
    if (!deleteProject?.id) {
      return;
    }

    try {
      setDeleting(true);

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.delete(
        `http://127.0.0.1:8000/api/engineer/projects/${deleteProject.id}`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,

            Accept:
              "application/json",
          },
        }
      );

      /*
       * Remove project from
       * current table immediately.
       */
      setProjects(
        (prev) =>
          prev.filter(
            (project) =>
              project.id !==
              deleteProject.id
          )
      );

      setDeleteProject(null);

      setOpenMenu(null);

    } catch (error) {
      console.error(
        "Delete project error:",
        error
      );

      alert(
        error.response?.data
          ?.message ||
          "Failed to delete project."
      );

    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* =========================
          TABLE CONTAINER
      ========================== */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* TABLE HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

          <div>

            <div className="flex items-center gap-2">

              <div className="h-7 w-2 rounded-full bg-blue-600" />

              <h2 className="text-lg font-bold text-slate-900">
                Project Portfolio
              </h2>

            </div>

            <p className="ml-4 mt-1 text-xs text-slate-400">
              Overview of active construction operations
            </p>

          </div>

          <div className="hidden items-center gap-2 sm:flex">

            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

            <span className="text-xs font-medium text-slate-500">
              Live portfolio
            </span>

          </div>

        </div>

        {/* =========================
            TABLE
        ========================== */}
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            {/* TABLE HEADER */}
            <thead>

              <tr className="border-b border-slate-200 bg-slate-50/80">

                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Project
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Type
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Site Manager
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Timeline
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Progress
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Budget
                </th>

                <th className="px-5 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Issues
                </th>

                <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Actions
                </th>

              </tr>

            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-slate-100">

              {/* LOADING */}
              {loading ? (

                <tr>

                  <td
                    colSpan="9"
                    className="px-6 py-16 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <Loader2
                        size={28}
                        className="animate-spin text-blue-600"
                      />

                      <p className="mt-3 font-semibold text-slate-700">
                        Loading projects...
                      </p>

                    </div>

                  </td>

                </tr>

              ) : projects.length === 0 ? (

                /* NO PROJECTS */
                <tr>

                  <td
                    colSpan="9"
                    className="px-6 py-16 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">

                        <MapPin
                          size={24}
                          className="text-slate-400"
                        />

                      </div>

                      <p className="font-semibold text-slate-700">
                        No projects found
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Try changing your search or filters.
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                /*
                 * Laravel pagination sends
                 * ONLY 10 projects here.
                 */
                projects.map(
                  (project) => {

                    const progress =
                      Number(
                        project.progress ||
                          0
                      );

                    return (

                      <tr
                        key={project.id}
                        className="group transition-colors duration-200 hover:bg-blue-50/30"
                      >

                        {/* PROJECT */}
                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white shadow-sm">

                              {project.name
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "P"}

                            </div>

                            <div>

                              <p className="font-bold text-slate-800 transition group-hover:text-blue-700">
                                {project.name}
                              </p>

                              {project.location && (

                                <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-400">

                                  <MapPin
                                    size={11}
                                  />

                                  {project.location}

                                </div>

                              )}

                            </div>

                          </div>

                        </td>

                        {/* TYPE */}
                        <td className="px-5 py-5">

                          <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">

                            {project.type ||
                              "Construction"}

                          </span>

                        </td>

                        {/* SITE MANAGER */}
                        <td className="px-5 py-5">

                          {project.chef ? (

                            <div className="flex items-center gap-2.5">

                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">

                                {project.chef
                                  .charAt(0)
                                  .toUpperCase()}

                              </div>

                              <div>

                                <p className="text-sm font-semibold text-slate-700">
                                  {project.chef}
                                </p>

                                <p className="text-[10px] text-slate-400">
                                  Site Manager
                                </p>

                              </div>

                            </div>

                          ) : (

                            <span className="inline-flex rounded-lg border border-dashed border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-400">
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
                                {project.start_date ||
                                  "—"}
                              </p>

                              <p className="mt-0.5 text-slate-400">
                                →{" "}
                                {project.end_date ||
                                  "—"}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* PROGRESS */}
                        <td className="min-w-[170px] px-5 py-5">

                          <div className="mb-1.5 flex items-center justify-between">

                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              Completion
                            </span>

                            <span className="text-xs font-black text-slate-700">
                              {progress}%
                            </span>

                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                            <div
                              className={`
                                h-full
                                rounded-full
                                ${getProgressColor(
                                  progress
                                )}
                                transition-all
                                duration-500
                              `}
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
                            className={`
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-full
                              border
                              px-3
                              py-1.5
                              text-[11px]
                              font-bold
                              capitalize
                              ${getStatusStyle(
                                project.status
                              )}
                            `}
                          >

                            <span className="h-1.5 w-1.5 rounded-full bg-current" />

                            {project.status ||
                              "planned"}

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
                            className={`
                              inline-flex
                              items-center
                              gap-1.5
                              ${
                                Number(
                                  project.issues ||
                                    0
                                ) > 0
                                  ? "text-red-600"
                                  : "text-slate-400"
                              }
                            `}
                          >

                            {Number(
                              project.issues ||
                                0
                            ) > 0 && (

                              <AlertTriangle
                                size={14}
                              />

                            )}

                            <span className="font-bold">
                              {project.issues ??
                                0}
                            </span>

                          </div>

                        </td>

                        {/* ACTIONS */}
                        <td className="relative px-6 py-5 text-right">

                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenu(
                                openMenu ===
                                  project.id
                                  ? null
                                  : project.id
                              )
                            }
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-xl
                              text-slate-400
                              transition
                              hover:bg-blue-50
                              hover:text-blue-600
                            "
                          >

                            <MoreHorizontal
                              size={18}
                            />

                          </button>

                          {/* ACTION MENU */}
                          {openMenu ===
                            project.id && (

                            <div className="absolute right-6 top-14 z-40 w-48 rounded-xl border border-slate-200 bg-white py-1 shadow-xl">

                              {/* EDIT */}
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenu(
                                    null
                                  );

                                  handleEdit(
                                    project
                                  );
                                }}
                                className="
                                  flex
                                  w-full
                                  items-center
                                  gap-3
                                  px-4
                                  py-3
                                  text-sm
                                  text-slate-700
                                  transition
                                  hover:bg-blue-50
                                  hover:text-blue-700
                                "
                              >

                                <Pencil
                                  size={15}
                                />

                                Edit Project

                              </button>

                              {/* DELETE */}
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenu(
                                    null
                                  );

                                  setDeleteProject(
                                    project
                                  );
                                }}
                                className="
                                  flex
                                  w-full
                                  items-center
                                  gap-3
                                  px-4
                                  py-3
                                  text-sm
                                  text-red-600
                                  transition
                                  hover:bg-red-50
                                "
                              >

                                <Trash2
                                  size={15}
                                />

                                Delete Project

                              </button>

                            </div>

                          )}

                        </td>

                      </tr>

                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* =========================
          DELETE MODAL
      ========================== */}
      {deleteProject && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">

            <div className="h-1.5 bg-red-500" />

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>

                <h3 className="text-lg font-bold text-slate-900">
                  Delete Project
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  This action cannot be undone.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setDeleteProject(
                    null
                  )
                }
                disabled={deleting}
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-lg
                  text-slate-400
                  hover:bg-slate-100
                  hover:text-slate-700
                "
              >

                <X
                  size={18}
                />

              </button>

            </div>

            {/* MODAL BODY */}
            <div className="px-6 py-7">

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">

                <Trash2
                  size={21}
                />

              </div>

              <p className="text-sm leading-6 text-slate-600">

                Are you sure you want to delete{" "}

                <span className="font-bold text-slate-900">
                  {deleteProject.name}
                </span>

                ?

              </p>

            </div>

            {/* MODAL FOOTER */}
            <div className="flex justify-end gap-3 bg-slate-50 px-6 py-4">

              {/* CANCEL */}
              <button
                type="button"
                onClick={() =>
                  setDeleteProject(
                    null
                  )
                }
                disabled={deleting}
                className="
                  rounded-lg
                  border
                  border-slate-200
                  bg-white
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-slate-600
                  transition
                  hover:bg-slate-100
                "
              >
                Cancel
              </button>

              {/* DELETE */}
              <button
                type="button"
                onClick={
                  handleDelete
                }
                disabled={deleting}
                className="
                  flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-red-600
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-red-700
                "
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

