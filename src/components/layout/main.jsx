import React from 'react'
import Topbar from '../TopBar'
import NavBar from '../NavBar'
import Footer from '../Footer'

function MainLayout({ children }) {
  return (
    <>
    <Topbar />
    <NavBar />
    {children}
    <Footer />
    </>
  )
}

export default MainLayout