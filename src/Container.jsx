import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar.component'
import UserAuthForm from './pages/userAuthForm.page'
import { useSelector } from 'react-redux'
import AnimationWrapper from './common/page-animation'

export default function Container() {

  let { authShow } = useSelector(({AuthShow})=> AuthShow)
  let { status } = useSelector(({User})=>User);


  return (
    <AnimationWrapper>
        {
            authShow ? !status ? <UserAuthForm typeName={"sign-up"} />:null : null
        }
      <Navbar />
      <Outlet />
    </AnimationWrapper>
  )
}
