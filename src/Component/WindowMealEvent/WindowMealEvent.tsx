import { AiOutlineClose } from "react-icons/ai";
import ContentEditable from "../ContentEditable";
import { useEffect, useState } from "react";
import { useMealEventContext } from "../MealPlanner/MealPlanner";
import DropDown from "../Dropdown";
import DropDownItem from "../Dropdown/DropdownItem";
import { BsThreeDotsVertical } from "react-icons/bs";
import React from "react";
import { IMealEvent } from "../../Interface/userData";
import { CSSProperties } from "react";

const daysWeek = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mecredi",
  "Jeudi",
  "Vendredi",
  "Dimanche",
];

interface Props {
  e: any;
  mealEvent: IMealEvent;
  toClose: () => void;
}

const WindowMealEvent = ({ e, mealEvent, toClose }: Props) => {
  const [title, setTitle] = useState(mealEvent.title);
  const mealContext = useMealEventContext();

  //It is a Array with at first position year-month-day and second hours:minute:second...

  const dateValue = new Date(mealEvent.start);
  const day = daysWeek[dateValue.getDay()];
  const dayMonth = dateValue.getDate();
  const hours = dateValue.getHours();
  //e -> This is a mouse Event
  const posX = e.pageX;
  const posY = e.pageY - 50;
  const windowStyle: CSSProperties = {
    position: "absolute",
    top: `${posY}px`,
    left: `${posX}px`,
    transform: "translateX(-50%)",
    backgroundColor: "beige",
    zIndex: "10",
    padding: "20px",
  };

  const handleBlur = (e: React.FocusEvent<HTMLElement>): void => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    e.target.blur();
    //The setTimeout is for prevent the bug with click and blur event
  };

  const handleDelete = (): void => {
    if (!mealContext.delete) return;
    mealContext.delete(mealEvent);
    toClose();
  };

  useEffect((): void => {
    if (!mealContext.update) return;
    mealContext.update({ ...mealEvent, title });
  }, [title]);

  return (
    <>
      <div
        className="window-meal-event-container"
        style={windowStyle}
        tabIndex={0}
        onBlur={handleBlur}
      >
        <div className="window-meal-event-header">
          <button onClick={toClose} autoFocus>
            <AiOutlineClose />
          </button>
          <DropDown title={<BsThreeDotsVertical />}>
            <DropDownItem>
              <button onClick={handleDelete}>Delete</button>
            </DropDownItem>
          </DropDown>
        </div>
        <ContentEditable
          onBlur={(e) => setTitle(e.target.textContent)}
          tagName="h1"
        >
          {mealEvent.title}
        </ContentEditable>
        <p>
          le {day} {dayMonth} de {hours}-{mealEvent.duration}h
        </p>
      </div>
    </>
  );
};

export default WindowMealEvent;
