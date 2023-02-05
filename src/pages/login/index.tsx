import { useNavigate } from 'react-router-dom';
import './login.css';
import Signin from '../signin';

const SIGNUP_LABEL = '회원가입';
const TODO_LABEL = 'TODO';
const SIGNUP_TEXT = 'signup';
const TODO_TEXT = 'todo';
const ROUTE_SIGNUP = '/signup';
const ROUTE_TODO = '/todo';

function Login() {
  const localStorage = window.localStorage;
  const navigate = useNavigate();
  const checkLocalStorage = () => {
    const access_token = localStorage.getItem('userInfo');
    if (access_token?.length) {
      return true;
    }
    return false;
  };

  const onSignupClick = () => {
    if (checkLocalStorage()) {
      navigate(ROUTE_TODO);
      return;
    }
    navigate(ROUTE_SIGNUP);
    return;
  };

  const onTodoClick = () => {
    if (checkLocalStorage()) {
      navigate(ROUTE_TODO);
      return;
    }
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
      <Signin />
      <button
        onClick={onSignupClick}
        name={SIGNUP_TEXT}
        type="button"
        className="home-button"
      >
        {SIGNUP_LABEL}
      </button>
    </div>
  );
}
export default Login;
