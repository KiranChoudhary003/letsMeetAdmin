import React from 'react'
import Wrapper from './style'
import { useNavigate } from 'react-router-dom'
import { FaHome, FaUsers, FaCog, FaChartBar, FaShieldAlt, FaQrcode, FaLightbulb } from 'react-icons/fa'
import { MdEvent, MdPeople } from 'react-icons/md'
import { IoLogOut } from 'react-icons/io5'

const Menu = () => {
    const navigate = useNavigate()

    const handleChange = (path) => {
        navigate(path)
    }

    const handleLogout = () => {
        // Clear user authentication data from localStorage/sessionStorage
        localStorage.removeItem('token')   // or any key where you saved auth token
        localStorage.removeItem('user')    // optional, clear user info if stored

        // Redirect user to login or home page
        navigate('/')  // change '/login' to wherever your login page is
    }

    return (
        <Wrapper>
            <div className='menu-bar'>
                <div className='heading'>
                    <h1>Menu</h1>
                </div>
                <div className='content'>
                    <div className='dashboard' onClick={() => handleChange('/')}>
                        <FaHome size={24} />
                        <span>Dashboard</span>
                    </div>
                    <div className='usermanagement' onClick={() => handleChange('/userManagement')}>
                        <FaUsers size={24} />
                        <span>Users</span>
                    </div>
                    <div className='eventMangement' onClick={() => handleChange('/eventManagement')}>
                        <MdEvent size={24} />
                        <span>Events</span>
                    </div>
                    <div className='attendeManagement' onClick={() => handleChange('/attendeeManagement')}>
                        <MdPeople size={24} />
                        <span>Attendees</span>
                    </div>
                    <div className='attendeeRole' onClick={() => handleChange('/attendeeRole')}>
                        <FaUsers size={24} />
                        <span>Attendee Roles</span>
                    </div>
                    <div className='settings' onClick={() => handleChange('/settings')}>
                        <FaCog size={24} />
                        <span>Settings</span>
                    </div>
                    <div className='reports' onClick={() => handleChange('/reports')}>
                        <FaChartBar size={24} />
                        <span>Reports</span>
                    </div>
                    <div className='security' onClick={() => handleChange('/security')}>
                        <FaShieldAlt size={24} />
                        <span>Security</span>
                    </div>
                    <div className='qrCode' onClick={() => handleChange('/qrCode')}>
                        <FaQrcode size={24} />
                        <span>QR Code</span>
                    </div>
                    <div className='aiRecommendation' onClick={() => handleChange('/aiRecommendation')}>
                        <FaLightbulb size={24} />
                        <span>AI</span>
                    </div>
                    <div className='logout' onClick={handleLogout}>
                        {/* <button onClick={handleLogout}> */}
                            <IoLogOut size={24}/> 
                            <span>LogOut</span>
                        {/* </button> */}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Menu
