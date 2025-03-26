import React from 'react'
import Wrapper from './style'
import { useLocation, useNavigate } from 'react-router-dom'

const Reports = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const basePath = location.pathname.split('/')[1]

  return (
    <Wrapper>
      <div className='container'>
        <div className='heading'>
          <h1>Reports & Analytics</h1>
        </div>
        <div>
          <div className='accordion'>
            <h2 onClick={() => { navigate(`/${basePath}/user-engagement`) }}>User Engagement Stats</h2>
          </div>
        </div>
        <div>
          <div className='accordion'>
            <h2 onClick={() => { navigate(`/${basePath}/event-analytics`) }}>Event Analytics</h2>
          </div>
        </div>
        <div>
          <div className='accordion'>
            <h2 onClick={() => { navigate(`/${basePath}/connection-trends`) }}>Connection Trends</h2>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Reports