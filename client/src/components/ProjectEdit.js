import { useState } from "react";
import Modal from "react-modal";
import ProjectForm from "./ProjectForm";

function ProjectEdit({ project, setProject }) {
  const [showModal, setShowModal] = useState(false);

  function handleEdit(projectUpdates) {
    fetch(`/api/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdates),
    }).then((response) => {
      if (response.ok) {
        response.json().then((updatedProject) => {
          setProject(updatedProject);
          closeModal();
        });
      }
    });
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <>
      <div
        className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3"
        onClick={() => setShowModal(true)}
      >
        <img src="/images/edit.svg" alt=""/>
        <p>Edit</p>
      </div>
      <Modal isOpen={showModal} onRequestClose={closeModal}>
        <ProjectForm
          project={project}
          onSubmit={(values) => {
            handleEdit(values);
          }}
        />
        <button
          className="mt-5 p-2 rounded text-white bg-slate-500"
          onClick={closeModal}
        >
          Cancel
        </button>
      </Modal>
    </>
  );
}

export default ProjectEdit;
