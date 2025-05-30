import Wrapper from './style'
import { useNavigate, useLocation } from 'react-router-dom'
import { FaHome, FaUsers, FaCog, FaChartBar, FaShieldAlt, FaQrcode, FaLightbulb } from 'react-icons/fa'
import { MdEvent, MdPeople } from 'react-icons/md'
import { IoLogOut } from 'react-icons/io5'

const Menu = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const currentPath = location.pathname

    const handleChange = (path) => {
        navigate(path)
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/')
    }

    return (
        <Wrapper>
            <div className='menu-bar'>
                <div className='heading'>
                    <h1>Menu</h1>
                </div>
                <div className='content'>
                    <div className={`dashboard ${currentPath === '/dashboard' ? 'selected' : ''}`} onClick={() => handleChange('/')}>
                        <FaHome size={24} />
                        <span>Dashboard</span>
                    </div>

                    <div className={`usermanagement ${currentPath === '/userManagement' ? 'selected' : ''}`} onClick={() => handleChange('/userManagement')}>
                        <FaUsers size={24} />
                        <span>Users</span>
                    </div>

                    <div className={`eventMangement ${currentPath === '/eventManagement' ? 'selected' : ''}`} onClick={() => handleChange('/eventManagement')}>
                        <MdEvent size={24} />
                        <span>Events</span>
                    </div>

                    <div className={`attendeManagement ${currentPath === '/attendeeManagement' ? 'selected' : ''}`} onClick={() => handleChange('/attendeeManagement')}>
                        <MdPeople size={24} />
                        <span>Attendees</span>
                    </div>

                    <div className={`attendeeRole ${currentPath === '/attendeeRole' ? 'selected' : ''}`} onClick={() => handleChange('/attendeeRole')}>
                        <FaUsers size={24} />
                        <span>Attendee Roles</span>
                    </div>

                    <div className={`settings ${currentPath === '/settings' ? 'selected' : ''}`} onClick={() => handleChange('/settings')}>
                        <FaCog size={24} />
                        <span>Settings</span>
                    </div>

                    <div className={`reports ${currentPath === '/reports' ? 'selected' : ''}`} onClick={() => handleChange('/reports')}>
                        <FaChartBar size={24} />
                        <span>Reports</span>
                    </div>

                    <div className={`security ${currentPath === '/security' ? 'selected' : ''}`} onClick={() => handleChange('/security')}>
                        <FaShieldAlt size={24} />
                        <span>Security</span>
                    </div>

                    <div className={`qrCode ${currentPath === '/qrCode' ? 'selected' : ''}`} onClick={() => handleChange('/qrCode')}>
                        <FaQrcode size={24} />
                        <span>QR Code</span>
                    </div>

                    <div className={`aiRecommendation ${currentPath === '/aiRecommendation' ? 'selected' : ''}`} onClick={() => handleChange('/aiRecommendation')}>
                        <FaLightbulb size={24} />
                        <span>AI</span>
                    </div>

                    <div className='logout' onClick={handleLogout}>
                        <IoLogOut size={24} />
                        <span>LogOut</span>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Menu
