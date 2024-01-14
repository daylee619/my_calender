import React, { useState } from "react";
import Modal from "react-modal";

const PopupModal = ({ onSave, closeModal, data, date }) => {
  const [inputData, setInputData] = useState("");
  const [selectedDate, setSelectedDate] = useState(""); // 선택된 날짜 상태 추가
  const handleInputChange = (e) => {
    setInputData(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleSave = () => {
    onSave({ date: selectedDate, data: inputData });
    console.log(selectedDate);
    closeModal();
  };

  return (
    <div>
      <Modal
        isOpen={true}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {" "}
        {data ? (
          <>
            <h2>{date}의 일정</h2>
            <p>일정 : {data}</p>
          </>
        ) : (
          <>
            <label htmlFor="datePicker">날짜 선택:</label>
            <h2>일정 추가</h2>
            <input
              id="datePicker"
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <input
              type="text"
              placeholder="입력하세요"
              value={inputData}
              onChange={handleInputChange}
            />
            <button onClick={handleSave}>저장</button>
          </>
        )}
        <button onClick={closeModal}>취소</button>
      </Modal>
    </div>
  );
};

export default PopupModal;
