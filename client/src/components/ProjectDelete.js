import { Link, useParams } from "react-router-dom";

function ProjectDelete({ projectId }) {
  const params = useParams();

  function handleDelete() {
    fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
  }

  return (
    <>
      <Link to="/projects">
        <button
          className="mr-2 p-2 rounded text-white bg-slate-500"
          onClick={() => handleDelete()}
        >
          Delete Project
        </button>
      </Link>
    </>
  );
}

export default ProjectDelete;
