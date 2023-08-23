import { useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";

function ProjectAddPage({ user }) {
  const navigate = useNavigate();

  function handleAdd(projectAdded) {
    fetch("https://grcheeseman.pythonanywhere.com/have-a-ball/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectAdded),
    }).then((response) => {
      if (response.ok) {
        response.json().then((newProject) => {
          navigate("/dashboard");
        });
      }
    });
  }

  return <ProjectForm onSubmit={handleAdd} />;
}

export default ProjectAddPage;
