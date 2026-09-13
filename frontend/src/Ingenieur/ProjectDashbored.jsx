import { useState, useEffect } from "react";
import axios from "axios";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  Building2,
  Sparkles,
} from "lucide-react";

import Search from "../Components/Search";
import Cards from "../Components/Cards";
import ProjectsTable from "../Components/ProjectsTable";
import FiltersBar from "../Components/FiltersBar";
import FormCreateProject from "./ProjectDashboredComponenets/FormCreateProject";

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);

  const [filters, setFilters] = useState({});

  const fetchProjects = async (
    filtersData = {},
    page = 1
  ) => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/engineer/dashbored/projects/filter",
        {
          params: {
            ...filtersData,
            page: page,
            per_page: 10,
          },
        }
      );

      setProjects(res.data.data || []);
      setCurrentPage(res.data.current_page || 1);
      setLastPage(res.data.last_page || 1);
      setTotalProjects(res.data.total || 0);
    } catch (error) {
      console.log("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchProjects({}, 1);
  }, []);

  const handleSearch = (search) => {
    const newFilters = {
      ...filters,
      search,
    };

    setFilters(newFilters);
    fetchProjects(newFilters, 1);
  };

  const handleFilters = (newFilters) => {
    setFilters(newFilters);
    fetchProjects(newFilters, 1);
  };

  const goToPage = (page) => {
    if (page < 1 || page > lastPage) return;

    fetchProjects(filters, page);
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc]">
      {/* HERO HEADER */}
      <div className="relative overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="absolute -right-24 -top-32 w-96 h-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute left-1/3 -bottom-40 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative px-6 pt-7 pb-8">
          <div className="flex items-end justify-between gap-6">
            {/* TITLE */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                  <Building2
                    size={16}
                    className="text-white"
                  />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-300">
                  Construction Control
                </span>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-white">
                Project
                <span className="text-blue-400">
                  {" "}Portfolio
                </span>
              </h1>

              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Manage projects, monitor execution and keep
                every construction operation under control.
              </p>
            </div>

            {/* SEARCH + BUTTON */}
            <div className="flex items-center gap-3">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/10">
                <Search onSearch={handleSearch} />
              </div>

              <button
                onClick={() => setShowCreate(true)}
                className="
                  group
                  flex items-center gap-2
                  px-4 py-2.5
                  bg-blue-500
                  text-white
                  rounded-xl
                  font-semibold
                  text-sm
                  shadow-lg shadow-blue-500/20
                  hover:bg-blue-400
                  hover:-translate-y-0.5
                  transition-all
                  whitespace-nowrap
                "
              >
                <Plus
                  size={18}
                  className="group-hover:rotate-90 transition-transform"
                />
                New Project
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-7">
            <Sparkles
              size={13}
              className="text-amber-400"
            />

            <span className="text-[11px] font-medium text-slate-500">
              ENGINEERING PROJECT MANAGEMENT
            </span>

            <span className="h-px w-16 bg-slate-800" />

            <span className="text-[11px] text-slate-500">
              Real-time portfolio overview
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 py-6">
        {/* KPI CARDS */}
        <div className="-mt-1 mb-6">
          <Cards projects={projects} />
        </div>

        {/* FILTERS */}
        <div className="mb-5">
          <FiltersBar onFilter={handleFilters} />
        </div>

        {/* TABLE */}
        <ProjectsTable
          projects={projects}
          setProjects={setProjects}
        />

        {/* PAGINATION */}
        <div className="mt-4 bg-white border border-slate-200 rounded-2xl px-5 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-500">
              Showing page{" "}
              <span className="font-bold text-slate-800">
                {currentPage}
              </span>{" "}
              of{" "}
              <span className="font-bold text-slate-800">
                {lastPage}
              </span>

              <span className="ml-2 text-slate-400">
                ({totalProjects} projects)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  goToPage(currentPage - 1)
                }
                disabled={currentPage === 1}
                className="
                  flex items-center gap-1
                  px-3 py-2
                  text-sm font-medium
                  border border-slate-200
                  rounded-lg
                  text-slate-600
                  hover:bg-slate-50
                  transition
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {Array.from(
                { length: lastPage },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`
                    w-9 h-9
                    rounded-lg
                    text-sm
                    font-bold
                    transition
                    ${
                      currentPage === page
                        ? "bg-slate-950 text-white shadow-md"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }
                  `}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() =>
                  goToPage(currentPage + 1)
                }
                disabled={currentPage === lastPage}
                className="
                  flex items-center gap-1
                  px-3 py-2
                  text-sm font-medium
                  border border-slate-200
                  rounded-lg
                  text-slate-600
                  hover:bg-slate-50
                  transition
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                "
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE PROJECT MODAL */}
      {showCreate && (
  <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4 pt-8 backdrop-blur-sm">
    <div className="mx-auto w-full max-w-4xl">
      <FormCreateProject
        onClose={() => setShowCreate(false)}
        onCreated={() => {
          setShowCreate(false);
          fetchProjects(filters, currentPage);
        }}
      />
    </div>
  </div>
)}
    </div>
  );
};

export default ProjectDashboard;