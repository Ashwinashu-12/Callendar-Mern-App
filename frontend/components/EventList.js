import React from "react";

const EventList = ({ events }) => {
  return (
    <div>
      {events.length === 0 && <p>No events found</p>}
      {events.map(event => (
        <div key={event._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;
