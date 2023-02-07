import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const LoginPage = () => {

  const [showBox, setShowBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)

  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRePassword, setSignupRePassword] = useState('');

  const [signinUsername, setSigninUsername] = useState('');
  const [signinPassword, setSigninPassword] = useState('');

  const navigate = useNavigate();

  const onSignup = (e) => {
    setLoading(true);
    e.preventDefault();
    const option = {
      method: 'POST',
      body: JSON.stringify({
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
        passwordConfirm: signupRePassword
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    };

    fetch('https://music-pwa-api.iran.liara.run/api/users/sign-up', option)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
      })
  }

  const onSignin = (e) => {
    setLoading(true);
    e.preventDefault();
    const option = {
      method: 'POST',
      body: JSON.stringify({
        username: signinUsername,
        password: signinPassword
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    };

    fetch('https://music-pwa-api.iran.liara.run/api/users/sign-in', option)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        if (data?.error) {
          setErrorMessage(data?.message);
          setShowBox(true);
        }
        if (data.token) {
          const d = new Date();
          d.setTime(d.getTime() + (90 * 24 * 60 * 60 * 1000));
          let expires = "expires=" + d.toUTCString();
          document.cookie = `jwtToken=${data.token};${expires};path=/`;
          if (data.userRole === 'admin') {
            navigate('/adminprofile')
          } else if (data.userRole === 'user') {
            navigate('/userprofile')
          }
        }
      })

  }

  return (
    <div className='form-holder'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="main">
        <div className='error-box'>{showBox ? errorMessage : ''}</div>
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form>
            <label for="chk" className='form-label' aria-hidden="true">عضویت</label>
            <input type="text" className='form-input' onChange={(e) => { setSignupUsername(e.target.value) }} placeholder="نام کاربری" required="" />
            <input type="email" className='form-input' onChange={(e) => { setSignupEmail(e.target.value) }} placeholder="ایمیل" required="" />
            <input type="password" className='form-input' onChange={(e) => { setSignupPassword(e.target.value) }} placeholder="پسورد" required="" />
            <input type="password" className='form-input' onChange={(e) => { setSignupRePassword(e.target.value) }} placeholder="تکرار پسورد" required="" />
            <button className='form-button' onClick={(e) => onSignup(e)}>عضویت</button>
          </form>
        </div>

        <div className="login">
          <form>
            <label for="chk" className='form-label' aria-hidden="true">ورود</label>
            <input type="text" className='form-input' onChange={(e) => { setSigninUsername(e.target.value) }} placeholder="نام کاربری" required="" />
            <input type="password" className='form-input' onChange={(e) => { setSigninPassword(e.target.value) }} placeholder="پسورد" required="" />
            <button className='form-button' onClick={(e) => onSignin(e)}>ورود</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage