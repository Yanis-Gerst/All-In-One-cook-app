import { useState } from "react";
import useMultipleInputs from "../CustomHook/useMutilpleInput";
import DatePicker from "react-datepicker";
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
      <input
        type="text"
        name="title"
        placeholder="Add Title"
        onChange={(e) =>
          setNewEvent({ ...event, [e.target.name]: e.target.value })
        }
        value={event.title || ""}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDateTimePicker
          placeholderText="Start Date"
          value={event.start}
          onChange={(start) => setNewEvent({ ...event, start })}
          renderInput={(params) => <TextField {...params} />}
        />
        <DesktopDateTimePicker
          placeholderText="End Date"
          value={event.end}
          onChange={(end) => setNewEvent({ ...event, end })}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Button text="Add Meal Event" onClick={handleClick} />
    </div>
  );
};

export default AddEvent;
