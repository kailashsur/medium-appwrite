import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appwriteAuthService from "./appwrite/auth";
import { login, logout } from "./store/slices/userSlice";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Container from "./Container";
import Navbar from "./components/navbar.component";
import Home from "./pages/home.page";
import UserAuthForm from "./pages/userAuthForm.page";
import Editor from "./pages/editor.pages";
import Authenticate from "./common/authenticate.common";



const App = () => {
    let dispatch = useDispatch();
    let {pathname} = useLocation()
    const navigate = useNavigate();

    async function fetchData() {
        await appwriteAuthService.getCurrentUser()
            .then((user) => {
                dispatch(login(user))
            })
            .catch(err => {
                console.log(err);
            })

    }
    useEffect(() => {
        let cookieFallback = JSON.parse(localStorage.getItem('cookieFallback'));

        if (cookieFallback && cookieFallback.length != 0) {
            fetchData();
        }


    }, [])


    let { status, userData } = useSelector(({ User }) => User);


    return (
        <Routes>
            <Route path="/signin" element={<Authenticate type="sign-in" />} />
            <Route path="/signup" element={<Authenticate type="sign-up" />} />
            <Route path="/" element={<Container />} >
                <Route index element={<Home />} />


                <Route path="/write" element={<Editor />} />
                <Route path="/dashboard" element={status ? <h1>Dashboard</h1> : <h1>Not loged in</h1>} >

                </Route>
            </Route>

        </Routes>
    )
}

export default App;