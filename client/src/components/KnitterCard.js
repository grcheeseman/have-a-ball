import React from "react";
import { Link } from "react-router-dom";

function KnitterCard({ username, picture, id }) {
  return (
    <Link to={`/knitters/${id}`}>
      <div className="w-40 rounded shadow-xl auto-col-auto bg-white p-8 m-3">
        <div className="">
          <div className="">
            <img className="" src={picture} alt={username} />
          </div>
        </div>
        <div className="">
          <b>
            <div className="text-sm">{username}</div>
          </b>
        </div>
      </div>
    </Link>
  );
}

export default KnitterCard;
