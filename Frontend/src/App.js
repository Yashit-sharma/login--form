// import './App.css';
// import React from 'react'
// import axios from 'axios'
// import { useState,useEffect } from 'react';
// export default function App() {
//   const [userName, setUserName] = useState('');
//   const [PassWord, setPassWord] = useState('');
//   const [Error, setError] = useState('')
//   const [Data, setData] = useState([]);
//   useEffect(() => {
//   const fetchData = async() =>{
//   try{
//     const Response = await axios.get('http://localhost:4000/users')
//     setData(Response.data)
//   }
//   catch(err){
//     console.log(err)
//   } 
//   }
//   fetchData();
//   }, [Data])

//   const axiosLogPost = async () =>{
//     try{
//       const LoginData = {
//         Email : userName,
//         Pass : PassWord
//       }
//       await axios.post('http://localhost:4000/loginData',LoginData)
//       .then(res=>setError(res.data.Message));
//     }
//     catch(err){
//       console.log(err);
//     }
//   }
//   const axiosPost = async () =>{
//     try{
//       const Data = {
//         User : userName,
//         Pass : PassWord
//       }
//       await axios.post('http://localhost:4000/usersData',Data)
//       .then(res => {
//         setError(res.data.Message)
//       });
//     }
//     catch(err){
//       setError(res=>res.data.Message);
//     }
//   }
//   const handleUserName = (e) =>{
//     setUserName(e.target.value);
//   }
//   const handlePassWord = (e) =>{
//     setPassWord(e.target.value);
//   }
//   const handleSubmitSign = () =>{
//     axiosPost();
//     setUserName('');
//     setPassWord('');
//   }
//   const handleSubmitLog = () =>{
//     axiosLogPost();
//     setPassWord('');
//   }
//   return (
//     <>
//     <div className="container form--div">
//     <input type="text" value={userName} className='form--input' placeholder='UserName : ' onChange={(e)=>{handleUserName(e)}}/>
//     <input type="text" value={PassWord} className='form--input' placeholder='PassWord : ' onChange={(e)=>{handlePassWord(e)}}/>
//     <div className='buttons'> 
//     <button className="btn btn-danger" type='submit' onClick={()=>{handleSubmitSign()}}>Sign In</button>
//     <button className="btn btn-success" type='submit' onClick={()=>{handleSubmitLog()}}>Log In</button>
//     </div>
//     <div>{Error}</div>
//     </div>
//     </>
//   )
// }

import React,{useState,useEffect,createContext} from 'react'
import Login from './Components/Login'
import {Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom';
import Home from './Components/Home';
export const AuthContext = createContext();
export default function App () {
  const [LoggedIn, setLoggedIn] = useState(()=>{
    const LocalData = JSON.parse(localStorage.getItem('Login'));
    return LocalData || false;
  });
  useEffect(() => {
    localStorage.setItem('Login', JSON.stringify(LoggedIn));
  }, [LoggedIn]);

  
  return (
    <>
     <AuthContext.Provider value={{LoggedIn,setLoggedIn}}>
    <Router>
    <>
      <Routes>
        <Route path='/' element=
        {<>
        {!LoggedIn ? 
        <Login LoginCheck={setLoggedIn}/>
        :
        <Navigate to={'/Home'}/>
        }
        </>
        }>
        </Route>
        <Route path='/Home' element=
        {<>
        {LoggedIn ? <Home /> 
        :
        <Navigate to={'/'}/>}
        </>
        }>
        </Route>
      </Routes>
    </>
    </Router>
    </AuthContext.Provider>
    </>
  )
}
