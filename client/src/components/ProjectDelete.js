import { useState } from "react";
import Modal from "react-modal";

function ProjectDelete({ projectId, afterDelete }) {
  const [showModal, setShowModal] = useState(false);

  function handleDelete() {
    fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
    closeModal();
    afterDelete();
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
        <img src="/images/delete.svg" alt="" />
        <p>Delete</p>
      </div>
      <Modal isOpen={showModal} onRequestClose={closeModal}>
        <p>Are you sure you want to delete this project?</p>
        <button onClick={handleDelete}>Yes</button>
        <button onClick={closeModal}>No</button>
      </Modal>
    </>
  );
}

ProjectDelete.defaultProps = {
  afterDelete: () => {},
};

export default ProjectDelete;
