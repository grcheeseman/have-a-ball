import React from "react";
import ProjectCollection from "./ProjectCollection";
import { useState, useEffect } from "react";
import Search from "./Search";

function ProjectsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("https://grcheeseman.pythonanywhere.com/have-a-ball/projects", {
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((projects) => setProjects(projects));
  }, []);

  function handleSearch(e) {
    e.preventDefault();

    setSearchTerm(e.target.searchTerm.value);
  }

  return (
    <>
      <div className="flex justify-center ">
        <Search handleSearch={handleSearch} />
      </div>
      <div className="flex justify-center product-page">
        <div className="max-w-4xl p-10">
          <ProjectCollection projects={projects} searchTerm={searchTerm} />
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
