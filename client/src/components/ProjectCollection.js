import ProjectCard from "./ProjectCard";

function ProjectCollection({ projects, searchTerm }) {
  const filteredProjects = projects.filter((project) => {
    return project.pattern_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  const renderProjectsToCards = filteredProjects.map((project) => (
    <ProjectCard
      key={project.id}
      id={project.id}
      picture={project.picture}
      body={project.body}
      likes={project.likes}
      pattern_name={project.pattern_name}
    />
    
  ));

  return (
    <>
      <ul className="cards flex flex-wrap">{renderProjectsToCards}</ul>

    </>
  );
}

export default ProjectCollection;
