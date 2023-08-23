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
import { UserProvider } from "../context/User";
import Dashboard from "./Dashboard";
import ProjectAddForm from "./ProjectAddPage";
import Modal from "react-modal";
import EventDetails from "./EventDetails";
import EventsPage from "./EventsPage";

Modal.setAppElement("#root");

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(
      "https://grcheeseman.pythonanywhere.com/have-a-ball/check_session"
    ).then((resp) => {
      if (resp.ok) {
        resp.json().then((knitter) => setUser(knitter));
      }
    });
  }, []);

  return (
    <>
      <UserProvider>
        <Navbar user={user} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/knitters" element={<KnittersPage />} />
          <Route path="/knitters/:knitterId" element={<KnitterDetails />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route
            path="/projects/:projectId"
            element={<ProjectDetails user={user} />}
          />
          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="/logout"
            element={<Logout user={user} setUser={setUser} />}
          />
          <Route path="/dashboard" element={<Dashboard user={user} />} />
          <Route path="/add-project" element={<ProjectAddForm user={user} />} />
          <Route
            path="/events/:eventId"
            element={<EventDetails user={user} />}
          />
          <Route path="/events" element={<EventsPage />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
