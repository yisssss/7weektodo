import React, { useState } from "react"; //useState훅: 상태 관리 함수, 초기화시키는역할
import TodoItem from "@/components/TodoItem";
import styles from "@/styles/TodoList.module.css";

const ToodList = () => {
  //함수형 컴포넌트
  const [todos, setTodos] = useState([]); //초기값을 각각 빈배열
  const [input, setInput] = useState(""); //빈문자열로 설정. input은 상태(내생각엔 변수랑 비슷한의미인듯)고 setInput은 함수임
  const addTodo = () => {
    if (input.trim() === "") return; // 입력값이 비어있는 경우 함수를 종료, 비어있지 않은 경우 밑에 변수 실행
    setTodos([
      ...todos,
      { id: Date.now(), text: input, completed: false, highlighted: false },
    ]);
    //...연산자: spread 문법, 배열이나 객체의 요소를 펼쳐서 가져옴, 기존 배열을 새로운 배열에 모두 포함시켜 가져옴
    //id: Date.now id 속성에 현재 시간값 할당
    setInput(""); //입력창 비우기
  };

  const toggleTodo = (id) => {
    setTodos(
      //밑의 상태를 사용하여 컴포넌트를 다시 렌더링함
      todos.map((todo) => {
        return todo.id === id ? { ...todo, completed: !todo.completed } : todo; //id 동일하면 completed반전, 아닐시 그대로 반환
      })
    );
  }; //불변성을 유지하는 방식임, 원본데이터 변경 없이 새로운 데이터를 생성하여 업데이트하기 때문, 애플리케이션을 예측가능하게 만들어줌

  const deleteTodo = (id) => {
    setTodos(
      todos.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const highlightTodo = (id) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? { ...todo, highlighted: !todo.highlighted }
          : todo;
      })
    );
  };

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <input //이거 입력창임
        type="text"
        className={styles.itemInput}
        value={input}
        onChange={(e) => setInput(e.target.value)} //이벤트 핸들러, 입력한 값을 input상태값으로 업데이트 해줌, e가 관례적인 이벤트 객체 이름
      />
      <button className={styles.addButton} onClick={addTodo}>
        ➕
      </button>
      <ul>
        {todos.map(
          (
            todo //ul은 순서없는 목록태그, 이 안의 항목이 li로 표시됨
          ) => (
            <TodoItem
              key={todo.id} //react 인식 식별자, 엘리먼트에만 필요함
              todo={todo}
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              onHighlight={() => highlightTodo(todo.id)}
            />
          )
        )}
      </ul>
    </div>
  );
  console.log(todos);
};
export default ToodList;
