import React from "react";
import EventCollection from "./EventCollection";
import { useState, useEffect } from "react";
import Search from "./Search";

function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("https://grcheeseman.pythonanywhere.com/have-a-ball/events")
      .then((resp) => resp.json())
      .then((events) => setEvents(events));
  }, []);

  function handleSearch(e) {
    e.preventDefault();

    setSearchTerm(e.target.searchTerm.value);
  }

  return (
    <>
      {/* <NavBar/> */}
      <div className="flex justify-center ">
        <Search handleSearch={handleSearch} />
      </div>
      <div className="flex justify-center product-page">
        <div className="max-w-4xl p-10">
          <EventCollection events={events} searchTerm={searchTerm} />
        </div>
      </div>
    </>
  );
}

export default EventsPage;
