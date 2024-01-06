import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import UserNavigationPanel from './user-navigation.component';
import UserAuthForm from '../pages/userAuthForm.page';
import { statusTrue } from '../store/slices/featureSlice';

export default function Navbar() {

    let { status, userData } = useSelector(({ User }) => User);
    const [userNavPanel, setUserNavPanel] = useState(false);
    let dispatch = useDispatch();


    const handelUserNavPanel = (e)=>{
        setUserNavPanel(currVal => !currVal);
    }
    const handelBlur = ()=>{    // this function used to hide when click outside of the nav pannel
        setTimeout(()=>{
          setUserNavPanel(false)
        }, 200)

    }

    const handelGetStarted = (e)=>{
        e.preventDefault();
        dispatch(statusTrue())

    }

    return (
        <>

        <nav className=' w-screen h-20 border-b border-dark-grey/20 flex items-center justify-between px-6 md:px-52'>
            <Link to={"/"}>
                <i className="fi fi-brands-medium text-black text-4xl flex items-center"></i>
            </Link>

            <div className=' flex items-center gap-10'>
                {/* //search */}
                <button>
                    <i className="fi fi-rr-search text-2xl text-dark-grey flex items-center"></i>
                </button>

                {
                    status ?
                        <>
                            {/* //notification */}
                            <button className=''>
                                <i className="fi fi-rr-bell text-dark-grey text-2xl flex items-center"></i>
                            </button>

                            {/* //profile toggle */}
                            <div className='relative'
                                onClick={handelUserNavPanel}
                                onBlur={handelBlur}
                            >
                                <button className='w-10 h-10 mt-1'>
                                    <img src={status?userData.profile_img:""} className='w-full h-full object-cover rounded-full border-black' />
                                </button>

                                {
                                    userNavPanel ?
                                        <UserNavigationPanel />
                                        : ""
                                }
                            </div>
                        </>
                        :

                        <button className='btn-green'
                        onClick={handelGetStarted}
                        >
                            Get started
                        </button>

                }


            </div>
        </nav>



        </>
    )
}