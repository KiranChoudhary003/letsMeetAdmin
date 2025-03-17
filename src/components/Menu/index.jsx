import React from 'react'
import Wrapper from './style'
import { useNavigate } from 'react-router-dom'
import { FaHome, FaUsers, FaCog, FaChartBar, FaShieldAlt, FaQrcode, FaLightbulb } from 'react-icons/fa'
import { MdEvent, MdPeople } from 'react-icons/md'

const Menu = () => {
    const navigate = useNavigate()

    const handleChange = (path) => {
        navigate(path)
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
                        <span>User Management</span>
                    </div>
                    <div className='eventMangement' onClick={() => handleChange('/eventManagement')}>
                        <MdEvent size={24} />
                        <span>Event Management</span>
                    </div>
                    <div className='attendeManagement' onClick={() => handleChange('/attendeeManagement')}>
                        <MdPeople size={24} />
                        <span>Attendee & Connection Management</span>
                    </div>
                    <div className='userRole' onClick={() => handleChange('/userRole')}>
                        <FaUsers size={24} />
                        <span>User Role Management</span>
                    </div>
                    <div className='settings' onClick={() => handleChange('/settings')}>
                        <FaCog size={24} />
                        <span>Settings</span>
                    </div>
                    <div className='reports' onClick={() => handleChange('/reports')}>
                        <FaChartBar size={24} />
                        <span>Reports & Analytics</span>
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
                        <span>AI Recommendation for Connection in Each Event</span>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Menu
