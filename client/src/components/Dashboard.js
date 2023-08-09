import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ProjectDelete from "./ProjectDelete";

const RenderProjects = ({ projects, setProjects }) => {
  const [showProjectEdit, setShowProjectEdit] = useState(false);

  return projects.map((project) => (
    <div key={project.id}>
      <a
        className="attendees"
        key={project.id}
        href={`/projects/${project.id}`}
      >
        <img
          className="avatar mt-3 mb-2"
          src={project.picture}
          alt={project.pattern_name}
        />
        <h3>{project.pattern_name}</h3>
      </a>
      <ProjectDelete
        projectId={project.id}
        afterDelete={() => {
          setProjects(projects.filter((p) => p.id != project.id));
        }}
      />
      <div
        className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3"
        onClick={() => setShowProjectEdit(true)}
      >
        <img src="/images/edit.svg" />
        <p>Edit</p>
      </div>
    </div>
  ));
};

function Dashboard({
  user,
  handleUserChange,
  onProjectChange,
  onKnitterChange,
}) {
  const [projects, setProjects] = useState([]);
  const [showUserEditWindow, setShowUserEditWindow] = useState(false);

  useEffect(() => {
    if (user !== null) {
      fetch(`/api/projects?knitter_id=${user.id}`)
        .then((resp) => resp.json())
        .then((projects) => setProjects(projects));
    }
  }, [user]);

  if (user === null) {
    return (
      <>
        <div>Please login!</div>
        <Link to="/login">Log in here!</Link>
      </>
    );
  }
  // console.log(user);
  return (
    <>
      <section className="pt-[150px] pb-[20px] lg:pt-[150px] lg:pb-[50px] bg-blue relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div>
            <h1 className="text-[#373737] font-[600] text-[30px] lg:text-[35px] xl:text-[40px] leading-[1] mb-[25px] md:mb-[32px] px-3">
              Hi, {user.username} 👋
            </h1>
          </div>
        </div>
      </section>
      <section className="py-[5%] lg:py-[5%] relative overflow-hidden">
        <div className="container mx-auto px-10">
          <div className="container mx-auto px-10">
            <div className="grid lg:grid-cols-12 grid-cols-1 grid gap-10 items-top">
              {/* Personal Info
                  ------------------------------*/}
              <div className="lg:col-span-6 text-left mb-0 lg:mb-0 dashboard-half">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-3">
                    <h2>Personal Information</h2>
                  </div>
                  <div
                    className="lg:col-span-1 text-right mb-0 lg:mb-0 lg:ml-[10%] flex justify-end items-top"
                    onClick={() => setShowUserEditWindow(true)}
                  >
                    <div className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil-square dashboard-icon cursor-pointer"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                        />
                      </svg>
                      <p>Edit</p>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <p>Username: {user.username}</p>
                    <p>
                      <img src={user.picture} />{" "}
                    </p>
                    <p>Bio: {user.bio}</p>
                  </div>
                </div>
              </div>
              {/* Project Info
                  ------------------------------*/}
              <div className="lg:col-span-6 text-left mb-0 lg:mb-0 dashboard-half">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-3">
                    <h2>Your Projects</h2>
                  </div>
                  <div className="lg:col-span-1 text-right mb-[50px] lg:mb-0 lg:ml-[10%] flex justify-end items-top">
                    <NavLink to="/projects">
                      <div className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3">
                        <img src="images/add.svg" />
                        <p>Add</p>
                      </div>
                    </NavLink>
                  </div>
                  <div className="col-span-4">
                    {user && user.projects && user.projects.length === 0 ? (
                      <div>You currently have no projects</div>
                    ) : (
                      <div className="flex text-center">
                        <RenderProjects
                          projects={projects}
                          setProjects={setProjects}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/* Events Info
                  ------------------------------*/}
              <div>
                {user &&
                user.knitter_event_dates &&
                user.knitter_event_dates.length === 0 ? (
                  <div>You are not attending any events.</div>
                ) : (
                  user.knitter_event_dates.map((knitterEventDate) => {
                    const eventDate = knitterEventDate.event_date;
                    const event = eventDate.event;
                    return (
                      <li key={eventDate.id}>
                        <p>{eventDate.date}</p>
                        <p>{event.name}</p>
                      </li>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
