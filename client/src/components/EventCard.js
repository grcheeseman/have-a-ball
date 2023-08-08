import React from "react";

function EventCard({ name, picture, bio, id }) {
  return (
    <div>
      <a href={`/events/${id}`}>
        <div className="w-80 rounded overflow-hidden shadow-lg auto-cols-auto bg-blue-200/50 m-6 ">
          <div className="container h-52 flex items-center overflow-hidden">
            <div className="">
              <img className="w-auto h-96" src={picture} alt={name} />
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-700 text-base">Event Name : {name}</p>
            <p className="text-gray-700 text-base">Event Details: {bio}</p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default EventCard;
