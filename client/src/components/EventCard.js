import React from "react";

function EventCard({ name, picture, bio, id }) {
  return (
    <div>
      <a href={`/events/${id}`}>
        <div className="w-80 h-110 overflow-hidden rounded shadow-lg auto-cols-auto bg-white m-6 ">
          <div className="container h-52 flex items-center overflow-hidden">
            <div className="">
              <img className="w-auto " src={picture} alt={name} />
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-700 text-base">
              <b>Event Name: </b>
              {name}
            </p>
            <p className="text-gray-700 text-base">
              <b>Event Details:</b> {bio}
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default EventCard;
