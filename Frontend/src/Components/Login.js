import '../App.css';
import React from 'react'
import axios from 'axios'
import { useState,useEffect,useContext } from 'react';
import { AuthContext } from '../App.js'
export default function Login() {
  const {setLoggedIn} = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [PassWord, setPassWord] = useState('');
  const [Error, setError] = useState('')
  const [Data, setData] = useState([]);
  const Disabled = !userName || !PassWord;

  useEffect(() => {
  const fetchData = async() =>{
  try{
    const Response = await axios.get('http://localhost:4000/users')
    setData(Response.data)
  }
  catch(err){
    console.log(err)
  } 
  }
  fetchData();
  }, [Data])

  const axiosLogPost = async () =>{
    try{
      const LoginData = {
        Email : userName,
        Pass : PassWord
      }
      await axios.post('http://localhost:4000/loginData',LoginData)
      .then(res=>{
        setError(res.data.Message)
        res.data.Bool ? setLoggedIn(true) : setLoggedIn(false)
    })
    }
    catch(err){
      console.log(err);
    }
  }
  const axiosPost = async () =>{
    try{
      const Data = {
        User : userName,
        Pass : PassWord
      }
      await axios.post('http://localhost:4000/usersData',Data)
      .then(res => {
        setError(res.data.Message)
      });
    }
    catch(err){
      setError(res=>res.data.Message);
    }
  }
  const handleUserName = (e) =>{
    setUserName(e.target.value);
  }
  const handlePassWord = (e) =>{
    setPassWord(e.target.value);
  }
  const handleSubmitSign = () =>{
    axiosPost();
    setUserName('');
    setPassWord('');
  }
  const handleSubmitLogIn = () =>{
    axiosLogPost();
    setPassWord('');
  }
  return (
    <>
    <div className="container form--div">
    <input type="text" value={userName} required={true} className='form--input' placeholder='User Name : ' onChange={(e)=>{handleUserName(e)}}/>
    <input type="text" value={PassWord} required={true} className='form--input' placeholder='Pass Word : ' onChange={(e)=>{handlePassWord(e)}}/>
    <div className='buttons'> 
    <button className="btn btn-danger" disabled={Disabled}  onClick={()=>{handleSubmitSign()}}>Sign In</button>
    <button className="btn btn-success" disabled={Disabled} onClick={()=>{handleSubmitLogIn()}}>Log In</button>
    </div>
    <div>{Error}</div>
    </div>
    </>
  )
}

