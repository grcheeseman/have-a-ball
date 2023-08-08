import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EventDetails() {
  const params = useParams();
  const [events, setEvents] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${params.eventId}`).then((resp) => {
      if (resp.ok) {
        resp.json().then((events) => setEvents(events));
      }
    });
  }, [params.eventId]);

  if (events === null) {
    return (
      <>
        <div>Event no longer exists.</div>
      </>
    );
  }

  return (
    <>
      <div>
        <div className="flex justify-center">
          <div className="max-w-3xl rounded overflow-hidden shadow-lg bg-blue-200/50 m-6 center ">
            <div className="flex">
              <img
                className="w-auto h-96"
                src={events.picture}
                alt={events.name}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  <h1>{events.name}</h1>
                </div>
                <p className="text-gray-700 text-base">
                  <b>Event Details:</b> {events.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Dashboard knitter={knitter} /> */}
    </>
  );
}

export default EventDetails;
