import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login({ user, setUser }) {
  const navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();

    let username = e.target.username.value;
    let password = e.target.password.value;

    fetch("https://grcheeseman.pythonanywhere.com/have-a-ball/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((knitter) => {
          setUser(knitter);
          navigate("/dashboard");
        });
      }
    });
  }

  let loginForm =
    user === null ? (
      <>
        <h1 classname="text-center">
          Enter your username and password to login.
        </h1>
        <div className="flex justify-center">
          <form classNAme="w-1/4 m-5" onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label className="mt-5" htmlFor="username">
                Username:{" "}
              </label>
              <input
                className="searchTerm rounded border p-2"
                id="username"
                type="text"
              />
              <label className="mt-5" htmlFor="password">
                Password:{" "}
              </label>
              <input
                className="searchTerm rounded border p-2"
                id="password"
                type="password"
              />
              <button
                className="mt-5 p-2 rounded text-black bg-blue-50"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </>
    ) : (
      <>
        <p>You are already logged in!</p>
        <Link to="/logout">Logout here</Link>
      </>
    );

  return <>{loginForm}</>;
}

export default Login;
