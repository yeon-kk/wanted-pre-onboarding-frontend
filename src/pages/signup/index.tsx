import React, { useState } from 'react';
import './signup.css';

const SIGNUP_URL = 'https://pre-onboarding-selection-task.shop/auth/signup';
// const EMAIL_REGEX = /^[A-Za-z0-9]+@[A-Za-z]+\.+[A-Za-z]{2,3}$/;
const PASSWORD_MIN_LENGTH = 8;
const COMPARE_AT = '@';
const NOT_INCLUDE_INDEX = -1;
const NOT_INCLUDE_AT_MESSAGE = '이메일에 @를 포함해주세요';
const DIGIT_CONDITION_MESSAGE = '비밀번호는 8자리 이상으로 입력해주세요';
const SIGNUP_TITLE = '회원가입';
const EMAIL_TITLE = '이메일';
const PASSWORD_TITLD = '비밀번호';

function Signup() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const [emailConfirm, setEmailConfirm] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState(true);

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
    try {
      const response = await fetch(SIGNUP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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

  const handleClick = async () => {
    await postData();
  };

  return (
    <div className="login-layout">
      <h2>{SIGNUP_TITLE}</h2>
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
          className="login-input"
          onClick={handleClick}
          disabled={emailConfirm || passwordConfirm}
        >
          {SIGNUP_TITLE}
        </button>
      </section>
    </div>
  );
}

export default Signup;
