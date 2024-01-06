import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import InputBox from '../components/input.component';
import { statusFalse } from '../store/slices/featureSlice';
import AnimationWrapper from '../common/page-animation';
import toast, { Toaster } from 'react-hot-toast';
import appwriteAuthService from '../appwrite/auth';
import { login } from '../store/slices/userSlice';


export default function UserAuthForm({ typeName }) {
    const [type, setType] = useState(typeName);
    let formElement = useRef();
    const navigate = useNavigate();
    let { authShow } = useSelector(({ AuthShow }) => AuthShow)
    let dispatch = useDispatch();
    let { status } = useSelector(({ User }) => User);

    const handelChangeAuthBtn = () => {
        type == 'sign-in' ? setType('sign-up') : setType('sign-in');
    }


    // The current route is available in the location object as location.pathname
    let {pathname} = useLocation();


    const handelSubmit = async (e) => {
        e.preventDefault();

        let loader = toast.loading(type == 'sign-up' ? "Creating account" : "Signing...");

        let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
        let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

        // form data
        let form = new FormData(formElement.current);
        let formData = {};

        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        let { fullname, email, password } = formData;


        if (fullname) {
            if (fullname.length < 3) {
                return toast.error("fullname must at least 3 letter long")
            }
        }
        if (!email.length) {
            return toast.error("Enter Email")
        }
        if (!emailRegex.test(email)) {
            return toast.error("Email is invalid")
        }
        if (!passwordRegex.test(password)) {
            return toast.error("Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters")
        }

        if (type == 'sign-up') {
            await appwriteAuthService.createAccount({ email, password, name: fullname })
                .then(userData => {
                    dispatch(login(userData))
                    toast.dismiss(loader)
                    toast.success("Login successful ✔");

                    navigate(pathname)
                })
                .catch(err => {
                    toast.dismiss(loader)
                    toast.error("Enter valid information")
                    // console.log("handelSubmit appwriteAuthService:: Signup :: Error", err);
                })
        }

        if (type == "sign-in") {
            appwriteAuthService.login({ email: email, password: password })
                .then((userData) => {
                    dispatch(login(userData))
                    toast.dismiss(loader)
                    toast.success("Login successful ✔")
                    navigate(pathname)

                })
                .catch(err => {
                    toast.dismiss(loader)
                    toast.error("Enter corect email and password")
                    // console.log("handelSubmit appwriteAuthService:: Login :: Error", err);
                })

        }
    };

    const handelClose = (e) => {
        e.preventDefault();
        dispatch(statusFalse())
    }


    return(
        <AnimationWrapper>
            <Toaster />
            <form ref={formElement} id='formElement' className=' z-50 w-full h-full fixed flex flex-col justify-center items-center bg-white/90 md:py-8  '>

                <div className=' relative bg-white w-full md:max-w-[678px] h-full px-10 py-52 md:rounded-md md:px-52 md:border md:border-grey md:shadow-sm'>
                    <button
                        onClick={handelClose}
                        className=' flex items-center absolute top-5 right-5 text-dark-grey hover:text-black p-2 rounded-full'>
                        <i className='fi fi-rr-cross flex items-center justify-center'></i>
                    </button>

                    <h1 className='capitalize text-center mb-24 '>
                        {type == "sign-in" ? "Welcome Back" : "Join us Today"}
                    </h1>

                    {
                        type != "sign-in" ?
                            <InputBox
                                name="fullname"
                                type="text"
                                placeholder="Full Name"
                                icon="fi-rr-user"
                            /> : ""
                    }
                    <InputBox
                        name="email"
                        type="email"
                        placeholder="Email"
                        icon="fi-rr-envelope"
                    />

                    <InputBox
                        name="password"
                        type="password"
                        placeholder="Password"
                        icon="fi-rr-key"
                    />

                    <button className='btn-dark center mt-14'
                        type='submit'
                        onClick={handelSubmit}
                    >continue
                    </button>

                    <div className=' text-dark-grey flex items-center justify-center mt-4'>
                        {
                            type == "sign-in" ? "Don't have an account ? " : "Alredy have an account ? "
                        }
                        <span className=' underline hover:text-black cursor-pointer'
                            onClick={handelChangeAuthBtn}
                        >
                            {
                                type == "sign-in" ? " signup" : " login "
                            }
                        </span>
                    </div>

                </div>

            </form>
        </AnimationWrapper>)
    // : navigate(pathname)
}
