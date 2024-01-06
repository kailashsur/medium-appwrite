import React from 'react'
import { useSelector } from 'react-redux'
import PageNotFound from './404.page'

export default function Editor() {
  
    let {status}= useSelector(({User})=>User)

    // status?
    return<h1>Editor Page</h1>
    // :
    // <
}
