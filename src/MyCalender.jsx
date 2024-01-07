import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React from "react";

const MyCalender = () => {
  const dateHandler = (arg) => {
    console.log(arg.dateStr);
  };
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale="kr"
      headerToolbar={{
        left: "prev",
        center: "title",
        right: "next",
      }}
      selectable={true}
      dateClick={dateHandler}
      events={
        [
          // 이벤트 배열 또는 데이터를 추가하세요.
        ]
      }
    />
  );
};

export default MyCalender;
