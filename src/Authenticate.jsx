import React from 'react'
import { useSelector } from 'react-redux'
import UserAuthForm from './pages/userAuthForm.page'
import { Outlet } from 'react-router-dom'

export default function Authenticate() {
    let {status} = useSelector(({User})=> User)

  status ?
  <Outlet/>
  : <UserAuthForm typeName="sign-in" />
}
