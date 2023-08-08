import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useFormik } from "formik";

function ProjectEdit({ user, projectId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [updateProject, setUpdateProject] = useState({});
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      user_id: user.id,
      project_id: projectId.id,
      picture: projectId.picture,
      body: projectId.body,
      pattern_name: projectId.pattern_name,
      likes: projectId.likes,
    },
    onSubmit: (values) => {
      setIsLoading(true);

      fetch(`/api/projects/${projectId.id}`, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }).then((response) => {
        if (response.ok) {
          response.json().then((projectId) => {
            updateProject(projectId);
            navigate(`/dashboard`);
          });
        }
      });
    },
  });

  function handleEdit() {}

  console.log(formik);
  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <div
        className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3"
        onClick={() => setShowModal(true)}
      >
        <img src="/images/edit.svg" />
        <p>Edit</p>
      </div>
      <Modal isOpen={showModal} onRequestClose={closeModal}>
        <div>
          <div className="container mx-auto form-container">
            <form
              onSubmit={formik.handleSubmit}
              id="edit-form"
              method="PATCH"
              className="form"
            >
              <div>
                <label className="form-label">Select Project</label>
                <select
                  id="project_id"
                  name="project_id"
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.project_id}
                >
                  {projectId.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
                <p className="error"> {formik.errors.project_id}</p>
              </div>
              <div>
                <label className="form-label">Pattern Name</label>
                <input
                  name="pattern_name"
                  id="pattern_name"
                  placeholder="Give your project a cool pattern name"
                  className="form-control"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.pattern_name}
                />
              </div>
            </form>
          </div>{" "}
        </div>
        <button onClick={handleEdit}>Save Changes</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </>
  );
}

export default ProjectEdit;
