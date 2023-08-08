import EventCard from "./EventCard";

function EventCollection({ events, searchTerm }) {
  const filteredEvents = events.filter((event) => {
    return event.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const renderEventsToCards = filteredEvents.map((event) => (
    <EventCard
      key={event.id}
      id={event.id}
      name={event.name}
      picture={event.picture}
      bio={event.bio}
    />
  ));

  return <ul className="cards flex flex-wrap">{renderEventsToCards}</ul>;
}

export default EventCollection;
