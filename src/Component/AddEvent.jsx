import { useState } from "react";
import { TextField } from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import "react-datetime-picker/dist/DateTimePicker.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Button from "./Button";

const defineEventEnd = (eventStart, duration) => {
  if (!eventStart || !duration) return;

  let endDate = new Date(eventStart.getTime());

  endDate.setHours(Number(endDate.getHours()) + Number(duration));
  return endDate;
};

const AddEvent = ({ addEvent }) => {
  const [event, setNewEvent] = useState({});
  const [duration, setDuration] = useState(0);
  event.end = defineEventEnd(event.start, duration);
  if (duration) event.duration = duration;

  const handleClick = () => {
    if (!event.end || !event.start) return;
    const id = Date.now() + Math.floor(Math.random() * 100);
    addEvent({ ...event, id });
    setNewEvent({ title: "", start: "", end: "" });
  };

  return (
    <div className="add-event-container">
      <label>
        Add Title:
        <input
          id="main"
          type="text"
          name="title"
          placeholder="Add Title"
          onChange={(e) =>
            setNewEvent({ ...event, [e.target.name]: e.target.value })
          }
          value={event.title || ""}
        />
      </label>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <label>
          Pick a Start Date
          <DesktopDateTimePicker
            placeholderText="Start Date"
            value={event.start}
            onChange={(start) => setNewEvent({ ...event, start })}
            renderInput={(params) => <TextField {...params} />}
          />
        </label>
        <label>
          Duration(hours) ?
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
          {/* <DesktopDateTimePicker
            placeholderText="End Date"
            value={event.end}
            onChange={(end) => setNewEvent({ ...event, end })}
            renderInput={(params) => <TextField {...params} />}
          /> */}
        </label>
      </LocalizationProvider>
      <Button
        text="Add Meal Event"
        onClick={handleClick}
        className="button-add"
      />
    </div>
  );
};

export default AddEvent;
