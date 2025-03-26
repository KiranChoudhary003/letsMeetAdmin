import React, { useState } from 'react'
import Wrapper from './style'
import { ToggleSlider } from 'react-toggle-slider'
const Settings = () => {

  const [toggleAction, setToggleAction] = useState(false)
  const [distance, setDistance] = useState("")

  const handleToggleAction = () => {
    setToggleAction((prev) => !prev)
  }

  const handleAlert = () => {
    alert(`Successfully Saved!`)
  }

  return (
    <Wrapper>
      <div className="container">
        <h1>Settings</h1>
          <div className="settings">
            <div className='connection-request'>
              <h2>Connection Request</h2>
              <div className='toggleSlider'>
                <ToggleSlider onToggle={handleToggleAction} active={toggleAction} />
              </div>
              <p>{toggleAction ? "Approved" : "Denied"}</p>
            </div>
            <div className='distance'>
              <h2>Distance to Check-In</h2>
              <input type='text'
                placeholder='Enter the distance'
                value={distance}
                onChange={(e) => { setDistance(e.target.value) }}
              />
              <p>meter</p>
            </div>
            <div className='save-btn'>
              <button onClick={handleAlert}>Save</button>
            </div>
          </div>
      </div>
    </Wrapper>
  )
}


export default Settings

