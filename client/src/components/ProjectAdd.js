import ProjectAddForm from "./ProjectAddForm";

function ProjectAdd({ user, onProjectChange, onKnitterUpdate }) {
  return (
    <>
      <section className="pt-[120px] pb-[80px] lg:pt-[170px] lg:pb-[100px] bg-blue relative overflow-hidden">
        <AddPetForm
          user={user}
          onPetChange={onPetChange}
          onUserUpdate={onUserUpdate}
        />
      </section>
    </>
  );
}

export default ProjectAdd;
