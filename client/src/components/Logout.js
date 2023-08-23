import { Link } from "react-router-dom";
// import { UserContext } from "../context/User";
// import { useContext } from "react";

function Logout({ user, setUser }) {
  // const { user, setUser } = useContext(UserContext)

  function handleLogout() {
    fetch("https://grcheeseman.pythonanywhere.com/have-a-ball/logout", {
      method: "DELETE",
    }).then(setUser(null));
  }

  let logoutForm =
    user !== null ? (
      <>
        <h1>Logout Form</h1>
        <button className="border-2 p-2" onClick={handleLogout}>
          Logout
        </button>
      </>
    ) : (
      <>
        <div>You are not logged in!</div>
        <Link to="/login">Login Instead</Link>
      </>
    );

  return <>{logoutForm}</>;
}

export default Logout;
