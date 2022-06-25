import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddEvent from "./AddEvent";
import { useUserContext } from "../App";

const locales = {
  fr: require("date-fns/locale/fr"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const events = [
  {
    title: "Pâtes au bleu",
    start: new Date(2022, 5, 24, 2),
    end: new Date(2022, 5, 24, 3),
  },
];

const MealPanner = () => {
  const user = useUserContext();
  const [mealEvents, setMealEvents] = useState(user.data.mealEvents);

  const addMealEvent = (newEvent) => {
    setMealEvents([...mealEvents, newEvent]);
  };

  useEffect(() => {
    user.setData({ ...user.data, mealEvents: [...mealEvents] });
  }, [mealEvents]);

  return (
    <>
      <div className="calendar-container">
        <h1>Meal Planner</h1>
        <h2>Add new Event</h2>
        <AddEvent addEvent={addMealEvent} />
        <Calendar
          localizer={localizer}
          events={mealEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "80vh" }}
        />
      </div>
    </>
  );
};

export default MealPanner;
