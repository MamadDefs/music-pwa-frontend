import React, { useState } from 'react'

const LoginForm = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const usernameChange = (e) => {
    setUsername(e.target.value);
  }

  const passwordChange = (e) => {
    setPassword(e.target.value);
  }

  const onClick = () => {

    const option = {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    };

    fetch('https://music-pwa-api.iran.liara.run/api/users/sign-in', option)
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          const d = new Date();
          d.setTime(d.getTime() + (90 * 24 * 60 * 60 * 1000));
          let expires = "expires=" + d.toUTCString();
          document.cookie = `jwtToken=${data.token};${expires};path=/`;
          if (data.userRole === 'admin') {
            location.replace('/adminprofile');
          } else if (data.userRole === 'user') {
            location.replace('/userprofile');
          }
        }

      })


  }


  return (
    <div className='form-holder'>
      <form >
        <input type="text" placeholder="نام کاربری" onChange={(e) => usernameChange(e)} value={username} />
        <input type="password" placeholder="رمز عبور" onChange={(e) => passwordChange(e)} value={password} />
      </form>
      <button type="submit" className='form-btn' onClick={onClick}>ورود</button>
    </div>
  )
}

export default LoginForm