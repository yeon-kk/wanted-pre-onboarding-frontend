import { useState } from 'react';
import './todo.css';

const TODO_TITLE = 'TODO LIST';
const ADD_LABEL = '추가';
const MODIFY_LABEL = '수정';
const DELETE_LABEL = '삭제';

interface todoType {
  todo: string;
  modify: boolean;
}

function Todo() {
  const [todoList, setTodoList] = useState<todoType[]>([]);
  const [createTodo, setCreateTodo] = useState('');
  const [modifyTodo, setModifyTodo] = useState('');

  const handleCreateTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateTodo(e.currentTarget.value);
  };

  const handleModifyTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifyTodo(e.currentTarget.value);
  };

  const handleAddButtonClick = () => {
    const tmpList = [...todoList];
    tmpList.push({ todo: createTodo, modify: false });
    setTodoList([...tmpList]);
    setCreateTodo('');
  };

  const handleDeleteClick = (index: number) => () => {
    const tmpList = [...todoList];
    tmpList.splice(index, 1);
    setTodoList([...tmpList]);
  };

  const handleModifyClick = (todo: string, index: number) => () => {
    const tmpList = [...todoList];
    const modified = {
      todo: todo,
      modify: true,
    };
    tmpList.splice(index, 1, modified);
    setTodoList([...tmpList]);
    setModifyTodo(todo);
  };

  const handleModifySbumitClick = (index: number, value: string) => () => {
    const tmpList = [...todoList];
    const modified = {
      todo: value,
      modify: false,
    };
    tmpList.splice(index, 1, modified);
    setTodoList([...tmpList]);
    setModifyTodo('');
  };

  const handleCancleClick = (index: number) => () => {
    const tmpList = [...todoList];
    const modified = {
      todo: tmpList[index].todo,
      modify: false,
    };
    tmpList.splice(index, 1, modified);
    setTodoList([...tmpList]);
  };

  return (
    <div className="login-layout">
      <h4>{TODO_TITLE}</h4>
      <div className="input-container">
        <input
          value={createTodo}
          className="todo-input"
          onChange={handleCreateTodoChange}
          data-testid="new-todo-input"
        />
        <button
          className="todo-button"
          data-testid="new-todo-add-button"
          type="button"
          onClick={handleAddButtonClick}
        >
          {ADD_LABEL}
        </button>
      </div>
      <ol className="todo-list-container">
        {todoList.map(({ todo, modify }, index) => (
          <li className="todo-container">
            <input type="checkbox" />
            {modify ? (
              <label className="todo-label">
                <input
                  className="todo-input"
                  value={modifyTodo}
                  onChange={handleModifyTodoChange}
                ></input>
                <div className="todo-button-container">
                  <button
                    type="button"
                    className="todo-button"
                    onClick={handleModifySbumitClick(index, modifyTodo)}
                  >
                    제출
                  </button>
                  <button
                    className="todo-button"
                    type="button"
                    onClick={handleCancleClick(index)}
                  >
                    취소
                  </button>
                </div>
              </label>
            ) : (
              <label className="todo-label">
                <div className="todo-content">{todo}</div>
                <div className="todo-button-container">
                  <button
                    className="todo-button"
                    type="button"
                    data-testid="modify-button"
                    onClick={handleModifyClick(todo, index)}
                  >
                    {MODIFY_LABEL}
                  </button>
                  <button
                    className="todo-button"
                    type="button"
                    data-testid="delete-button"
                    onClick={handleDeleteClick(index)}
                  >
                    {DELETE_LABEL}
                  </button>
                </div>
              </label>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Todo;
