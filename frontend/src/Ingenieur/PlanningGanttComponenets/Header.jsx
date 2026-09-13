import React, { useState } from "react";
import { Building2, ChevronDown, Check } from "lucide-react";

export default function Header({
  projects,
  currentProject,
  setCurrentProject,
}) {
  const [open, setOpen] = useState(false);

  // Supports both:
  // { id, name }
  // and
  // { project_id, project: { id, name } }
  const getProjectId = (item) => {
    return item?.id ?? item?.project_id ?? item?.project?.id;
  };

  const getProjectName = (item) => {
    return (
      item?.name ||
      item?.project?.name ||
      item?.project_name ||
      "Unnamed Project"
    );
  };

  const currentProjectId = getProjectId(currentProject);

  return (
    <header className="flex w-full items-center justify-between border-b border-gray-100 bg-white px-6 py-3 shadow-sm">
      <div className="relative flex items-center">
        {/* CURRENT PROJECT */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5 transition hover:bg-gray-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>

          <div className="flex min-w-[190px] flex-col text-left">
            <span className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
              Current Project
            </span>

            <span className="truncate text-sm font-semibold text-gray-800">
              {getProjectName(currentProject)}
            </span>
          </div>

          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-80 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            <div className="border-b border-gray-100 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Your Projects
              </p>
            </div>

            <div className="max-h-72 overflow-y-auto p-2">
              {!projects || projects.length === 0 ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  No projects found
                </div>
              ) : (
                projects.map((project) => {
                  const projectId = getProjectId(project);
                  const projectName = getProjectName(project);

                  const isSelected =
                    Number(currentProjectId) === Number(projectId);

                  return (
                    <button
                      key={projectId}
                      onClick={() => {
                        setCurrentProject(project);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                        isSelected
                          ? "bg-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          isSelected
                            ? "bg-blue-100"
                            : "bg-gray-100"
                        }`}
                      >
                        <Building2
                          className={`h-4 w-4 ${
                            isSelected
                              ? "text-blue-600"
                              : "text-gray-500"
                          }`}
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-sm font-medium ${
                            isSelected
                              ? "text-blue-700"
                              : "text-gray-800"
                          }`}
                        >
                          {projectName}
                        </p>

                        <p className="text-xs text-gray-400">
                          Project #{projectId}
                        </p>
                      </div>

                      {isSelected && (
                        <Check className="h-4 w-4 flex-shrink-0 text-blue-600" />
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
