import React, { useEffect } from 'react'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom";
import MainLayout from './layout/MainLayout';
import AuthLayout from './layout/AuthLayout'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login'
import Categories from "./pages/Categories"
import Profile from './pages/Profile';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';
import AddPodcast from './pages/AddPodcast';
import AllPodcasts from './pages/AllPodcasts';


const App = () => {
 const dispatch =   useDispatch();
useEffect(()=>{
  const fetch = async () =>{
    try{
    const res = await axios.get("http://localhost:1000/api/v1/check-cookie",
      {withCredentials:true}
    );
      if(res.data.message == true){
        dispatch(authActions.login());
      }
    }
    catch(error){
   // console.log(res);
    }
  };
  fetch();
},[]);


  return (
    <div className = ''>
      <Router>
      <Routes>
      <Route path = '/' element={<MainLayout/>}>
        {" "}
        <Route index element={<Home/>}/>
        <Route path = "/categories" element={<Categories/>}/>
        <Route path = "/profile" element={<Profile/>}/>
        <Route path = "/add-podcasts" element={<AddPodcast/>}/>
        <Route path = "/all-podcasts" element={<AllPodcasts/>}/>
      </Route>
      <Route path = "/" element={<AuthLayout/>}>
        <Route path="/signup" element = {<Signup />} />
        <Route path="/login" element = {<Login />} />
      </Route>
       
        </Routes>
      </Router>
    </div>
  )
}

export default App

