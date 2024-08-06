import React from 'react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li
      style={{
        textDecoration: todo.completed ? 'line-through' : 'none',
        cursor: 'pointer',
      }}
      onClick={() => onToggle(todo.id)}
    >
      {todo.text}
      <button onClick={(e) => {
        e.stopPropagation(); // 클릭 이벤트가 상위 요소로 전달되지 않도록 함
        onDelete(todo.id);
      }}>Delete</button>
    </li>
  );
}

export default TodoItem;
