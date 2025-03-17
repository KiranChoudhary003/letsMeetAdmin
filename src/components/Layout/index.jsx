import React from "react"
import { Outlet } from "react-router-dom"
import Menu from "../Menu"
import Header from "../Header"
import Footer from "../Footer"
import Wrapper from "./style"

const Layout = () => {
    return (
        <Wrapper>
            <div className="home">
                <div className="heading">
                    <div className="menu">
                        <Menu />
                    </div>
                    <div className="main-content">
                        <div className="header">
                        <Header />
                        </div>
                        <div className="outlet">
                            <Outlet /> 
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </Wrapper>
    )
}

export default Layout
