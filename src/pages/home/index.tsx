import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const SIGNUP_LABEL = '회원가입';
const SIGNIN_LABEL = '로그인';
const SIGNUP_TEXT = 'signup';
const SIGNIN_TEXT = 'signin';
const TODO_TEXT = 'todo';
const ROUTE_SIGNIN = '/signin';
const ROUTE_SIGNUP = '/signup';
const ROUTE_TODO = '/todo';
const WELCOME = 'Hello TODO!';

function Home() {
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
      navigate(ROUTE_SIGNUP);
      return;
    }
    if (name === SIGNIN_TEXT) {
      if (checkLocalStorage()) {
        navigate(ROUTE_TODO);
        return;
      }
      navigate(ROUTE_SIGNIN);
      return;
    }
    if (name === TODO_TEXT) {
      if (!checkLocalStorage()) {
        navigate(ROUTE_SIGNIN);
        return;
      }
      navigate(ROUTE_TODO);
      return;
    }
  };
  return (
    <div className="home-layout">
      <ul className="home-button-container">
        <li>
          <button
            onClick={onTabClick}
            name={SIGNIN_TEXT}
            type="button"
            className="home-button"
          >
            {SIGNIN_LABEL}
          </button>
        </li>
        <li>
          <button
            onClick={onTabClick}
            name={SIGNUP_TEXT}
            type="button"
            className="home-button"
          >
            {SIGNUP_LABEL}
          </button>
        </li>
      </ul>
      <div className="home-title">
        <h2>{WELCOME}</h2>
      </div>
    </div>
  );
}

export default Home;
