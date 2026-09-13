import axios from "axios";
import { useState } from "react";

export default function Search({ setProjects }) {
  const [nameProject, setNameProject] = useState("");

  const handleSearch = (value) => {
    setNameProject(value);

    if (value.trim() === "") {
      axios
        .get("http://127.0.0.1:8000/api/engineer/dashbored/table")
        .then((res) => {
      setProjects(res.data.data || res.data);  
        })
        .catch((err) => console.log(err));

      return;
    }

    axios
      .get("http://127.0.0.1:8000/api/engineer/dashbored/projects/search", {
        params: { name: value },
      })
      .then((res) => {
      setProjects(res.data.data || res.data); // ✅ FIX
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-[340px] h-[30px]">
      <input
        type="search"
        placeholder="Search projects..."
        className="w-full p-3 border rounded-xl"
        value={nameProject}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}