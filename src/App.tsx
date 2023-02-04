import React, { useState } from 'react';
import './App.css';
import Signin from './pages/signin';
import Signup from './pages/signup';

const SIGNUP_LABEL = '회원가입';
const SIGNIN_LABEL = '로그인';

function App() {
  const [currentTab, setCurrentTab] = useState(true);

  const onTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name;
    setCurrentTab(name === 'signin' ? true : false);
  };

  return (
    <div className="App">
      <header className="App-header" />
      <article>
        <ul className="main-button-container">
          <li>
            <button
              onClick={onTabClick}
              name="signup"
              type="button"
              className={`main-button ${currentTab ? '' : 'clicked'}`}
            >
              {SIGNUP_LABEL}
            </button>
          </li>
          <li>
            <button
              onClick={onTabClick}
              name="signin"
              type="button"
              className={`main-button ${currentTab ? 'clicked' : ''}`}
            >
              {SIGNIN_LABEL}
            </button>
          </li>
        </ul>
        {currentTab ? <Signin /> : <Signup />}
      </article>
    </div>
  );
}

export default App;
