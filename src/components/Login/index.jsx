import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import rectangle from '../../assets/rectangle.png';
import Wrapper from './style';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admin-auth/login`, login);

            // Store token if needed
            localStorage.setItem('token', response.data.token);

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (error) {
            alert('Login failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <Wrapper>
            <div className='container'>
                <div className='login'>
                    <h1>Log In</h1>

                    <input
                        type="text"
                        placeholder="Enter Email"
                        value={login.email}
                        onChange={(e) => setLogin({ ...login, email: e.target.value })}
                    />

                    <div className='password-wrapper'>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={login.password}
                            onChange={(e) => setLogin({ ...login, password: e.target.value })}
                        />
                        <span onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>

                    <input
                        type="button"
                        value="Log in"
                        onClick={handleLogin}
                    />
                </div>

                <div className='image'>
                    <img src={rectangle} alt='rectangle' className='rectangle' />
                    <img src={logo} alt='logo' className='logo' />
                </div>
            </div>
        </Wrapper>
    );
};

export default Login;
