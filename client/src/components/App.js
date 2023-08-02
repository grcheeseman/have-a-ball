import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import KnittersPage from "./KnitterPage";
import KnitterDetails from "./KnitterDetails";
import ProjectsPage from "./ProjectPage";
import ProjectDetails from "./ProjectDetails";
import HomePage from "./HomePage";
import Login from "./Login";
import Logout from "./Logout";
import Navbar from "./Navbar";
// import { UserProvider } from "../context/User";

function App() {
  const [ user, setUser ] = useState(null)
  const [ knitters, setKnitters ] = useState([])
  const [ events, setEvents ] = useState([])
  const [ projects, setProjects ] = useState([])

  useEffect(() =>{
    fetch("/check_session")
    .then(resp => {
      if (resp.ok) {
        resp.json().then((knitter) => setUser(knitter));
      }
    })
  },[])

  useEffect(() =>{
    fetch("/knitters")
    .then(resp => resp.json())
    .then(knitters => setKnitters(knitters))
  },[])

  useEffect(() =>{
    fetch("/projects")
    .then(resp => resp.json())
    .then(projects => setProjects(projects))
  },[])

  useEffect(() =>{
    fetch("/events")
    .then(resp => resp.json())
    .then(events => setEvents(events))
  },[])

  // sends information to server-side, sets session, and sets state
  function handleLogin(e) {
      e.preventDefault();

      let username = e.target.username.value;
      let password = e.target.password.value;

      fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( { username, password } ),
        }).then((resp) => {
          if (resp.ok) {
            resp.json().then((knitter) => setUser(knitter));
          }
        });
  }

  // removes session, removes state
  function handleLogout() {
      fetch("/logout", {
          method: "DELETE"
      }).then(setUser(null))
  }

  // show loginForm only if user is null
  let loginForm = (user === null) ? (
    <>
    <h1>Login Form</h1>
    <form onSubmit = {handleLogin}>
      <label htmlFor="username">Username: </label>
      <input id = "username" type = "text" />
      <label htmlFor="password">Password: </label>
      <input id = "password" type = "password" />
      <button className = "border-2 p-2" type = "submit">Login</button>
    </form>
    </>
  ) : null;

  // show logoutForm only if user is not null
  let logoutForm = (user !== null) ? (
    <>
    <h1>Logout Form</h1>
    <button className = "border-2 p-2" onClick = {handleLogout}>Logout</button>
    </>
  ) : null;


  return (
    <>
    <Navbar />
    <Routes>
      <Route path = '/' element = {<HomePage />} />
      <Route path = '/knitters' element = {<KnittersPage knitters={knitters}/> }/>
      <Route path = '/knitters/:knitterId' element = {<KnitterDetails />} />
      <Route path = '/projects' element = {<ProjectsPage projects={projects}/> }/>
      <Route path = '/projects/:projectId' element = {<ProjectDetails />} />
      {/* <Route path = '/login' element = {<Login />} />
      <Route path = '/logout' element = {<Logout />} /> */}
    </Routes>
    {/* <UserProvider>
      <Login user={user} setUser={setUser} />
      <Logout user={user} setUser={setUser} />
    </UserProvider> */}

      {loginForm}
      {logoutForm}
</>
  );
}

export default App;
