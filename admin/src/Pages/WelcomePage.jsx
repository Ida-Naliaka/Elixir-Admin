import React from 'react'
import { Link } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { verifyUser } from '../Components/AuthCode';

const WelcomePage = (url) => {
  url=window.location.href
 var splitUrl = url.split('/');
 const params= splitUrl[splitUrl.length-1]
 if(verifyUser(params)) {
  toast.success('Authentication Successful!')
 } else {
  toast.error('Authentication Failed!')

}
  return (
    <div style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        top:'30%'}}>
      <h2 style={{font:'20px'}}>
          Account confirmed!
      </h2>
      <Link to={"/"}>
        Please Login to Continue
      </Link>
      <ToastContainer position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"/>
    </div>
  )
}

export default WelcomePage