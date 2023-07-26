import React, { useState } from "react";

function App() {

  const [user, setUser] = useState(null); // stores knitter on client-side

  console.log(user);

  // grabs current session from server-side and sets state
  // function handleCheckSession() {
  //     fetch("http://localhost:3000/auto_log_in")
  //     .then((resp) => {
  //       if (resp.ok) {
  //         resp.json().then((user) => setUser(user));
  //       }
  //     });
  // }

  // sends information to server-side, sets session, and sets state
  function handleLogin(e) {
      e.preventDefault();

      let username = e.target.username.value;

      fetch("http://localhost:5555/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( { username } ),
        }).then((resp) => {
          if (resp.ok) {
            resp.json().then((user) => setUser(user));
          }
        });
  }

  // removes session, removes state
  function handleLogout() {
      fetch("http://localhost:5555/logout", {
          method: "DELETE"
      }).then(setUser(null))
  }

  return (
    <>
      <h1>Login Form</h1>
      <form onSubmit = {handleLogin}>
        <label>Username: </label>
        <input id = "username" type = "text" />
        <button className = "border-2 p-2" type = "submit">Login</button>
      </form>

      <h1>Logout Form</h1>
      <button className = "border-2 p-2" onClick = {handleLogout}>Logout</button>

      <br />

      {/* <button className = "border-2 p-2" onClick = {handleCheckSession}>Check Session</button> */}
</>
    // <div className="App text-2xl">
    //   <p>hello beautiful world</p>
    // </div>
  );
}

export default App;
