import React from 'react'
import Header  from '../Header.jsx'
import { Outlet } from 'react-router-dom'
import  Footer  from '../Footer.jsx'

export const DefaultLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}
