import { NavLink } from "react-router-dom";

function Navbar({ user }) {
  let login =
    user === null ? (
      <li className="text-l m-2 py-2 pl-3 pr-4 text-black">
        <NavLink to="/login">Login</NavLink>
      </li>
    ) : null;

  let logout =
    user !== null ? (
      <li className="text-l m-2 py-2 pl-3 pr-4 text-black">
        <NavLink to="/logout">Logout</NavLink>
      </li>
    ) : null;

  return (
    <header>
    <div className=" bg-yellow-50 ">
      <div>
        <NavLink to="/">
          <h1 className="text-4xl text-black font-bold m-5 font-sans"> 🧶 Have A Ball</h1>
        </NavLink>
        <ul className="text-l flex me-4 justify-end">
          <li className="text-l m-2 py-2 pl-3 pr-4 text-black underline">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li className="text-l m-2 py-2 pl-3 pr-4 text-black underline">
            <NavLink to="/knitters">Browse Knitters</NavLink>
          </li>
          <li className="text-l m-2 py-2 pl-3 pr-4 text-black underline">
            <NavLink to="/projects">Browse Projects</NavLink>
          </li>
          <li className="text-l m-2 py-2 pl-3 pr-4 text-black underline">
            <NavLink to="/events">Browse Events</NavLink>
          </li>
          {login}
          {logout}
        </ul>
      </div>
    </div>
    </header>
  );
}

export default Navbar;
