import React from 'react'
import loadingSvg from './loading.svg'
import './LoadingOval.css'
const LoadingOval = () => {
  return (
    <div className='loadingOvalContainer'>
        <img src={loadingSvg} className="loadingOvalSvg" />
        <h2 className='loadingTitle'>در حال بارگذاری اطلاعات</h2>
    </div>
  )
}

export default LoadingOval