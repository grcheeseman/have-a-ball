import React from "react";

function KnitterCard({ username, picture, bio, id }) {
  return (
    <a href={`/knitters/${id}`}>
      <div className="w-40 rounded shadow-xl auto-col-auto bg-white p-8 m-3">
        <div className="">
          <div className="">
            <img className="" src={picture} alt={username} />
          </div>
        </div>
        <div className="">
          <b><div className="text-sm">{username}</div></b>
          {/* <p className="">BIO : {bio}</p> */}
        </div>
      </div>
    </a>
  );
}

export default KnitterCard;
