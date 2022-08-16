import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState, createContext, useCallback } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { useUserContext } from "../../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AddEvent from "../AddEvent";
import WindowMealEvent from "../WindowMealEvent/WindowMealEvent";
import { IMealEvent } from "../../Interface/userData";

interface IDetailProps {
  mealEvent?: IMealEvent;
  e?: React.ChangeEvent<HTMLSelectElement>;
}

interface IMealContext {
  delete?: (meal: IMealEvent) => void;
  update?: (meal: IMealEvent) => void;
  add?: (meal: IMealEvent) => void;
}
const MealEventContext = createContext<IMealContext>({});

const DndCalendar = withDragAndDrop(Calendar);

export const useMealEventContext = () => {
  return useContext(MealEventContext);
};

const locales = {
  fr: require("date-fns/locale/fr"),
};

const calendarStyle = {
  height: "70vh",
  width: "80vw",
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const MealPlanner = () => {
  const user = useUserContext();
  const naviguate = useNavigate();
  const [mealEvents, setMealEvents] = useState<IMealEvent[]>(
    user.data.mealEvents?.map((mealEvent: IMealEvent) => {
      return {
        ...mealEvent,
        start: new Date(mealEvent.start),
        end: new Date(mealEvent.end),
      };
    })
  );
  const [detailProps, setDetailProps] = useState<IDetailProps>({});
  const showDetailsProps = Object.keys(detailProps).length > 0;

  const addMealEvent = (newEvent: IMealEvent): void => {
    setMealEvents([...mealEvents, newEvent]);
  };

  const updateMealEvent = (newEvent: IMealEvent): void => {
    const idToUpdate = newEvent.id;
    setMealEvents(
      mealEvents.map((mealEvent) => {
        if (mealEvent.id === idToUpdate) {
          return newEvent;
        }
        return mealEvent;
      })
    );
  };

  const deleteMealEvent = (eventToDelete: IMealEvent): void => {
    const idToDelete = eventToDelete.id;
    setMealEvents(
      mealEvents.filter((mealEvent) => {
        return idToDelete !== mealEvent.id;
      })
    );
  };

  const onSelectedEvent = (mealEvent: IMealEvent, e: any) => {
    setDetailProps({ mealEvent, e });
  };

  //Test

  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }

      setMealEvents((prev: IMealEvent[]) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });
    },
    [setMealEvents]
  );

  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      setMealEvents((prev: IMealEvent[]) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });
    },
    [setMealEvents]
  );

  useEffect(() => {
    if (!mealEvents) return;
    user.setData({ ...user.data, mealEvents: [...mealEvents] });
  }, [mealEvents]);

  useEffect(() => {
    //
    if (!mealEvents) return;
    setMealEvents(
      mealEvents.map((mealEvent: IMealEvent) => {
        return {
          ...mealEvent,
          start: new Date(mealEvent.start),
          end: new Date(mealEvent.end),
        };
      })
    );
  }, []);

  if (!user.isConnected) {
    naviguate("/");
  }

  return (
    <>
      <MealEventContext.Provider
        value={{
          delete: deleteMealEvent,
          update: updateMealEvent,
          add: addMealEvent,
        }}
      >
        <div className="calendar-container">
          <div className="calendar-header">
            <h1>Meal Planner</h1>
            <AddEvent addEvent={addMealEvent} />
          </div>
          <DndCalendar
            resizable
            popup
            onEventDrop={moveEvent}
            onEventResize={resizeEvent}
            localizer={localizer}
            events={mealEvents}
            defaultView="week"
            startAccessor="start"
            endAccessor="end"
            style={calendarStyle}
            onSelectEvent={onSelectedEvent}
          />
        </div>

        {showDetailsProps && (
          <WindowMealEvent
            e={detailProps.e as any}
            mealEvent={detailProps.mealEvent as IMealEvent}
            toClose={() => setDetailProps({})}
          />
        )}
      </MealEventContext.Provider>
    </>
  );
};

export default MealPlanner;
