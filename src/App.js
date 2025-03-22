import React, { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Dashboard from "./components/Dashboard"
import EventManagement from "./components/EventManagement"
import AttendeeManagement from "./components/AttendeeManagement"
import Settings from "./components/Settings"
import Reports from "./components/Reports"
import Security from "./components/Security"
import QRCode from "./components/QRCode"
import AIRecommendation from "./components/AIRecommendation"
import AttendeeRoleManagement from "./components/AttendeeRoleManagement"
import UserManagement from "./components/UserManagement"

const App = () => {

  const eventData = [
    {
      id : 1,
      eventName : "React"
    },
    {
      id : 2,
      eventName : "DevOps"
    },
    {
      id: 3,
      eventName : "SalesForce"
    },
    {
      id : 4,
      eventName : "Cloud"
    },
    {
      id : 5,
      eventName : "Hackathon"
    }
  ]

  const mapEventsToIDs = (eventNames) => {
    return eventNames.map(eventName => {
      const event = eventData.find(e => e.eventName === eventName)
      return event ? event.id : null
    }).filter(id => id !== null)
  }

  const userData = [
    {
      id: 1,
      userName: "Aayushi Modi",
      guestName: "John",
      userStatus: "pending",
      reportStatus: "pending",
      issue: "App crashes frequently",
      connection: { total: 16, 1: 5, 2: 3, 3: 8 },
      attendEventIDs: mapEventsToIDs(["React", "DevOps", "SalesForce"])
    },
    {
      id: 2,
      userName: "Mayank Aitan",
      guestName: "John",
      userStatus: "pending",
      reportStatus: "pending",
      issue: "QrCode not processed",
      connection: { total: 7, 2: 2, 3: 5 },
      attendEventIDs: mapEventsToIDs(["DevOps", "SalesForce"])
    },
    {
      id: 3,
      userName: "Ajay Jangid",
      guestName: "John",
      userStatus: "pending",
      reportStatus: "pending",
      issue: "Login issues",
      connection: { total: 24, 2: 9, 1: 15 },
      attendEventIDs: mapEventsToIDs(["DevOps", "React"])
    },
    {
      id: 4,
      userName: "Harsh Garg",
      guestName: "John",
      userStatus: "pending",
      reportStatus: "pending",
      issue: "Incorrect notifications",
      connection: { total: 5, 2: 1, 3: 4 },
      attendEventIDs: mapEventsToIDs(["DevOps", "SalesForce"])
    },
    {
      id: 5,
      userName: "Kiran Choudhary",
      guestName: "John",
      userStatus: "pending",
      reportStatus: "pending",
      issue: "Slow performance",
      connection: { total: 26, 1: 7, 4: 9, 5: 10 },
      attendEventIDs: mapEventsToIDs(["React", "Cloud", "Hackathon"])
    },
    {
      id: 6,
      userName: "Mayank Aitan",
      guestName: "Nick",
      userStatus: "pending",
      reportStatus: "pending",
      issue: "Sync issues",
      connection: { total: 8, 2: 5, 5: 3 },
      attendEventIDs: mapEventsToIDs(["DevOps", "Hackathon"])
    },
    {
      id: 7,
      userName: "Aayushi Modi",
      guestName: "Nick",
      userStatus: "pending",
      reportStatus: "pending",
      issue: "Request not send",
      connection: { total: 11, 4: 3, 5: 8 },
      attendEventIDs: mapEventsToIDs(["Cloud", "Hackathon"])
    },
    {
      id: 8,
      userName: "Ajay Jangid",
      guestName: "Nick",
      userStatus: "pending",
      reportStatus: "pending",
      issue: "Spam messages",
      connection: { total: 13, 1: 5, 2: 8 },
      attendEventIDs: mapEventsToIDs(["React", "DevOps"])
    },
    {
      id: 9,
      userName: "Harsh Garg",
      guestName: "Nick",
      userStatus: "pending",
      reportStatus: "pending",
      issue: "Chat freezes",
      connection: { total: 8, 1: 5, 4: 3 },
      attendEventIDs: mapEventsToIDs(["React", "Cloud"])
    },
    {
      id: 10,
      userName: "Kiran Choudhary",
      guestName: "Nick",
      userStatus: "pending",
      reportStatus: "pending",
      issue: "Account Blocked",
      connection: { total: 24, 1: 9, 2: 8, 4: 7 },
      attendEventIDs: mapEventsToIDs(["React", "DevOps", "Cloud"])
    }
  ]

  const [users, setUsers] = useState(userData)
  const [events, setEvents] = useState(eventData)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="userManagement" element={<UserManagement />} />
          <Route path="eventManagement" element={<EventManagement />} />
          <Route path="attendeeManagement" element={<AttendeeManagement />} />
          <Route path="attendeeRole" element={<AttendeeRoleManagement />} />
          <Route path="settings" element={<Settings users={users} setUsers={setUsers} />} />
          <Route path="reports" element={<Reports users={users} setUsers={setUsers} events={events}/>} />
          <Route path="security" element={<Security users={users} setUsers={setUsers} />} />
          <Route path="qrCode" element={<QRCode />} />
          <Route path="aiRecommendation" element={<AIRecommendation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
