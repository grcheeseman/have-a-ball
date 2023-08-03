import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectDelete from "./ProjectDelete";

function ProjectDetails({ user }) {
  const params = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`/api/projects/${params.projectId}`).then((resp) => {
      if (resp.ok) {
        resp.json().then((project) => setProject(project));
      }
    });
  }, [params.projectId]);

  if (project === null) {
    return (
      <>
        <div>Project does not exist.</div>
      </>
    );
  }

  // only show delete button if logged in and it's user's project
  let deleteButton =
    user !== null && user.id === project.knitter.id ? (
      <ProjectDelete projectId={project.id} />
    ) : null;

  return (
    <>
    <div>
      <div className="flex justify-center">
        <div className="max-w-3xl rounded overflow-hidden shadow-lg bg-blue-200/50 m-6 center ">
          <div className="flex">
            <img
              className="w-auto h-96"
              src={project.picture}
              alt={project.pattern_name}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                <h1>{project.pattern_name}</h1>
              </div>
              <p className="text-gray-700 text-base">
                <b>Project Summary:</b> {project.body}
              </p>
              <p className="text-gray-700 text-base">
                <b>Likes:</b> {project.likes}
              </p>
              {deleteButton}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ProjectDetails;
