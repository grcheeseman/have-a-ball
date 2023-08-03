import React from "react";

function ProjectCard({ likes, picture, body, id, pattern_name }) {
  return (
    <div>
      <a href={`/projects/${id}`}>
        <div className="w-80 rounded overflow-hidden shadow-lg auto-cols-auto bg-blue-200/50 m-6 ">
          <div className="container h-52 flex items-center overflow-hidden">
            <div className="">
              <img className="" src={picture} alt={pattern_name} />
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-700 text-base">
              project name : {pattern_name}
            </p>
            <div className="font-bold text-xl mb-2">{likes}</div>
            <p className="text-gray-700 text-base">picture caption : {body}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ProjectCard;
