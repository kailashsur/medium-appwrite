import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserAuthForm from '../pages/userAuthForm.page';
import { useNavigate } from 'react-router-dom';

export default function Authenticate({type}) {
    const navigate = useNavigate()
    let {status} = useSelector(({User})=> User);

    useEffect(()=>{
        if(status){
            navigate("/")
        }
    },[])
  
    if(!status){
        return (
          <UserAuthForm typeName={type} />
        )
    }
  }
  