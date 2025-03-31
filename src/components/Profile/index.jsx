import React from 'react'
import Wrapper from './style'
import profile from '../../assets/Kiran1.jpg'
import { IoLogOut } from "react-icons/io5"

const Profile = () => {

    const adminProfileData = [
        {
            name: "Kiran Choudhary",
            email: "example@gmail.com"
        }
    ]

    return (
        <Wrapper>
            <div className='heading'>
                <h1>Profile</h1>
            </div>
            <div className='profile'>
                <div className='user-img'>
                    <img src={profile} alt='Profile' />
                </div>
                <div className='user-details'>
                    <h1>Name</h1>
                    <h2>{adminProfileData[0].name}</h2>
                    <h1>Email</h1>
                    <h2>{adminProfileData[0].email}</h2>
                    <div className='logout'>
                        <button><IoLogOut style={{ width: "30px", height: "30px" }} /> LogOut</button>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Profile