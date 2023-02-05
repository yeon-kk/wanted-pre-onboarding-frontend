import { useState } from 'react';
import './todo.css';

const TODO_TITLE = 'TODO LIST';
const ADD_LABEL = '추가';
const MODIFY_LABEL = '수정';
const DELETE_LABEL = '삭제';

function Todo() {
  const [todoList, setTodoList] = useState<string[]>([]);
  const [createTodo, setCreateTodo] = useState('');

  const onCreateTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateTodo(e.currentTarget.value);
  };

  const handleAddButtonClick = () => {
    const tmpList = [...todoList];
    tmpList.push(createTodo);
    setTodoList([...tmpList]);
  };

  return (
    <div className="login-layout">
      <h4>{TODO_TITLE}</h4>
      <div>
        <input
          value={createTodo}
          className="todo-create-input"
          onChange={onCreateTodoChange}
          data-testid="new-todo-input"
        />
        <button
          data-testid="new-todo-add-button"
          type="button"
          onClick={handleAddButtonClick}
        >
          {ADD_LABEL}
        </button>
      </div>
      <ol>
        {todoList.map((value) => (
          <li>
            <label>
              <input type="checkbox" />
              <span>{value}</span>
            </label>
            <button type="button" data-testid="modify-button">
              {MODIFY_LABEL}
            </button>
            <button type="button" data-testid="delete-button">
              {DELETE_LABEL}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Todo;
