import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React, { useRef, useState } from "react";
import PopupModal from "./PopupModal";

const MyCalender = ({ onDateChange, savedData, data }) => {
  const calendarRef = useRef(null);
  const [currentDate, setCurrentDate] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDateClick = (arg) => {
    const calenderApi = calendarRef.current.getApi();
    setCurrentDate(arg.dateStr);
    // const eventData = savedData.find((item) => item.date === arg.dateStr);
    const eventData = savedData.find((item) => item.date === arg.dateStr);
    if (eventData) {
      setSelectedData(eventData);
      openModal();
    } else {
      const newEvent = {
        title: "스마트 조회",
        start: arg.date,
        allDay: true, // 시간이 없는 전일 이벤트로 설정
      };
      calenderApi.addEvent(newEvent);
      onDateChange(arg.dateStr);
    }

    //console.log(arg.dateStr);
  };

  const handleEventClick = (e) => {
    const clickedEventId = e.event.id;
    const clickedEventData = savedData.find(
      (item) => item.date === clickedEventId
    );
    setSelectedData(clickedEventData);
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
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
            /*title: item.data,*/
            title: "스마트조회",
          })),
        ]}
        eventClick={handleEventClick}
      />
      {isModalOpen && (
        <PopupModal
          date={selectedData ? selectedData.date : currentDate}
          data={selectedData ? selectedData.data : ""}
          closeModal={closeModal}
        />
      )}
    </>
  );
};

export default MyCalender;
