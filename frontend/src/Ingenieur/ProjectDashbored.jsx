 
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

const API = "http://127.0.0.1:8000/api";

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);

  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const authHeaders = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  /*
   * FETCH PROJECTS
   *
   * Laravel response:
   *
   * {
   *   data: [...],
   *   current_page: 1,
   *   last_page: 4,
   *   per_page: 10,
   *   total: 38
   * }
   */
  const fetchProjects = async (
    filtersData = {},
    page = 1
  ) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/engineer/dashbored/projects`,
        {
          params: {
            ...filtersData,
            page: page,
            per_page: 10,
          },
          headers: authHeaders,
        }
      );

      console.log(
        "Projects response:",
        res.data
      );

      console.log(
        "Projects on current page:",
        res.data.data
      );

      console.log(
        "Number of projects:",
        res.data.data?.length
      );

      /*
       * IMPORTANT FIX:
       *
       * Laravel returns "data",
       * NOT "projects".
       */
      setProjects(
        Array.isArray(res.data.data)
          ? res.data.data
          : []
      );

      setCurrentPage(
        Number(res.data.current_page) || 1
      );

      setLastPage(
        Number(res.data.last_page) || 1
      );

      setTotalProjects(
        Number(res.data.total) || 0
      );

    } catch (error) {
      console.error(
        "Fetch projects error:",
        error
      );

      console.error(
        "Backend response:",
        error.response?.data
      );

      if (
        error.response?.status === 401
      ) {
        console.log(
          "Unauthorized: Bearer token is missing or invalid."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  /*
   * INITIAL LOAD
   */
  useEffect(() => {
    fetchProjects({}, 1);
  }, []);

  /*
   * SEARCH
   */
  const handleSearch = (search) => {
    const newFilters = {
      ...filters,
      search: search,
    };

    setFilters(newFilters);

    fetchProjects(
      newFilters,
      1
    );
  };

  /*
   * FILTERS
   */
  const handleFilters = (newFilters) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
    };

    setFilters(updatedFilters);

    fetchProjects(
      updatedFilters,
      1
    );
  };

  /*
   * PAGINATION
   */
  const goToPage = (page) => {
    const selectedPage = Number(page);

    if (
      selectedPage < 1 ||
      selectedPage > lastPage ||
      loading
    ) {
      return;
    }

    console.log(
      "Loading page:",
      selectedPage
    );

    fetchProjects(
      filters,
      selectedPage
    );
  };

  /*
   * CREATE PROJECT
   */
  const handleProjectCreated = async () => {
    setShowCreate(false);

    await fetchProjects(
      filters,
      currentPage
    );
  };

  /*
   * PAGE NUMBERS
   */
  const getPageNumbers = () => {
    const pages = [];

    if (lastPage <= 7) {
      for (
        let i = 1;
        i <= lastPage;
        i++
      ) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const start = Math.max(
      2,
      currentPage - 1
    );

    const end = Math.min(
      lastPage - 1,
      currentPage + 1
    );

    for (
      let i = start;
      i <= end;
      i++
    ) {
      pages.push(i);
    }

    if (
      currentPage <
      lastPage - 3
    ) {
      pages.push("...");
    }

    pages.push(lastPage);

    return pages;
  };

  return (
    <div className="min-h-screen bg-[#f6f8fc]">

      {/* =========================
          HERO HEADER
      ========================== */}
      <div className="relative overflow-hidden bg-slate-950">

        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div className="absolute -right-24 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute left-1/3 -bottom-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative px-6 pb-8 pt-7">

          <div className="flex items-end justify-between gap-6">

            {/* TITLE */}
            <div>

              <div className="mb-3 flex items-center gap-2">

                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-lg shadow-blue-600/30">

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

              <p className="mt-2 max-w-xl text-sm text-slate-400">
                Manage projects, monitor execution and keep
                every construction operation under control.
              </p>

            </div>

            {/* SEARCH + BUTTON */}
            <div className="flex items-center gap-3">

              <div className="rounded-xl border border-white/10 bg-white/10 p-1 backdrop-blur-md">

                <Search
                  onSearch={handleSearch}
                />

              </div>

              <button
                onClick={() =>
                  setShowCreate(true)
                }
                className="
                  group
                  flex
                  items-center
                  gap-2
                  whitespace-nowrap
                  rounded-xl
                  bg-blue-500
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-500/20
                  transition-all
                  hover:-translate-y-0.5
                  hover:bg-blue-400
                "
              >

                <Plus
                  size={18}
                  className="transition-transform group-hover:rotate-90"
                />

                New Project

              </button>

            </div>

          </div>

          <div className="mt-7 flex items-center gap-2">

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

      {/* =========================
          CONTENT
      ========================== */}
      <div className="px-6 py-6">

        {/* KPI CARDS */}
        <div className="-mt-1 mb-6">

          <Cards
            projects={projects}
          />

        </div>

        {/* FILTERS */}
        <div className="mb-5">

          <FiltersBar
            onFilter={handleFilters}
          />

        </div>

        {/* TABLE */}
        <ProjectsTable
          projects={projects}
          setProjects={setProjects}
          loading={loading}
        />

        {/* =========================
            PAGINATION
        ========================== */}
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* PAGINATION INFO */}
            <div className="text-sm text-slate-500">

              Showing page{" "}

              <span className="font-bold text-slate-800">
                {currentPage}
              </span>

              {" "}of{" "}

              <span className="font-bold text-slate-800">
                {lastPage}
              </span>

              <span className="ml-2 text-slate-400">
                ({totalProjects} projects)
              </span>

            </div>

            {/* PAGINATION BUTTONS */}
            <div className="flex items-center gap-2">

              {/* PREVIOUS */}
              <button
                type="button"
                onClick={() =>
                  goToPage(
                    currentPage - 1
                  )
                }
                disabled={
                  currentPage === 1 ||
                  loading
                }
                className="
                  flex
                  items-center
                  gap-1
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >

                <ChevronLeft
                  size={16}
                />

                Previous

              </button>

              {/* PAGE NUMBERS */}
              {getPageNumbers().map(
                (page, index) => {

                  if (
                    page === "..."
                  ) {
                    return (
                      <span
                        key={`dots-${index}`}
                        className="px-1 text-slate-400"
                      >
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      type="button"
                      key={page}
                      onClick={() =>
                        goToPage(page)
                      }
                      disabled={loading}
                      className={`
                        h-9
                        w-9
                        rounded-lg
                        text-sm
                        font-bold
                        transition
                        disabled:cursor-not-allowed
                        ${
                          currentPage === page
                            ? "bg-slate-950 text-white shadow-md"
                            : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                        }
                      `}
                    >
                      {page}
                    </button>
                  );
                }
              )}

              {/* NEXT */}
              <button
                type="button"
                onClick={() =>
                  goToPage(
                    currentPage + 1
                  )
                }
                disabled={
                  currentPage === lastPage ||
                  loading
                }
                className="
                  flex
                  items-center
                  gap-1
                  rounded-lg
                  border
                  border-slate-200
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-slate-600
                  transition
                  hover:bg-slate-50
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >

                Next

                <ChevronRight
                  size={16}
                />

              </button>

            </div>

          </div>

        </div>

      </div>

      {/* =========================
          CREATE PROJECT MODAL
      ========================== */}
      {showCreate && (

        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 p-4 pt-8 backdrop-blur-sm">

          <div className="mx-auto w-full max-w-4xl">

            <FormCreateProject
              onClose={() =>
                setShowCreate(false)
              }
              onCreated={
                handleProjectCreated
              }
            />

          </div>

        </div>

      )}

    </div>
  );
};

export default ProjectDashboard;

