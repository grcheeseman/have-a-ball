import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom"


function App() {

  const [knitter, setKnitter] = useState(null); // stores knitter on client-side

  console.log(knitter);

  // grabs current session from server-side and sets state
  function handleCheckSession() {
      fetch("http://localhost:5555/check_session")
      .then((resp) => {
        if (resp.ok) {
          resp.json().then((knitter) => setKnitter(knitter));
        }
      });
  }

  // sends information to server-side, sets session, and sets state
  function handleLogin(e) {
      e.preventDefault();

      let username = e.target.username.value;
      let password = e.target.password.value;

      fetch("http://localhost:5555/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( { username, password } ),
        }).then((resp) => {
          if (resp.ok) {
            resp.json().then((knitter) => setKnitter(knitter));
          }
        });
  }

  // removes session, removes state
  function handleLogout() {
      fetch("http://localhost:5555/logout", {
          method: "DELETE"
      }).then(setKnitter(null))
  }

  return (
    <>
    {/* <Routes>
    </Routes> */}
      <h1>Login Form</h1>
      <form onSubmit = {handleLogin}>
        <label htmlFor="username">Username: </label>
        <input id = "username" type = "text" />
        <label htmlFor="password">Password: </label>
        <input id = "password" type = "password" />
        <button className = "border-2 p-2" type = "submit">Login</button>
      </form>

      <h1>Logout Form</h1>
      <button className = "border-2 p-2" onClick = {handleLogout}>Logout</button>

      {/* <h1>create form</h1>
      <button className = "border-2 p-2" onClick = {handleCreate}>Create Account</button> */}

      <br />

      <button className = "border-2 p-2" onClick = {handleCheckSession}>Check Session</button>
</>
    // <div className="App text-2xl">
    //   <p>hello beautiful world</p>
    // </div>
  );
}

export default App;
