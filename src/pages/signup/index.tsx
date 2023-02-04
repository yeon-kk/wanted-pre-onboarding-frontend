import React, { useState } from 'react';
import './signup.css';

const SIGNUP_URL = 'https://pre-onboarding-selection-task.shop/auth/signup';

function Signup() {
  const [userInfo, setUserInfo] = useState({ email: '', password: '' });
  const handleChange =
    (target: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (target === 'email') {
        setUserInfo({ ...userInfo, email: e.target.value });
      }
      if (target === 'password') {
        setUserInfo({ ...userInfo, password: e.currentTarget.value });
      }
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
      // const { statusCode, message } = await response.json();
      const res = await response.json();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    await postData();
  };

  return (
    <div className="login-layout">
      <h2>회원가입</h2>
      <section className="login-container">
        <input
          className="login-input"
          value={userInfo.email}
          data-testid="email-input"
          onChange={handleChange('email')}
        />
        <input
          className="login-input"
          value={userInfo.password}
          data-testid="password-input"
          onChange={handleChange('password')}
        />
        <button type="submit" className="login-input" onClick={handleClick}>
          회원가입
        </button>
      </section>
    </div>
  );
}

export default Signup;
