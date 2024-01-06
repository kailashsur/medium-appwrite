import React from 'react'
import AnimationWrapper from '../common/page-animation'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import appwriteAuthService from '../appwrite/auth';
import { logout } from '../store/slices/userSlice';

export default function UserNavigationPanel() {
  const dispatch = useDispatch();

  let {status, userData:data} = useSelector(({User})=>User);

  const signOUtUser = async ()=>{
    let loader = toast.loading("Loading...")

    await appwriteAuthService.logout()
    .then(()=>{
        dispatch(logout())
        toast.dismiss(loader)
        toast.success("Sign Out ✔")
      
    })
    .catch(err =>{
      toast.dismiss(loader)
      toast.success(err)
      console.log(err);

    })
  }

  return (
    <AnimationWrapper className="absolute right-0 z-50"
    transition={ { duration: 0.2 } }>
      <Toaster/>

      <div className='bg-white absolute right-0 border border-grey w-60 duration-200 rounded-md '>

        <Link to='editor' className='flex gap-2 link md:hidden pl-8 py-4' >
          <i className='fi fi-rr-file-edit' ></i>        
          <p>Write</p>
        </Link>

        <Link to={`/user/${data.username}`} className='link  pl-8 py-4' >
          Profile
        </Link>
        <Link to={`/dashboard/blogs`} className='link  pl-8 py-4' >
          Dashboard
        </Link>
        <Link to={`/settings/edit-profile`} className='link  pl-8 py-4' >
          Settings
        </Link>

        <span className=' absolute border-t border-grey w-[100%] '></span>

        <button className='text-left p-4 hover:bg-grey w-full pl-8 py-4'
        onClick={signOUtUser}
        >
          <h1 className='font-bold text-xl mg-1'>Sign Out</h1>
          <p className=' text-dark-grey'>@{data.username}</p>
        </button>

      </div>

    </AnimationWrapper>
  )
}
