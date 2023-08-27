import React from "react";
import { Link } from "react-router-dom";

function ProjectCard({ likes, picture, knitter, body, id, pattern_name }) {
  return (
    <div>
      <Link to={`/projects/${id}`}>
        <div className="w-80 rounded overflow-hidden shadow-xl auto-cols-auto bg-white m-6 ">
          <div className="container h-52 flex items-center overflow-hidden">
            <div className="">
              <img className="" src={picture} alt={pattern_name} />
            </div>
          </div>
          <div className="p-4">
            <b>
              <p className="text-gray-700 text-base">{pattern_name}</p>
            </b>
            <div className=" text-m mb-2">
              Creator: <b>{knitter}</b>
            </div>
            <div className=" text-m mb-2">Likes: {likes}</div>

            {/* <p className="text-gray-700 text-base">{body}</p> */}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
