import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className='flex justify-center min-h-screen bg-[url(https://www.crazyforewe.com/cdn/shop/articles/yarn_construction_1400x.progressive.png.jpg?v=1667835840)]'>
      <div className=" bg-slate-50/40 rounded">
        <h1 className="tracking-widest text-center text-3xl m-5 mb-10 font-bold">
          Welcome to Have a Ball!
        </h1>
        <p className="text-center text-xl">
          We're on a mission to connect fiber artists with one another!
        </p>
        <p className="text-xl text-center m-5">
          On our website, we connect knitters to other knitters virtually and
          via knitting events in your neighborhood!{" "}
        </p>
        <p className="text-xl text-center m-5">
          Sign in to access your profile, edit or post new projects, browse
          nearby events and more!
        </p>
        <p className="text-xl m-5"></p>
        <div className="flex flex-col items-center">
        <Link to="/login">
          <button className="text-xl text-center bg-slate-100/75 rounded-lg w-36 h-12 py-2 m-5">
            Log In Here!
          </button>
        </Link>
        {/* <Link to="/knitters">
          <button className="text-xl text-center bg-slate-100/75 rounded-lg w-36 h-12 py-2 m-5">
            View Knitters!
          </button>
        </Link>
        <Link to="/projects">
          <button className="text-xl text-center bg-slate-100/75 rounded-lg w-36 h-12 py-2 m-5">
            View Projects!
          </button>
        </Link>
        <Link to="/events">
          <button className="text-xl text-center bg-slate-100/75 rounded-lg w-36 h-12 py-2 m-5">
            View Events!
          </button>
        </Link> */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
