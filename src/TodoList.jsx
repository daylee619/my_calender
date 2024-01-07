import React, { useState, useEffect } from "react";

// TodoList 클래스 정의
class TodoList {
  constructor(date) {
    this.date = date;
    this.todos = [];
  }
}

const TodoListContainer = ({ currentDate }) => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  let curTodoList;
  const DBLIST_KEY = "DBLISTS";
  const [DBLists, setDBLists] = useState([]);

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    const storedDBLists = localStorage.getItem(DBLIST_KEY);
    if (storedDBLists) {
      setDBLists(JSON.parse(storedDBLists));
    }
  }, []);

  // 새로운 Todo를 추가하는 함수
  const addNewTodo = (date, newTodo) => {
    // TodoList 클래스의 객체 생성
    curTodoList = new TodoList(date);
    curTodoList.todos.push(newTodo);
    // DBLists 상태 업데이트
    setDBLists([...DBLists, curTodoList]);
  };

  // input 값 변경 이벤트 핸들러
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  // 폼 제출 이벤트 핸들러
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (todo.trim() !== "") {
      setTodos([...todos, todo]);
      setTodo("");
    }

    // 새로운 Todo를 추가하고 로컬 스토리지에 저장
    addNewTodo(currentDate, todo);
    saveDbListInLocalStorage();
  };

  // 로컬 스토리지에 DBLists 저장
  const saveDbListInLocalStorage = () => {
    localStorage.setItem(DBLIST_KEY, JSON.stringify(DBLists));
  };

  return (
    <div>
      {/* 현재 날짜 표시 */}
      <p className="cur_date">일정 : {currentDate}</p>
      {/* 일정 등록 폼 */}
      <form className="todoForm" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="일정 등록"
          value={todo}
          onChange={handleInputChange}
        />
        <button type="submit">추가</button>
      </form>
      {/* 일정 목록 표시 */}
      <ul className="todolist">
        {todos.map((el, idx) => (
          <li key={idx}>{el}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListContainer;
