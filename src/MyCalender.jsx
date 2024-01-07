import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useRef, useState } from "react";

const MyCalender = ({ onDateChange, savedData }) => {
  const calendarRef = useRef(null);
  const [currentDate, setCurrentDate] = useState("");
  const handleDateClick = (arg) => {
    const calenderApi = calendarRef.current.getApi();
    const newEvent = {
      title: "스마트 조회",
      start: arg.date,
      allDay: true, // 시간이 없는 전일 이벤트로 설정
    };
    calenderApi.addEvent(newEvent);
    //console.log(arg.dateStr);
    setCurrentDate(arg.dateStr);
    onDateChange(arg.dateStr);
  };

  const handleEventClick = (e) => {
    const calendarApi = calendarRef.current.getApi();
    const eventId = e.event.id;
    calendarApi.getEventById(eventId).remove();
  };

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale="kr"
      headerToolbar={{
        left: "prev",
        center: "title",
        right: "next",
      }}
      selectable={true}
      dateClick={handleDateClick}
      events={[
        ...savedData.map((item) => ({
          id: item.date,
          start: item.date,
          title: item.data,
        })),
      ]}
      eventClick={handleEventClick}
    />
  );
};

export default MyCalender;
