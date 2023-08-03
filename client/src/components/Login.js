import { Link } from "react-router-dom";

function Login({ user, setUser }) {
  function handleLogin(e) {
    e.preventDefault();

    let username = e.target.username.value;
    let password = e.target.password.value;

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((knitter) => setUser(knitter));
      }
    });
  }

  let loginForm =
    user === null ? (
      <>
        <h1>Login Form</h1>
        <form onSubmit={handleLogin}>
          <label htmlFor="username">Username: </label>
          <input id="username" type="text" />
          <label htmlFor="password">Password: </label>
          <input id="password" type="password" />
          <button className="border-2 p-2" type="submit">
            Login
          </button>
        </form>
      </>
    ) : (
      <>
        <div>"You are already logged in!"</div>
        <Link to="/logout">Logout Instead</Link>
      </>
    );

  return <>{loginForm}</>;
}

export default Login;
