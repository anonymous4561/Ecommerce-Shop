import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import { login } from '../redux/apiCalls';

export const Login = () => {
    const dispatch = useDispatch();
    const [username,setUsername] =useState("");
    const [password,setPassword] =useState("");
    const handleClick = (e)=>{
        e.preventDefault();
        login(dispatch,{username,password});
    }
  return (
    <div  style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <input style={{ padding: 10, marginBottom: 20 }} name="username" type='text' onChange={e=>setUsername(e.target.value) } placeholder='Username' />
        <input name="password" type='password' style={{ padding: 10, marginBottom: 20 }} onChange={e=>setPassword(e.target.value)} placeholder='Password' />
        <button style={{ padding: 10, width:100 }} onClick={handleClick}>LOGIN</button>
    </div>
  )
}
