import { useState } from "react";
import { TextField } from "@mui/material";
import { DesktopDateTimePicker } from "@mui/x-date-pickers";
import "react-datetime-picker/dist/DateTimePicker.css";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import Button from "./Button";

const AddEvent = ({ addEvent }) => {
  const [event, setNewEvent] = useState({});

  const handleClick = () => {
    addEvent(event);
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
          Pick an End Date
          <DesktopDateTimePicker
            placeholderText="End Date"
            value={event.end}
            onChange={(end) => setNewEvent({ ...event, end })}
            renderInput={(params) => <TextField {...params} />}
          />
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
