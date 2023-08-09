import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import KnitterAddEvent from "./KnitterAddEvent";

function EventDetails({ user }) {
  const params = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${params.eventId}`).then((resp) => {
      if (resp.ok) {
        resp.json().then((event) => setEvent(event));
      }
    });
  }, [params.eventId]);

  if (event === null) {
    return (
      <>
        <div>Event does not exist.</div>
      </>
    );
  }

  const dates = event.event_dates;
  const date_list = dates.map((eventDate, index, array) => {
    let eventDateAction = null;
    if (user !== null) {
      eventDateAction = eventDate.attending ? (
        <p>Attending</p>
      ) : (
        <KnitterAddEvent
          knitterId={user.id}
          eventDateId={eventDate.id}
          event={event}
          setEvent={setEvent}
        />
      );
    }
    return (
      <li key={eventDate.id}>
        <div>
          {eventDate.date}
          {eventDateAction}
        </div>
      </li>
    );
  });

  return (
    <>
      <div>
        <div className="flex justify-center">
          <div className="max-w-3xl rounded overflow-hidden shadow-lg bg-blue-200/50 m-6 center ">
            <div className="flex">
              <img
                className="w-auto h-96"
                src={event.picture}
                alt={event.name}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  <h1>{event.name}</h1>
                </div>
                <p className="text-gray-700 text-base">
                  <b>Event Details:</b> {event.bio}
                </p>
                <div>Event dates: </div>
                <div>{date_list}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventDetails;
