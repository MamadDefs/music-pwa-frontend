
import React, { useEffect } from 'react'
import { fetchAction } from './fetchAction/fetchAction';
const App = () => {
  
  useEffect(()=>{
    fetchAction();
  },[]);

  return (
    <div>App</div>
  )
}

export default App