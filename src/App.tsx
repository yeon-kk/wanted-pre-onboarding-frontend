import React, { useState } from 'react';
import './App.css';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Todo from './pages/todo';
import { useNavigate } from 'react-router-dom';

const SIGNUP_LABEL = '회원가입';
const SIGNIN_LABEL = '로그인';
const TODO_LABEL = 'TODO';
const SIGNUP_TEXT = 'signup';
const SIGNIN_TEXT = 'signin';
const TODO_TEXT = 'todo';
const SIGNUP_INDEX = 0;
const SIGNIN_INDEX = 1;
const TODO_INDEX = 2;
const ROUTE_SIGNUP = '/signup';
const ROUTE_SIGNIN = '/signin';
const ROUTE_TODO = '/todo';
const CLICKED_TEXT = 'clicked';

function App() {
  const [currentTab, setCurrentTab] = useState(SIGNIN_INDEX);
  const localStorage = window.localStorage;
  const navigate = useNavigate();

  const checkLocalStorage = () => {
    const access_token = localStorage.getItem('userInfo');
    if (access_token?.length) {
      return true;
    }
    return false;
  };
  const onTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    if (name === SIGNUP_TEXT) {
      if (checkLocalStorage()) {
        navigate(ROUTE_TODO);
        return;
      }
      setCurrentTab(SIGNUP_INDEX);
      return;
    }
    if (name === SIGNIN_TEXT) {
      if (checkLocalStorage()) {
        navigate(ROUTE_TODO);
        return;
      }
      setCurrentTab(SIGNIN_INDEX);
      return;
    }
    if (name === TODO_TEXT) {
      if (!checkLocalStorage()) {
        navigate(ROUTE_SIGNIN);
        return;
      }
      setCurrentTab(TODO_INDEX);
      return;
    }
  };

  return (
    <div className="App">
      <header className="App-header" />
      <article>
        <ul className="main-button-container">
          <li>
            <button
              onClick={onTabClick}
              name={SIGNIN_TEXT}
              type="button"
              className={`main-button ${
                currentTab === SIGNIN_INDEX && CLICKED_TEXT
              }`}
            >
              {SIGNIN_LABEL}
            </button>
          </li>
          <li>
            <button
              onClick={onTabClick}
              name={TODO_TEXT}
              type="button"
              className={`main-button ${
                currentTab === TODO_INDEX && CLICKED_TEXT
              }`}
            >
              {TODO_LABEL}
            </button>
          </li>
        </ul>
        {currentTab === SIGNUP_INDEX && <Signup />}
        {currentTab === SIGNIN_INDEX && <Signin />}
        {currentTab === TODO_INDEX && <Todo />}

        <button
          onClick={onTabClick}
          name={SIGNUP_TEXT}
          type="button"
          className={`main-button ${
            currentTab === SIGNUP_INDEX && CLICKED_TEXT
          }`}
        >
          {SIGNUP_LABEL}
        </button>
      </article>
    </div>
  );
}

export default App;
