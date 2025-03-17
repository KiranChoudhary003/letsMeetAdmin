import React from "react"
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
import UserRoleManagement from "./components/UserRoleManagement"
import UserManagement from "./components/UserManagement"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="userManagement" element={<UserManagement />} />
          <Route path="eventManagement" element={<EventManagement />} />
          <Route path="attendeeManagement" element={<AttendeeManagement />} />
          <Route path="userRole" element={<UserRoleManagement />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<Reports />} />
          <Route path="security" element={<Security />} />
          <Route path="qrCode" element={<QRCode />} />
          <Route path="aiRecommendation" element={<AIRecommendation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
