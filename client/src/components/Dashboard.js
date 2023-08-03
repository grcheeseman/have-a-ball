import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard({ user }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`/api/projects`)
      .then((resp) => resp.json())
      .then((projects) => setProjects(projects));
  }, []);

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
      <h1>Hi, {user.username} 👋</h1>
    </>
  );
}

export default Dashboard;
