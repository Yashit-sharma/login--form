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
