import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './signin.css';

interface responseType {
  statusCode: number;
  message: string;
  error: string;
  access_token: string;
}

const SIGNIN_URL = 'https://pre-onboarding-selection-task.shop/auth/signin';
const PASSWORD_MIN_LENGTH = 8;
const COMPARE_AT = '@';
const NOT_INCLUDE_INDEX = -1;
const NOT_INCLUDE_AT_MESSAGE = '이메일에 @를 포함해주세요';
const DIGIT_CONDITION_MESSAGE = '비밀번호는 8자리 이상으로 입력해주세요';
const SIGNIN_TITLE = '로그인';
const EMAIL_TITLE = '이메일';
const PASSWORD_TITLD = '비밀번호';

function Signin() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [emailConfirm, setEmailConfirm] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState(true);
  const navigate = useNavigate();
  const localStorage = window.localStorage;

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInfo({ ...userInfo, email: value });
    emailCheck(value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInfo({ ...userInfo, password: value });
    passwordCheck(value);
  };

  const postData = async () => {
    let result = { statusCode: 0, message: '', error: '', access_token: '' };
    try {
      const response = await fetch(SIGNIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const res = await response.json();
      result = { ...result, ...res };
    } catch (error) {
      console.log(error);
    }
    return result;
  };
  const emailCheck = (value: string) => {
    if (value.indexOf(COMPARE_AT) === NOT_INCLUDE_INDEX) {
      setEmailConfirm(true);
      return;
    }
    setEmailConfirm(false);
  };

  const passwordCheck = (value: string) => {
    if (value.length < PASSWORD_MIN_LENGTH) {
      setPasswordConfirm(true);
      return;
    }
    setPasswordConfirm(false);
  };

  const checkRedirection = (result: responseType) => {
    if (result.access_token.length) {
      navigate('/todo');
      return true;
    }
    alert(result.message);
    return false;
  };

  const handleClick = async () => {
    const result = await postData();
    const access_token = checkRedirection(result) ? result.access_token : '';
    localStorage.setItem('userInfo', access_token);
  };

  return (
    <div className="login-layout">
      <section className="login-container">
        <h4>{EMAIL_TITLE}</h4>
        <span className="mention">{NOT_INCLUDE_AT_MESSAGE}</span>
        <input
          className="login-input"
          value={userInfo.email}
          data-testid="email-input"
          onChange={handleEmailChange}
        />
        <h4>{PASSWORD_TITLD}</h4>
        <div className="mention">{DIGIT_CONDITION_MESSAGE}</div>
        <input
          className="login-input"
          value={userInfo.password}
          data-testid="password-input"
          onChange={handlePasswordChange}
        />
        <button
          type="submit"
          className="login-button"
          onClick={handleClick}
          data-testid="signin-button"
          disabled={emailConfirm || passwordConfirm}
        >
          {SIGNIN_TITLE}
        </button>
      </section>
    </div>
  );
}

export default Signin;
