import { useState } from "react";
import Modal from "react-modal";
import ProjectForm from "./ProjectForm";

function ProjectAdd({ addProject }) {
  const [showModal, setShowModal] = useState(false);


  function handleAdd(projectAdded) {
    fetch("/api/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectAdded),
    }).then((response) => {
      if (response.ok) {
        response.json().then((newProject) => {
          addProject(newProject);
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
        className="flex p-8 flex-col items-center text-center spacy-y-1.5 relative text-xs ml-3"
        onClick={() => setShowModal(true)}
      >
        <img src="/images/add.svg" />
        <p>Add New Project</p>
      </div>
      <Modal isOpen={showModal} onRequestClose={closeModal}>
        <ProjectForm
          onSubmit={(values) => {
            handleAdd(values);
          }}
        />
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </>
  );
}

export default ProjectAdd;
