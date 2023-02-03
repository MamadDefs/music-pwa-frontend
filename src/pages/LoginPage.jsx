import React, { useState, useEffect } from 'react'
import LoginForm from '../componenets/LoginForm/LoginForm';
import SignupForm from '../componenets/SignupForm/SignupForm';


const LoginPage = () => {


  const [isLogin, setIsLogin] = useState(true);

  function login_onclick() {
    setIsLogin(true);
    loginBtnStyle = clickedStyle;
    signupBtnStyle = notClickedStyle;
  }

  function signup_onclick() {
    setIsLogin(false);
    loginBtnStyle = notClickedStyle;
    signupBtnStyle = clickedStyle;
  }

  return (
    <div id="page-content-holder">
      <div className="form-changer">
        <div className="login-btn" style={loginBtnStyle} onClick={login_onclick}>ورود</div>
        <div className="signup-btn" style={signupBtnStyle} onClick={signup_onclick} >ثبت نام</div>
      </div>
      <div className="signupin">
        <div className="form-holder">
          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
}

const clickedStyle = {
  borderBottom: 'solid rgba(0, 0, 0, 0.8)'
}
const notClickedStyle = {
  borderBottom: 'solid rgba(0, 0, 0, 0.2)'
}

let loginBtnStyle = {
}
let signupBtnStyle = {
}

export default LoginPage