import React from 'react'
import { AuthContext } from '../App.js'
import { useContext } from 'react';
import { Link } from 'react-router-dom'

export default function Home()
{
  const {setLoggedIn} = useContext(AuthContext);
  return (
    <>
    <div className="home">Hello and Welcome to the Home Page</div>
    <Link to={'/'}><button className="btn btn-success" onClick={()=>setLoggedIn(false)}>Log out</button></Link>
    </>
  )
}
