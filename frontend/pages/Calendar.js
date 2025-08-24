import React, { useState } from "react";
import dayjs from "dayjs";
import "./Calendar.css";
import { getFestivals } from "../festivals"; // import correctly

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState({});
  const [newTask, setNewTask] = useState("");

  // ✅ Load all festivals
  const festivals = getFestivals();

  // Calendar range
  const startOfMonth = currentDate.startOf("month");
  const endOfMonth = currentDate.endOf("month");
  const startDate = startOfMonth.startOf("week");
  const endDate = endOfMonth.endOf("week");

  const dateList = [];
  let date = startDate;
  while (date.isBefore(endDate) || date.isSame(endDate, "day")) {
    dateList.push(date);
    date = date.add(1, "day");
  }

  const handlePrevMonth = () => setCurrentDate(currentDate.subtract(1, "month"));
  const handleNextMonth = () => setCurrentDate(currentDate.add(1, "month"));

  const handleAddTask = () => {
    if (newTask.trim() === "" || !selectedDate) return;
    const dateKey = selectedDate.format("YYYY-MM-DD");
    setTasks({
      ...tasks,
      [dateKey]: [...(tasks[dateKey] || []), newTask],
    });
    setNewTask("");
  };

  const handleDeleteTask = (taskIndex) => {
    const dateKey = selectedDate.format("YYYY-MM-DD");
    const updatedTasks = tasks[dateKey].filter((_, i) => i !== taskIndex);
    setTasks({
      ...tasks,
      [dateKey]: updatedTasks,
    });
  };

  return (
    <div className="calendar-container">
      {/* Header */}
      <div className="calendar-header glass">
        <button className="nav-btn" onClick={handlePrevMonth}>◀</button>
        <h2>{currentDate.format("MMMM YYYY")}</h2>
        <button className="nav-btn" onClick={handleNextMonth}>▶</button>
      </div>

      {/* Week Day Names */}
      <div className="calendar-grid day-names">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="day-name">{d}</div>
        ))}
      </div>

      {/* Days */}
      <div className="calendar-grid">
        {dateList.map((d, idx) => {
          const dateKey = d.format("YYYY-MM-DD");
          const isToday = d.isSame(dayjs(), "day");
          const isSelected = selectedDate && d.isSame(selectedDate, "day");
          const festival = festivals[dateKey] || null;

          return (
            <div
              key={idx}
              className={`day-cell glass ${d.isSame(currentDate, "month") ? "" : "faded"} 
              ${isSelected ? "selected" : ""} ${isToday ? "today" : ""}`}
              onClick={() => setSelectedDate(d)}
            >
              <div className="date-num">{d.date()}</div>
              {/* Task/Festival Indicator */}
              {(tasks[dateKey]?.length > 0 || festival) && (
                <div className="dot"></div>
              )}
              {/* Festival preview */}
              {festival && <span className="festival-preview">{festival}</span>}
            </div>
          );
        })}
      </div>

      {/* Task & Festival Modal */}
      {selectedDate && (
        <div className="modal">
          <div className="modal-content glass">
            <h3>{selectedDate.format("DD MMMM YYYY")}</h3>

            {/* Festival Info */}
            {festivals[selectedDate.format("YYYY-MM-DD")] && (
              <p className="festival-tag">
                🎉 {festivals[selectedDate.format("YYYY-MM-DD")]}
              </p>
            )}

            {/* Tasks */}
            <ul className="task-list">
              {(tasks[selectedDate.format("YYYY-MM-DD")] || []).map((task, i) => (
                <li key={i}>
                  {task}
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteTask(i)}
                  >
                    ❌
                  </button>
                </li>
              ))}
            </ul>

            {/* Add Task */}
            <div className="task-input">
              <input
                type="text"
                placeholder="Add task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={handleAddTask}>➕</button>
            </div>

            <button className="close-btn" onClick={() => setSelectedDate(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;