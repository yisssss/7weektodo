import React from "react";
import styles from "@/styles/TodoList.module.css"; //@>절대위치 바로 위의 위치입력 생략하게 해줌

const TodoItem = ({ todo, onToggle, onDelete, onHighlight }) => {
  const handleClick = () => {
    onHighlight(todo.id);
  };

  return (
    <li className={styles.todoItem}>
      <input type="checkbox" checked={todo.completed} onChange={onToggle} />
      <span
        className={styles.todoText}
        style={{
          textDecoration: todo.completed ? "line-through" : "none",
          fontWeight: todo.highlighted ? "bold" : "normal",
          color: todo.highlighted ? "red" : "inherit",
        }} //todo.completed가 참인 경우에는 "line-through"를, 거짓인 경우에는 "none"을 반환,
        //첫번째 중괄호는 JSX 문법 작성, 두번째 중괄호는 자바스크립트 객체 리터럴이라 사용
        //classname은 문자열 값 받는것, style은 객체값 받는 것이라 괄호 두개
      >
        {todo.text}
      </span>
      <button className={styles.addButton} onClick={onDelete}>
        🗑
      </button>
      <button className={styles.addButton} onClick={() => onHighlight(todo.id)}>
        🚨
      </button>
    </li>
  );
};

export default TodoItem;
//export default는 모듈에서 기본적으로 내보낼 값을 설정하는 데 사용, 이후 값변경이나 추가 가능
//한 모듈에서 하나의 값만 default 지정 가능
