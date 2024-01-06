import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appwriteAuthService from "./appwrite/auth";
import { login, logout } from "./store/slices/userSlice";
import { Route, Routes } from 'react-router-dom'
import Container from "./Container";
import Navbar from "./components/navbar.component";
import Home from "./pages/home.page";
import UserAuthForm from "./pages/userAuthForm.page";
import Authenticate from "./Authenticate";
import Editor from "./pages/editor.pages";



const App = () => {
    let dispatch = useDispatch();

    async function fetchData() {
        await appwriteAuthService.getCurrentUser()
        .then((user)=>{
            dispatch(login(user))
        })
        .catch(err=>{
            console.log(err);
        })
        
    }
    useEffect(() => {
        let cookieFallback = JSON.parse(localStorage.getItem('cookieFallback'));

        if(cookieFallback && cookieFallback.length != 0){
            fetchData();
        }
        

    }, [])


    let { status, userData } = useSelector(({ User }) => User);


    return (
        <Routes>
            <Route path="/" element={<Container />} >
                <Route index element={<Home />} />

                <Route path="/dashboard" element={status?<h1>Dashboard</h1>:<h1>Not loged in</h1>} >
                    <Route path="write" element={<Editor/>} />

                </Route>
            </Route>

        </Routes>
    )
}

export default App;