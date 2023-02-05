import { useNavigate } from 'react-router-dom';
import Signup from '../signup';

const SIGNIN_LABEL = '로그인';
const TODO_LABEL = 'TODO';
const SIGNIN_TEXT = 'signin';
const TODO_TEXT = 'todo';
const ROUTE_SIGNIN = '/signin';
const ROUTE_TODO = '/todo';

function Join() {
  const localStorage = window.localStorage;
  const navigate = useNavigate();
  const checkLocalStorage = () => {
    const access_token = localStorage.getItem('userInfo');
    if (access_token?.length) {
      return true;
    }
    return false;
  };

  const onSigninClick = () => {
    if (checkLocalStorage()) {
      navigate(ROUTE_TODO);
      return;
    }
    navigate(ROUTE_SIGNIN);
    return;
  };

  const onTodoClick = () => {
    if (checkLocalStorage()) {
      navigate(ROUTE_TODO);
      return;
    }
    navigate(ROUTE_SIGNIN);
    return;
  };

  return (
    <div className="login-layout-container">
      <button
        onClick={onTodoClick}
        name={TODO_TEXT}
        type="button"
        className="login-todo-button"
      >
        {TODO_LABEL}
      </button>
      <Signup />
      <button
        onClick={onSigninClick}
        name={SIGNIN_TEXT}
        type="button"
        className="home-button"
      >
        {SIGNIN_LABEL}
      </button>
    </div>
  );
}
export default Join;
