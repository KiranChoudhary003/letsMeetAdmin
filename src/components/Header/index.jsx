import React from 'react'
import Wrapper from './style'
import profile from '../../assets/Profile.png'

const Header = () => {
  return (
    <Wrapper>
      <div className='header'>
        <h1>Let's Meet Admin</h1>
        <img src={profile} alt="Profile" /></div>
    </Wrapper>
  )
}

export default Header
