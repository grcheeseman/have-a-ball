import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectDelete from "./ProjectDelete";
import ProjectEdit from "./ProjectEdit";
import ProjectAdd from "./ProjectAdd";

const RenderProjects = ({ projects, setProjects }) => {
  function setProject(updatedProject) {
    // replace just one project in projects with its updated version
    setProjects(
      projects.map((project) => {
        return updatedProject.id === project.id ? updatedProject : project;
      })
    );
  }

  return projects.map((project) => (
    <div key={project.id}>
      <a
        className="attendees"
        key={project.id}
        href={`/projects/${project.id}`}
      >
        <img
          className="avatar mt-3 mb-2 p-4"
          src={project.picture}
          alt={project.pattern_name}
        />
        <h3>{project.pattern_name}</h3>
      </a>
      <ProjectDelete
        projectId={project.id}
        afterDelete={() => {
          setProjects(projects.filter((p) => p.id !== project.id));
        }}
      />
      <ProjectEdit project={project} setProject={setProject} />
    </div>
  ));
};

function Dashboard({ user }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (user !== null) {
      fetch(
        `https://grcheeseman.pythonanywhere.com/have-a-ball/projects?knitter_id=${user.id}`,
        { credentials: "include" }
      )
        .then((resp) => resp.json())
        .then((projects) => setProjects(projects));
    }
  }, [user]);

  function addProject(project) {
    setProjects([...projects, project]);
  }

  if (user === null) {
    return (
      <>
        <div>Please login!</div>
        <Link to="/login">Log in here!</Link>
      </>
    );
  }

  return (
    <>
      <section className="mt-6 bg-blue relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div>
            <h1 className="text-[#373737] font-[600] text-[30px] lg:text-[35px] xl:text-[40px] leading-[1] mb-[25px] md:mb-[32px] px-3">
              Hi, {user.username} 🌊
            </h1>
          </div>
        </div>
      </section>
      <section className=" relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="container mx-auto px-10">
            <div className="lg:grid-cols-12 grid-cols-1 grid gap-10 items-top">
              {/* Personal Info
                  ------------------------------*/}
              <div className="lg:col-span-8 text-left mb-0 lg:mb-0">
                <div className="container max-w-4xl rounded overflow-hidden shadow-lg bg-white m-6 center">
                  <div className="max-w-4xl rounded overflow-hidden  bg-white m-6 center ">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="col-span-3">
                        <h2 className="underline">Personal Information</h2>
                      </div>
                      <div className="col-span-4">
                        <p>
                          <img src={user.picture} alt="" />{" "}
                        </p>
                        <p>
                          <b>Bio:</b> {user.bio}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Project Info
                  ------------------------------*/}
              <div className="lg:col-span-8 text-left mb-0 lg:mb-0">
                <div className="container max-w-4xl rounded overflow-hidden shadow-lg bg-white m-6 center">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-3 p-8 text-lg bold underline">
                      <h2>Your Projects</h2>
                    </div>
                    <div className="lg:col-span-1 text-right mb-[50px] lg:mb-0 lg:ml-[10%] flex justify-end items-top">
                      <ProjectAdd addProject={addProject} />
                    </div>
                    <div className=" max-h-130 m-3 p-3 overflow-x-auto col-span-4 ">
                      {user && user.projects && user.projects.length === 0 ? (
                        <div>You currently have no projects</div>
                      ) : (
                        <div className="flex text-center p-3 m-3">
                          <RenderProjects
                            projects={projects}
                            setProjects={setProjects}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Events Info
                  ------------------------------*/}
              <div className="lg:col-span-8 text-left mb-0 lg:mb-0">
                <div className="container max-w-4xl rounded overflow-hidden shadow-lg bg-white m-6 center">
                  <div className="col-span-3 p-8 text-lg bold underline">
                    <h2 className="bold">Your events!</h2>
                  </div>
                  <div>
                    <div className="grid grid-cols-1 gap-4 overflow-hidden p-5">
                      {user &&
                      user.knitter_event_dates &&
                      user.knitter_event_dates.length === 0 ? (
                        <div>You are not attending any events.</div>
                      ) : (
                        <ul>
                          {user.knitter_event_dates.map((knitterEventDate) => {
                            const eventDate = knitterEventDate.event_date;
                            const event = eventDate.event;
                            return (
                              <li key={knitterEventDate.id}>
                                {eventDate.date} {event.name}
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
