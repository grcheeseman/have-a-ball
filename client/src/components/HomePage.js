import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <div className="bg-slate-400/75 rounded px-20 w-3/4 mt-36 mb-36">
        <h1 className="tracking-widest text-3xl m-5 mb-10 font-bold">
          Welcome to Have a Ball!
        </h1>
        <p className="text-center text-xl">
          We're on a mission to connect fiber artists with one another!
        </p>
        <h2 className="tracking-widest text-2xl m-5 font-bold">Our Story</h2>
        <p className="text-xl m-5">
          We are looking to connect knitters and fiber artists to one another
          via{" "}
        </p>
        <p className="text-xl m-5">events in their neighborhoods. </p>
        <p className="text-xl m-5">
          Sign in to access your profile, post project updates, browse nearby
          events and more!
        </p>
        <p className="text-xl m-5"></p>
        <Link to="/login">
          <button className="text-xl bg-blue-100/75 rounded-lg w-36 h-12 py-2 m-5">
            Log In Here!
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
