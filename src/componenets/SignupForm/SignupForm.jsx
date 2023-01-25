import React,{useState} from 'react'

const SignupForm = () => {
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [passwordConfirm,setPasswordConfirm]=useState('');
    
    const usernameChange=(e)=>{
      setUsername(e.target.value);
    }
    const emailChange=(e)=>{
      setEmail(e.target.value);
    }
    
    const passwordChange=(e)=>{
      setPassword(e.target.value);
    }
    const confirmPasswordChange=(e)=>{
      setPasswordConfirm(e.target.value);
    }
  
  
    const onClick=()=>{
      
      const option = {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password,
          passwordConfirm
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      };
  
      fetch('https://music-pwa-api.iran.liara.run/api/users/sign-up',option)
      .then((res)=> res.json())
      .then((data)=>{
        console.log(data);
      })
    
      
    }
    
    return (
      <>
        <form>
            <input type='text' placeholder='نام کاربری' onChange={(e)=>usernameChange(e)} />
            <input type='email' placeholder='ایمیل' onChange={(e)=>emailChange(e)} />
            <input type='password' placeholder='رمز عبور' onChange={(e)=>passwordChange(e)} />
            <input type='password' placeholder='تکرار رمز عبور' onChange={(e)=>confirmPasswordChange(e)}/>
        </form>
        <button type='submit' className='form-btn' onClick={onClick} value='submit'>ثبت نام</button>
      </>
    )
}

export default SignupForm