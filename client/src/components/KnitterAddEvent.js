function KnitterAddEvent({ knitterId, eventDateId, event, setEvent }) {
  function handleAdd() {
    fetch(`/api/knitters/${knitterId}/add_event_date/${eventDateId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then((resp) => {
      if (resp.ok) {
        // go through event dates and set attending to true for this eventDateId
        const newEventDates = event.event_dates.map((eventDate) => {
          return eventDate.id === eventDateId
            ? { ...eventDate, attending: true }
            : eventDate;
        });
        setEvent({ ...event, event_dates: newEventDates });
      }
    });
  }

  return (
    <>
      <div
        className="flex flex-col items-center spacy-y-1.5 relative text-xs ml-3"
        onClick={handleAdd}
      >
        <img src="/images/add.svg" alt=""/>
      </div>
    </>
  );
}

export default KnitterAddEvent;
