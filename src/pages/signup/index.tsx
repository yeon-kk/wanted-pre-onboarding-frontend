import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';

interface responseType {
  statusCode: number;
  message: string;
  error: string;
  access_token: string;
}

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
  const navigate = useNavigate();

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
      const response = await fetch(SIGNUP_URL, {
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
      navigate('/signin');
      return;
    }
    alert(result.message);
  };

  const handleClick = async () => {
    const result = await postData();
    checkRedirection(result);
  };

  return (
    <div className="login-layout">
      <section className="login-container">
        <h4>{EMAIL_TITLE}</h4>
        <span className="mention">{NOT_INCLUDE_AT_MESSAGE}</span>
        <input
          className="signup-input"
          value={userInfo.email}
          data-testid="email-input"
          onChange={handleEmailChange}
        />
        <h4>{PASSWORD_TITLD}</h4>
        <div className="mention">{DIGIT_CONDITION_MESSAGE}</div>
        <input
          className="signup-input"
          value={userInfo.password}
          data-testid="password-input"
          onChange={handlePasswordChange}
        />
        <button
          type="submit"
          className="signup-button"
          onClick={handleClick}
          data-testid="signup-button"
          disabled={emailConfirm || passwordConfirm}
        >
          {SIGNUP_TITLE}
        </button>
      </section>
    </div>
  );
}

export default Signup;
