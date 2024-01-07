import MyCalender from "./MyCalender";
import TodoList from "./TodoList.jsx";
import React, { useEffect, useState } from "react";
import "./css/App.css";
import Modal from "react-modal";
import PopupModal from "./PopupModal";
function App() {
  const [currentDate, setCurrentDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedData, setSavedData] = useState([]); // 저장된 데이터를 관리하는 상태 변수
  useEffect(() => {
    // App 컴포넌트가 마운트될 때 실행되어 모달의 앱 요소를 설정
    Modal.setAppElement("#root");
  }, []);
  const handleDateChange = (date) => {
    setCurrentDate(date);
  };
  const openModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSave = ({ date, data }) => {
    // 저장된 데이터 처리 (예: 상태 변수에 저장)
    setSavedData((prevSavedData) => [...prevSavedData, { date, data }]);
    // 필요한 작업 수행
    // ...
  };
  return (
    <div className="container">
      <div className="calender">
        <MyCalender onDateChange={handleDateChange} savedData={savedData} />
      </div>
      <div className="button_container">
        <button onClick={openModal}>+일정게시</button>
      </div>
      <div className="todo_container">
        <TodoList currentDate={currentDate} />
      </div>

      {isModalOpen && (
        <PopupModal onSave={handleSave} closeModal={closeModal} />
      )}
      {/* 저장된 데이터 활용 예시 */}
      {savedData && (
        <div>
          Saved Data:{" "}
          <ul>
            {savedData.map((item, index) => (
              <li key={index}>
                Date: {item.date}, Data: {item.data}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
