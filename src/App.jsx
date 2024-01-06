import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appwriteAuthService from "./appwrite/auth";
import { login, logout } from "./store/slices/userSlice";
import { Route, Routes } from 'react-router-dom'
import Container from "./Container";
import Navbar from "./components/navbar.component";
import Home from "./pages/home.page";
import UserAuthForm from "./pages/userAuthForm.page";



const App = () => {
    let dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            await appwriteAuthService.getCurrentUser()
            .then((user)=>{
                dispatch(login(user))
            })
            .catch(err=>{
                console.log(err);
            })
            
        }
        fetchData();
    }, [])


    let { status, userData } = useSelector(({ User }) => User);


    return (
        <Routes>
            <Route path="/" element={<Container />} >
                <Route index element={<Home />} />
                <Route path="test" element={<h1>Test page</h1>}/>

                {/* <Route path="/signin" element={<UserAuthForm type="sign-in" />} />
                <Route path="/signup" element={<UserAuthForm type="sign-up" />} /> */}

            </Route>

        </Routes>
    )
}

export default App;