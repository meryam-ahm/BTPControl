import { useEffect, useState } from "react";
import axios from "axios";
import {
  RotateCcw,
  SlidersHorizontal,
  Search,
  ChevronDown,
  Check,
} from "lucide-react";

export default function FiltersBar({ onFilter }) {
  const initialFilters = {
    type: "",
    client_id: "",
    chef_id: "",
    start_date: "",
    end_date: "",
    status: "",
  };

  const [filters, setFilters] = useState(initialFilters);

  const [options, setOptions] = useState({
    types: [],
    chefs: [],
    statuses: [],
  });

  const [openDropdown, setOpenDropdown] = useState(null);
  const [typeSearch, setTypeSearch] = useState("");
  const [chefSearch, setChefSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/engineer/dashbored/filters-data")
      .then((res) => setOptions(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    const updated = {
      ...filters,
      [e.target.name]: e.target.value,
    };

    setFilters(updated);
    onFilter(updated);
  };

  const selectType = (value) => {
    const updated = {
      ...filters,
      type: value,
    };

    setFilters(updated);
    onFilter(updated);
    setOpenDropdown(null);
    setTypeSearch("");
  };

  const selectChef = (value) => {
    const updated = {
      ...filters,
      chef_id: value,
    };

    setFilters(updated);
    onFilter(updated);
    setOpenDropdown(null);
    setChefSearch("");
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    onFilter(initialFilters);
    setOpenDropdown(null);
    setTypeSearch("");
    setChefSearch("");
  };

  const activeFilters = Object.values(filters).filter(Boolean).length;

  const filteredTypes = options.types.filter((type) =>
    type.toLowerCase().includes(typeSearch.toLowerCase())
  );

  const filteredChefs = options.chefs.filter((chef) =>
    chef.name.toLowerCase().includes(chefSearch.toLowerCase())
  );

  const selectedChef = options.chefs.find(
    (chef) => String(chef.id) === String(filters.chef_id)
  );

  const selectClass = (active) =>
    `h-10 min-w-[170px] px-3 rounded-xl border text-sm font-medium
    flex items-center justify-between gap-3 cursor-pointer transition-all
    ${
      active
        ? "bg-blue-50 border-blue-400 text-blue-700 shadow-sm"
        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
    }`;

  const inputClass =
    "h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-600 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm">

      {/* HEADER */}
      <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#0f2747] flex items-center justify-center">
            <SlidersHorizontal size={15} className="text-yellow-400" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-800">
              Filter Projects
            </h3>
            <p className="text-xs text-slate-400">
              Refine your project list
            </p>
          </div>
        </div>

        {activeFilters > 0 && (
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
            {activeFilters} active
          </span>
        )}
      </div>

      {/* FILTERS */}
      <div className="p-4">
        <div className="flex flex-wrap gap-3 items-end">

          {/* PROJECT TYPE */}
          <div className="relative">
            <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Project Type
            </label>

            <button
              type="button"
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "type" ? null : "type"
                )
              }
              className={selectClass(filters.type)}
            >
              <span className="truncate max-w-[150px]">
                {filters.type || "All Types"}
              </span>

              <ChevronDown
                size={16}
                className={`shrink-0 transition-transform ${
                  openDropdown === "type" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === "type" && (
              <div className="absolute z-50 top-[68px] left-0 w-[270px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">

                {/* SEARCH */}
                <div className="p-2 border-b border-slate-100">
                  <div className="relative">
                    <Search
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      autoFocus
                      type="text"
                      placeholder="Search project type..."
                      value={typeSearch}
                      onChange={(e) => setTypeSearch(e.target.value)}
                      className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-400 focus:bg-white"
                    />
                  </div>
                </div>

                {/* OPTIONS */}
                <div className="max-h-64 overflow-y-auto p-1.5">

                  <button
                    type="button"
                    onClick={() => selectType("")}
                    className={`w-full px-3 py-2.5 rounded-lg text-left text-sm flex items-center justify-between hover:bg-blue-50 transition ${
                      !filters.type
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-slate-600"
                    }`}
                  >
                    All Types

                    {!filters.type && <Check size={15} />}
                  </button>

                  {filteredTypes.map((type, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => selectType(type)}
                      className={`w-full px-3 py-2.5 rounded-lg text-left text-sm flex items-center justify-between hover:bg-blue-50 transition ${
                        filters.type === type
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "text-slate-600"
                      }`}
                    >
                      <span className="truncate">{type}</span>

                      {filters.type === type && <Check size={15} />}
                    </button>
                  ))}

                  {filteredTypes.length === 0 && (
                    <div className="px-3 py-5 text-center text-sm text-slate-400">
                      No project type found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* SITE MANAGER */}
          <div className="relative">
            <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Site Manager
            </label>

            <button
              type="button"
              onClick={() =>
                setOpenDropdown(
                  openDropdown === "chef" ? null : "chef"
                )
              }
              className={selectClass(filters.chef_id)}
            >
              <span className="truncate max-w-[150px]">
                {selectedChef?.name || "All Site Managers"}
              </span>

              <ChevronDown
                size={16}
                className={`shrink-0 transition-transform ${
                  openDropdown === "chef" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openDropdown === "chef" && (
              <div className="absolute z-50 top-[68px] left-0 w-[270px] bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">

                {/* SEARCH */}
                <div className="p-2 border-b border-slate-100">
                  <div className="relative">
                    <Search
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      autoFocus
                      type="text"
                      placeholder="Search site manager..."
                      value={chefSearch}
                      onChange={(e) => setChefSearch(e.target.value)}
                      className="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-50 border border-slate-200 text-sm outline-none focus:border-blue-400 focus:bg-white"
                    />
                  </div>
                </div>

                {/* OPTIONS */}
                <div className="max-h-64 overflow-y-auto p-1.5">

                  <button
                    type="button"
                    onClick={() => selectChef("")}
                    className={`w-full px-3 py-2.5 rounded-lg text-left text-sm flex items-center justify-between hover:bg-blue-50 transition ${
                      !filters.chef_id
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-slate-600"
                    }`}
                  >
                    All Site Managers

                    {!filters.chef_id && <Check size={15} />}
                  </button>

                  {filteredChefs.map((chef) => (
                    <button
                      type="button"
                      key={chef.id}
                      onClick={() => selectChef(chef.id)}
                      className={`w-full px-3 py-2.5 rounded-lg text-left text-sm flex items-center justify-between hover:bg-blue-50 transition ${
                        String(filters.chef_id) === String(chef.id)
                          ? "bg-blue-50 text-blue-700 font-semibold"
                          : "text-slate-600"
                      }`}
                    >
                      <span className="truncate">{chef.name}</span>

                      {String(filters.chef_id) === String(chef.id) && (
                        <Check size={15} />
                      )}
                    </button>
                  ))}

                  {filteredChefs.length === 0 && (
                    <div className="px-3 py-5 text-center text-sm text-slate-400">
                      No site manager found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* START DATE */}
          <div>
            <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Start Date
            </label>

            <input
              type="date"
              name="start_date"
              value={filters.start_date}
              onChange={handleChange}
              className={`${inputClass} ${
                filters.start_date
                  ? "bg-blue-50 border-blue-400 text-blue-700"
                  : ""
              }`}
            />
          </div>

          {/* END DATE */}
          <div>
            <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
              End Date
            </label>

            <input
              type="date"
              name="end_date"
              value={filters.end_date}
              onChange={handleChange}
              className={`${inputClass} ${
                filters.end_date
                  ? "bg-blue-50 border-blue-400 text-blue-700"
                  : ""
              }`}
            />
          </div>

          {/* STATUS */}
          <div>
            <label className="block mb-1.5 text-[11px] font-bold uppercase tracking-wide text-slate-400">
              Status
            </label>

            <select
              name="status"
              value={filters.status}
              onChange={handleChange}
              className={`${inputClass} min-w-[150px] ${
                filters.status
                  ? "bg-blue-50 border-blue-400 text-blue-700"
                  : ""
              }`}
            >
              <option value="">All Status</option>

              {options.statuses.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* RESET */}
          <button
            type="button"
            onClick={resetFilters}
            className="
              h-10 px-4 rounded-xl
              border border-yellow-300
              bg-yellow-50 text-yellow-700
              hover:bg-yellow-400 hover:text-[#0f2747]
              hover:border-yellow-400
              flex items-center gap-2
              text-sm font-semibold
              transition-all duration-200
            "
          >
            <RotateCcw size={15} />
            Reset
          </button>

        </div>
      </div>
    </div>
  );
} 