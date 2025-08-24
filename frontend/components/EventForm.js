import React, { useState } from "react";
import { createEvent } from "../services/api";

const EventForm = ({ onEventCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const eventData = { title, description, date };
      await createEvent(eventData, { headers: { Authorization: `Bearer ${token}` } });
      setTitle(""); setDescription(""); setDate("");
      if (onEventCreated) onEventCreated();
    } catch (err) {
      console.error(err);
      alert("Failed to create event");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventForm;
