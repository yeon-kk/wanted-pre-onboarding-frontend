import { useEffect, useState } from 'react';
import './todo.css';

const TODO_TITLE = 'TODO LIST';
const ADD_LABEL = '추가';
const MODIFY_LABEL = '수정';
const DELETE_LABEL = '삭제';
const SUBMIT_TEXT = '제출';
const CANCEL_TEXT = '취소';
const TODOLIST_URL = 'https://pre-onboarding-selection-task.shop/todos';

interface todoType {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

function Todo() {
  const [todoList, setTodoList] = useState<todoType[]>([]);
  const [createTodo, setCreateTodo] = useState('');
  const [modifyTodo, setModifyTodo] = useState<string>('');
  const [modifyList, setModifyList] = useState<boolean[]>([]);
  const localStorage = window.localStorage;

  const getTodos = async () => {
    try {
      const response = await fetch(TODOLIST_URL, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userInfo')}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const postCreateTodo = async (data = {}) => {
    try {
      const response = await fetch(TODOLIST_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userInfo')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const putUpdateTodo = async (id: number, data = {}) => {
    try {
      const response = await fetch(`${TODOLIST_URL}/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userInfo')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`${TODOLIST_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userInfo')}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }
    return;
  };

  const handleCreateTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateTodo(e.currentTarget.value);
  };

  const handleModifyTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setModifyTodo(e.currentTarget.value);
  };

  const handleAddButtonClick = () => {
    const tmpList = [...todoList];
    tmpList.push({
      id: tmpList.length + 1,
      todo: createTodo,
      isCompleted: false,
      userId: 1,
    });
    const tmpModify = [...modifyList];
    tmpModify.push(false);
    setModifyList([...tmpModify]);
    setTodoList([...tmpList]);
    postCreateTodo({ todo: createTodo });
    setCreateTodo('');
  };

  const handleDeleteClick = (index: number) => () => {
    const tmpList = [...todoList];
    const id = tmpList[index].id;
    tmpList.splice(index, 1);
    setTodoList([...tmpList]);
    deleteTodo(id);
  };

  const handleModifyClick = (todo: string, index: number) => () => {
    const tmpModify = [...modifyList];
    tmpModify[index] = true;
    setModifyList([...tmpModify]);
    setModifyTodo(todo);
  };

  const handleModifySbumitClick =
    (index: number, todo: string, isCompleted: boolean) => () => {
      const tmpList = [...todoList];
      const modified = {
        ...tmpList[index],
        todo,
        isCompleted,
      };
      tmpList.splice(index, 1, modified);
      setTodoList([...tmpList]);
      const tmpModify = [...modifyList];
      tmpModify[index] = false;
      setModifyList([...tmpModify]);
      setModifyTodo('');
      putUpdateTodo(modified.id, { todo, isCompleted });
    };

  const handleCancleClick = (index: number) => () => {
    const tmpModify = [...modifyList];
    tmpModify[index] = false;
    setModifyList([...tmpModify]);
    setModifyTodo('');
  };

  const handleCompletedChange = (isCompleted: boolean, index: number) => () => {
    const tmpList = [...todoList];
    const modified = {
      ...tmpList[index],
      isCompleted: !isCompleted,
    };
    tmpList.splice(index, 1, modified);
    setTodoList([...tmpList]);
    putUpdateTodo(modified.id, {
      todo: modified.todo,
      isCompleted: modified.isCompleted,
    });
  };

  const initTodos = async () => {
    const todos = await getTodos();
    setTodoList([...todos]);
    const arr = todos.map(() => false);
    setModifyList([...arr]);
  };

  useEffect(() => {
    initTodos();
  }, []);

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
        {todoList.map(({ todo, isCompleted }, index) => (
          <>
            {modifyList && modifyList[index] ? (
              <li className="todo-container">
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleCompletedChange(isCompleted, index)}
                  />
                  <input
                    className="todo-input"
                    data-testid="modify-input"
                    value={modifyTodo}
                    onChange={handleModifyTodoChange}
                  ></input>
                </label>
                <div className="todo-button-container">
                  <button
                    type="button"
                    className="todo-button"
                    data-testid="submit-button"
                    onClick={handleModifySbumitClick(
                      index,
                      modifyTodo,
                      isCompleted
                    )}
                  >
                    {SUBMIT_TEXT}
                  </button>
                  <button
                    className="todo-button"
                    type="button"
                    onClick={handleCancleClick(index)}
                  >
                    {CANCEL_TEXT}
                  </button>
                </div>
              </li>
            ) : (
              <li className="todo-container">
                <label className="todo-label">
                  <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={handleCompletedChange(isCompleted, index)}
                  />
                  <span className="todo-content">{todo}</span>
                </label>
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
              </li>
            )}
          </>
        ))}
      </ol>
    </div>
  );
}

export default Todo;
