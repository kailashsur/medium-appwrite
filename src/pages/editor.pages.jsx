import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageNotFound from './404.page'
import UserAuthForm from './userAuthForm.page'
import AnimationWrapper from '../common/page-animation'
import { statusTrue } from '../store/slices/featureSlice'

export default function Editor() {
  
    let {status}= useSelector(({User})=>User);
    const dispatch = useDispatch();
    
    if(status){
        return(
            <h1>Editor Page</h1>
            )
        }
        else{
            dispatch(statusTrue())
            
    }
}
